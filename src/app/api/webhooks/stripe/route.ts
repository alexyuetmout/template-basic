import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { OrderService } from "@/lib/services/orders";
import { SubscriptionService } from "@/lib/services/subscriptions";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
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
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
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

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}