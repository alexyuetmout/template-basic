import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SettingsService } from "@/lib/services/settings";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only admins can view all settings
    // For non-admins, return only public settings
    const user = await auth.api.getSession({ headers: await headers() });
    const isAdmin = (user?.user as any)?.isAdmin || false;

    const settings = isAdmin
      ? await SettingsService.getAllSettings()
      : await SettingsService.getEnabledSettings();

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only admins can create/update settings
    const user = await auth.api.getSession({ headers: await headers() });
    if (!(user?.user as any)?.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { key, value, description, isEnabled = true } = body;

    if (!key) {
      return NextResponse.json(
        { error: "Setting key is required" },
        { status: 400 }
      );
    }

    const setting = await SettingsService.setSetting(
      key,
      value,
      description,
      isEnabled
    );

    return NextResponse.json(setting);
  } catch (error) {
    console.error("Error creating/updating setting:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}