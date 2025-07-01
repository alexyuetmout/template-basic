import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PointsService } from "@/lib/services/points";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return apiError("Unauthorized", 401);
    }

    const body = await req.json();
    const { points, reason, description } = body;

    if (!points || points <= 0) {
      return apiError("Invalid points amount", 400);
    }

    const result = await PointsService.spendPoints(
      (session.user as any).id,
      points,
      reason,
      description
    );

    if (!result.success) {
      return apiError(result.message, 400);
    }

    return apiSuccess(result);
  } catch (error) {
    console.error("Error spending points:", error);
    return apiError("Internal server error", 500);
  }
}