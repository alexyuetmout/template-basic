import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SubscriptionService } from "@/lib/services/subscriptions";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return apiError("Unauthorized", 401);
    }

    const body = await req.json();
    const { subscriptionId, reason } = body;

    if (!subscriptionId) {
      return apiError("Subscription ID is required", 400);
    }

    // Verify user owns the subscription
    const subscription = await db.subscription.findFirst({
      where: {
        id: subscriptionId,
        userId: (session.user as any).id,
      },
    });

    if (!subscription) {
      return apiError("Subscription not found", 404);
    }

    await SubscriptionService.cancelSubscription(subscriptionId, reason);

    return apiSuccess({ success: true });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    return apiError("Internal server error", 500);
  }
}