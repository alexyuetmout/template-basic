import { NextResponse } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { runPointsCronJobs } from "@/lib/cron/points-expiry";

export async function GET() {
  try {
    // Simple API key authentication for cron jobs
    // In production, use a proper authentication method
    const authHeader = process.env.CRON_SECRET;
    
    if (!authHeader) {
      return apiError("Cron secret not configured", 500);
    }

    await runPointsCronJobs();

    return apiSuccess({ success: true, message: "Points cron jobs completed" });
  } catch (error) {
    console.error("Error running points cron jobs:", error);
    return apiError("Internal server error", 500);
  }
}