import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: "密码长度至少为 8 位" },
        { status: 400 }
      );
    }

    // 获取当前会话
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "未登录" },
        { status: 401 }
      );
    }

    // 使用 Better Auth 的正确方式设置密码
    // 1. 首先对密码进行哈希
    const ctx = await auth.$context;
    const hashedPassword = await ctx.password.hash(password);

    // 2. 然后使用 internalAdapter 设置密码
    await ctx.internalAdapter.updatePassword(session.user.id, hashedPassword);

    return NextResponse.json({ 
      success: true,
      message: "密码设置成功"
    });

  } catch (error) {
    console.error("Set password route error:", error);
    return NextResponse.json(
      { error: "设置密码失败，服务器内部错误" },
      { status: 500 }
    );
  }
}