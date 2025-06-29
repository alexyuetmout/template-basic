import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";

interface NotificationSettings {
  emailMarketing: boolean;
  emailSecurity: boolean;
  emailBilling: boolean;
  emailProducts: boolean;
  pushMarketing: boolean;
  pushSecurity: boolean;
  pushBilling: boolean;
  pushProducts: boolean;
}

const defaultSettings: NotificationSettings = {
  emailMarketing: false,
  emailSecurity: true,
  emailBilling: true,
  emailProducts: true,
  pushMarketing: false,
  pushSecurity: true,
  pushBilling: true,
  pushProducts: false,
};

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 查找用户的通知设置
    const userSettings = await db.userSettings.findUnique({
      where: { userId: (session.user as any).id },
    });

    if (!userSettings || !userSettings.notificationSettings) {
      return NextResponse.json(defaultSettings);
    }

    // 解析通知设置，如果格式不正确则返回默认设置
    try {
      const settings = JSON.parse(userSettings.notificationSettings as string);
      return NextResponse.json({ ...defaultSettings, ...settings });
    } catch {
      return NextResponse.json(defaultSettings);
    }
  } catch (error) {
    console.error("Error fetching notification settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    // 验证请求体中的设置
    const validKeys = Object.keys(defaultSettings);
    const settings: Partial<NotificationSettings> = {};
    
    for (const key of validKeys) {
      if (key in body && typeof body[key] === "boolean") {
        settings[key as keyof NotificationSettings] = body[key];
      }
    }

    const userId = (session.user as any).id;

    // 更新或创建用户设置
    await db.userSettings.upsert({
      where: { userId },
      update: {
        notificationSettings: JSON.stringify(settings),
        updatedAt: new Date(),
      },
      create: {
        userId,
        notificationSettings: JSON.stringify(settings),
      },
    });

    return NextResponse.json({ 
      message: "Notification settings updated successfully",
      settings: { ...defaultSettings, ...settings }
    });
  } catch (error) {
    console.error("Error updating notification settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}