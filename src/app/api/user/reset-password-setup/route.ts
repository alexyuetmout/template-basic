import { NextRequest, NextResponse } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    // 获取当前会话
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return apiError("未登录", 401);
    }

    // 删除所有该用户的 credential 账户记录
    await db.account.deleteMany({
      where: {
        userId: session.user.id,
        providerId: "credential",
      },
    });

    console.log(`Cleaned up credential accounts for user ${session.user.id}`);

    return apiSuccess({ 
      success: true,
      message: "账户数据已重置，可以重新设置密码"
    });

  } catch (error) {
    console.error("Reset password setup error:", error);
    return apiError("重置失败，服务器内部错误", 500);
  }
}