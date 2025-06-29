import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { Subscription, SubscriptionStatus, SubscriptionType } from "@prisma/client";
import { PointsService } from "./points";

export class SubscriptionService {
  static async createSubscription(data: {
    userId: string;
    priceId: string;
    stripeSubscriptionId: string;
    subscriptionType: SubscriptionType;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
  }): Promise<Subscription> {
    const subscription = await db.subscription.create({
      data: {
        ...data,
        status: "ACTIVE",
      },
    });

    // Grant initial points for yearly subscriptions
    if (data.subscriptionType === "YEARLY") {
      const price = await db.price.findUnique({
        where: { id: data.priceId },
      });

      if (price && price.pointsReward > 0) {
        // Calculate monthly points (yearly reward divided by 12)
        const monthlyPoints = Math.floor(price.pointsReward / 12);
        
        await PointsService.grantSubscriptionPoints(
          data.userId,
          subscription.id,
          monthlyPoints
        );

        // Set next billing date for points (1 month from start)
        const nextBillingDate = new Date(data.currentPeriodStart);
        nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

        await db.subscription.update({
          where: { id: subscription.id },
          data: {
            nextBillingDate,
            lastPointsGrantedAt: new Date(),
          },
        });
      }
    }

    return subscription;
  }

  static async getSubscriptionById(id: string): Promise<Subscription | null> {
    return db.subscription.findUnique({
      where: { id },
      include: {
        user: true,
        price: true,
        pointTransactions: true,
      },
    });
  }

  static async getSubscriptionByStripeId(stripeSubscriptionId: string): Promise<Subscription | null> {
    return db.subscription.findUnique({
      where: { stripeSubscriptionId },
      include: {
        user: true,
        price: true,
      },
    });
  }

  static async getUserActiveSubscriptions(userId: string): Promise<Subscription[]> {
    return db.subscription.findMany({
      where: {
        userId,
        status: "ACTIVE",
      },
      include: {
        price: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async updateSubscriptionStatus(
    subscriptionId: string,
    status: SubscriptionStatus,
    canceledAt?: Date,
    cancellationReason?: string
  ): Promise<Subscription> {
    const updateData: { 
      status: SubscriptionStatus; 
      canceledAt?: Date; 
      cancellationReason?: string; 
    } = { status };
    
    if (canceledAt) {
      updateData.canceledAt = canceledAt;
    }
    
    if (cancellationReason) {
      updateData.cancellationReason = cancellationReason;
    }

    return db.subscription.update({
      where: { id: subscriptionId },
      data: updateData,
    });
  }

  static async updateSubscriptionPeriod(
    subscriptionId: string,
    currentPeriodStart: Date,
    currentPeriodEnd: Date
  ): Promise<Subscription> {
    return db.subscription.update({
      where: { id: subscriptionId },
      data: {
        currentPeriodStart,
        currentPeriodEnd,
      },
    });
  }

  static async cancelSubscription(
    subscriptionId: string,
    reason?: string
  ): Promise<void> {
    // 检查 Stripe 是否配置
    if (!stripe) {
      throw new Error("Payment service not configured");
    }

    const subscription = await db.subscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      throw new Error("Subscription not found");
    }

    if (subscription.status !== "ACTIVE") {
      throw new Error("Can only cancel active subscriptions");
    }

    // Cancel with Stripe
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
      metadata: {
        cancellationReason: reason || "User requested cancellation",
      },
    });

    // Update local subscription
    await this.updateSubscriptionStatus(
      subscriptionId,
      "CANCELED",
      new Date(),
      reason
    );
  }

  static async processYearlySubscriptionPoints(): Promise<void> {
    // Find yearly subscriptions that need point distribution
    const subscriptions = await db.subscription.findMany({
      where: {
        subscriptionType: "YEARLY",
        status: "ACTIVE",
        nextBillingDate: {
          lte: new Date(),
        },
      },
      include: {
        price: true,
      },
    });

    for (const subscription of subscriptions) {
      if (subscription.price.pointsReward > 0) {
        const monthlyPoints = Math.floor(subscription.price.pointsReward / 12);
        
        await PointsService.grantSubscriptionPoints(
          subscription.userId,
          subscription.id,
          monthlyPoints
        );

        // Update next billing date
        const nextBillingDate = new Date();
        nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

        await db.subscription.update({
          where: { id: subscription.id },
          data: {
            nextBillingDate,
            lastPointsGrantedAt: new Date(),
          },
        });
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async handleStripeSubscriptionUpdate(stripeSubscription: any): Promise<void> {
    const subscription = await this.getSubscriptionByStripeId(stripeSubscription.id);
    
    if (!subscription) {
      // Create new subscription if it doesn't exist
      const price = await db.price.findUnique({
        where: { stripePriceId: stripeSubscription.items.data[0].price.id },
      });

      if (!price) {
        throw new Error("Price not found for subscription");
      }

      const user = await db.user.findUnique({
        where: { stripeCustomerId: stripeSubscription.customer },
      });

      if (!user) {
        throw new Error("User not found for subscription");
      }

      // Determine subscription type
      let subscriptionType: SubscriptionType = "CUSTOM";
      if (stripeSubscription.items.data[0].price.recurring) {
        const interval = stripeSubscription.items.data[0].price.recurring.interval;
        switch (interval) {
          case "month":
            subscriptionType = "MONTHLY";
            break;
          case "year":
            subscriptionType = "YEARLY";
            break;
          case "week":
            subscriptionType = "WEEKLY";
            break;
        }
      }

      await this.createSubscription({
        userId: user.id,
        priceId: price.id,
        stripeSubscriptionId: stripeSubscription.id,
        subscriptionType,
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
      });
    } else {
      // Update existing subscription
      let status: SubscriptionStatus = "ACTIVE";
      
      switch (stripeSubscription.status) {
        case "active":
          status = "ACTIVE";
          break;
        case "canceled":
          status = "CANCELED";
          break;
        case "incomplete":
          status = "INCOMPLETE";
          break;
        case "past_due":
          status = "PAST_DUE";
          break;
        case "unpaid":
          status = "UNPAID";
          break;
      }

      await db.subscription.update({
        where: { id: subscription.id },
        data: {
          status,
          currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
          currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        },
      });
    }
  }
}