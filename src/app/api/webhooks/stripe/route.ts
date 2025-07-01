import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { stripe } from "@/lib/stripe";
import { OrderService } from "@/lib/services/orders";
import { SubscriptionService } from "@/lib/services/subscriptions";
import { db } from "@/lib/db";
import Stripe from "stripe";

// 处理 Checkout Session 完成事件
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const { metadata, mode, customer } = session;
  
  if (!metadata?.userId || !metadata?.priceId) {
    console.error("Missing required metadata in checkout session");
    return;
  }

  const userId = metadata.userId;
  const priceId = metadata.priceId;

  // 获取价格信息
  const price = await db.price.findUnique({
    where: { id: priceId },
  });

  if (!price) {
    console.error(`Price not found: ${priceId}`);
    return;
  }

  if (mode === "payment") {
    // 一次性支付 - 创建订单记录
    try {
      const order = await db.order.create({
        data: {
          orderNumber: `CS_${session.id}`,
          userId,
          priceId,
          amount: price.amount,
          status: "SUCCEEDED",
          stripePaymentIntentId: session.payment_intent as string,
          pointsAdded: price.pointsReward,
        },
      });

      // 如果有积分奖励，添加积分
      if (price.pointsReward > 0) {
        const expiresAt = new Date();
        expiresAt.setFullYear(expiresAt.getFullYear() + 1); // 积分1年后过期

        const { PointsService } = await import("@/lib/services/points");
        await PointsService.grantPointsForOrder(
          userId,
          order.id,
          price.pointsReward,
          expiresAt
        );
      }
    } catch (error) {
      console.error("Error processing one-time payment:", error);
    }
  } else if (mode === "subscription") {
    // 订阅 - 处理将在 customer.subscription.created 事件中进行
    console.log(`Subscription checkout completed for session: ${session.id}`);
  }
}

export async function POST(req: NextRequest) {
  // 检查 Stripe 是否配置
  if (!stripe) {
    return apiError("Payment service not configured", 503);
  }

  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return apiError("Missing stripe-signature header", 400);
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return apiError("Invalid signature", 400);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await OrderService.processSuccessfulPayment(paymentIntent.id);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await OrderService.processFailedPayment(paymentIntent.id);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await SubscriptionService.handleStripeSubscriptionUpdate(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const localSubscription = await SubscriptionService.getSubscriptionByStripeId(
          subscription.id
        );
        
        if (localSubscription) {
          await SubscriptionService.updateSubscriptionStatus(
            localSubscription.id,
            "CANCELED",
            new Date(),
            "Subscription deleted in Stripe"
          );
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Handle subscription renewal
        if ((invoice as any).subscription) {
          const subscription = await SubscriptionService.getSubscriptionByStripeId(
            (invoice as any).subscription as string
          );
          
          if (subscription && subscription.subscriptionType === "MONTHLY") {
            // Grant monthly subscription points
            if ((subscription as any).price.pointsReward > 0) {
              const { PointsService } = await import("@/lib/services/points");
              await PointsService.grantSubscriptionPoints(
                subscription.userId,
                subscription.id,
                (subscription as any).price.pointsReward
              );
            }
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        
        if ((invoice as any).subscription) {
          const subscription = await SubscriptionService.getSubscriptionByStripeId(
            (invoice as any).subscription as string
          );
          
          if (subscription) {
            await SubscriptionService.updateSubscriptionStatus(
              subscription.id,
              "PAST_DUE"
            );
          }
        }
        break;
      }

      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return apiSuccess({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return apiError("Webhook processing failed", 500);
  }
}