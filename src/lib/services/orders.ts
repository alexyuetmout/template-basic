import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { Order, OrderStatus } from "@prisma/client";
import { PointsService } from "./points";
import { v4 as uuidv4 } from "uuid";

export interface CreateOrderData {
  userId: string;
  priceId: string;
  metadata?: Record<string, string>;
}

export class OrderService {
  static async createOrder(data: CreateOrderData): Promise<{
    order: Order;
    paymentIntent: unknown;
  }> {
    // 检查 Stripe 是否配置
    if (!stripe) {
      throw new Error("Payment service not configured");
    }

    const price = await db.price.findUnique({
      where: { id: data.priceId },
    });

    if (!price) {
      throw new Error("Price not found");
    }

    const user = await db.user.findUnique({
      where: { id: data.userId },
    });

    if (!user || !user.stripeCustomerId) {
      throw new Error("User not found or missing Stripe customer ID");
    }

    // Create order in database
    const order = await db.order.create({
      data: {
        orderNumber: uuidv4(),
        userId: data.userId,
        priceId: data.priceId,
        amount: price.amount,
        status: "PENDING",
      },
    });

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price.amount,
      currency: "usd",
      customer: user.stripeCustomerId,
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        userId: data.userId,
        priceId: data.priceId,
        ...data.metadata,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Update order with PaymentIntent ID
    const updatedOrder = await db.order.update({
      where: { id: order.id },
      data: {
        stripePaymentIntentId: paymentIntent.id,
      },
    });

    return {
      order: updatedOrder,
      paymentIntent,
    };
  }

  static async getOrderById(id: string): Promise<Order | null> {
    return db.order.findUnique({
      where: { id },
      include: {
        user: true,
        price: true,
        pointTransactions: true,
      },
    });
  }

  static async getOrderByNumber(orderNumber: string): Promise<Order | null> {
    return db.order.findUnique({
      where: { orderNumber },
      include: {
        user: true,
        price: true,
        pointTransactions: true,
      },
    });
  }

  static async getUserOrders(
    userId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<Order[]> {
    return db.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
      include: {
        price: true,
        pointTransactions: true,
      },
    });
  }

  static async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
    paymentIntentId?: string
  ): Promise<Order> {
    const updateData: { status: OrderStatus; stripePaymentIntentId?: string } = { status };
    
    if (paymentIntentId) {
      updateData.stripePaymentIntentId = paymentIntentId;
    }

    return db.order.update({
      where: { id: orderId },
      data: updateData,
    });
  }

  static async processSuccessfulPayment(paymentIntentId: string): Promise<void> {
    // Find order by PaymentIntent ID
    const order = await db.order.findFirst({
      where: { stripePaymentIntentId: paymentIntentId },
      include: { price: true, user: true },
    });

    if (!order) {
      throw new Error("Order not found for PaymentIntent");
    }

    if (order.status === "SUCCEEDED") {
      // Already processed
      return;
    }

    await db.$transaction(async (tx) => {
      // Update order status
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: "SUCCEEDED",
          pointsAdded: order.price.pointsReward,
        },
      });

      // Grant points if applicable
      if (order.price.pointsReward > 0) {
        const expiresAt = new Date();
        expiresAt.setFullYear(expiresAt.getFullYear() + 1); // Points expire in 1 year

        await PointsService.grantPointsForOrder(
          order.userId,
          order.id,
          order.price.pointsReward,
          expiresAt
        );
      }
    });
  }

  static async processFailedPayment(paymentIntentId: string): Promise<void> {
    const order = await db.order.findFirst({
      where: { stripePaymentIntentId: paymentIntentId },
    });

    if (!order) {
      throw new Error("Order not found for PaymentIntent");
    }

    await this.updateOrderStatus(order.id, "FAILED");
  }

  static async refundOrder(orderId: string, reason?: string): Promise<void> {
    // 检查 Stripe 是否配置
    if (!stripe) {
      throw new Error("Payment service not configured");
    }

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { price: true },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status !== "SUCCEEDED") {
      throw new Error("Can only refund successful orders");
    }

    if (!order.stripePaymentIntentId) {
      throw new Error("No PaymentIntent ID found");
    }

    // Process refund with Stripe
    await stripe.refunds.create({
      payment_intent: order.stripePaymentIntentId,
      reason: "requested_by_customer",
      metadata: {
        orderId: order.id,
        reason: reason || "Customer requested refund",
      },
    });

    await db.$transaction(async (tx) => {
      // Update order status
      await tx.order.update({
        where: { id: orderId },
        data: { status: "REFUNDED" },
      });

      // Reverse points if they were granted
      if (order.pointsAdded > 0) {
        await PointsService.createTransaction({
          userId: order.userId,
          points: order.pointsAdded,
          pointType: "ONE_TIME",
          transactionType: "REFUND",
          reason: "Order refunded",
          description: `Points refunded for order ${order.orderNumber}`,
          orderId: order.id,
        });
      }
    });
  }
}