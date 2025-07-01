import { apiSuccess, apiError } from "@/lib/api-response";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const prices = await db.price.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    return apiSuccess(prices);
  } catch (error) {
    console.error("Error fetching prices:", error);
    return apiError("Internal server error", 500);
  }
}