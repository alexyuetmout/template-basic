import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const prices = await db.price.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(prices);
  } catch (error) {
    console.error("Error fetching prices:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}