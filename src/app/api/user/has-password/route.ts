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

    // 查询用户的账户信息，检查是否有 credential 类型的账户（邮箱密码登录）
    const userAccount = await db.account.findFirst({
      where: {
        userId: session.user.id,
        providerId: "credential",
      },
    });

    // 如果有 credential 账户且有密码字段，则用户有密码
    const hasPassword = userAccount && userAccount.password;

    return apiSuccess({ 
      hasPassword: !!hasPassword 
    });
  } catch (error) {
    console.error("Error checking user password status:", error);
    return apiError("Internal server error", 500);
  }
}