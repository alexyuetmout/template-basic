import { NextResponse } from "next/server";
import { runPointsCronJobs } from "@/lib/cron/points-expiry";

export async function GET() {
  try {
    // Simple API key authentication for cron jobs
    // In production, use a proper authentication method
    const authHeader = process.env.CRON_SECRET;
    
    if (!authHeader) {
      return NextResponse.json(
        { error: "Cron secret not configured" },
        { status: 500 }
      );
    }

    await runPointsCronJobs();

    return NextResponse.json({ success: true, message: "Points cron jobs completed" });
  } catch (error) {
    console.error("Error running points cron jobs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}