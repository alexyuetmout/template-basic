import { apiSuccess, apiError } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return apiError("Unauthorized", 401);
    }

    // 获取完整的用户信息，包括积分
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        balance: true,
        oneTimePoints: true,
        subscriptionPoints: true,
        emailVerified: true,
        createdAt: true,
        isAdmin: true,
      },
    });

    if (!user) {
      return apiError("User not found", 404);
    }

    return apiSuccess({ user });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return apiError("Internal server error", 500);
  }
}