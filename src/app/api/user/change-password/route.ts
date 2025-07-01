import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return apiError("Current password and new password are required", 400);
    }

    // 验证新密码强度
    if (newPassword.length < 8) {
      return apiError("New password must be at least 8 characters long", 400);
    }

    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      return apiError("New password must contain uppercase, lowercase and numeric characters", 400);
    }

    // 使用 Better Auth 的内置 changePassword API
    try {
      const result = await auth.api.changePassword({
        body: {
          newPassword,
          currentPassword,
          revokeOtherSessions: true, // 撤销其他会话以提高安全性
        },
        headers: await headers(),
      });

      return apiSuccess({ message: "Password updated successfully" });
    } catch (authError: any) {
      return apiError(authError.message || "Failed to change password", 400);
    }
  } catch (error) {
    console.error("Error changing password:", error);
    return apiError("Internal server error", 500);
  }
}