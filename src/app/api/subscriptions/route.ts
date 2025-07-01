import { apiSuccess, apiError } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SubscriptionService } from "@/lib/services/subscriptions";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return apiError("Unauthorized", 401);
    }

    const subscriptions = await SubscriptionService.getUserActiveSubscriptions(
      (session.user as any).id
    );

    return apiSuccess(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return apiError("Internal server error", 500);
  }
}