import { apiSuccess, apiError } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PointsService } from "@/lib/services/points";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return apiError("Unauthorized", 401);
    }

    const balance = await PointsService.getUserPointsBalance((session.user as any).id);

    return apiSuccess(balance);
  } catch (error) {
    console.error("Error fetching points balance:", error);
    return apiError("Internal server error", 500);
  }
}