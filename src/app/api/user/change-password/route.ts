import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    // 验证新密码强度
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      return NextResponse.json(
        { error: "New password must contain uppercase, lowercase and numeric characters" },
        { status: 400 }
      );
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

      return NextResponse.json({ message: "Password updated successfully" });
    } catch (authError: any) {
      return NextResponse.json(
        { error: authError.message || "Failed to change password" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}