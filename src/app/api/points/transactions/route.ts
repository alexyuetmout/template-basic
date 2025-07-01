import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PointsService } from "@/lib/services/points";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return apiError("Unauthorized", 401);
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const transactions = await PointsService.getUserTransactions(
      (session.user as any).id,
      limit,
      offset
    );

    return apiSuccess(transactions);
  } catch (error) {
    console.error("Error fetching point transactions:", error);
    return apiError("Internal server error", 500);
  }
}