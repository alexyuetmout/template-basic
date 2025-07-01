import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SettingsService } from "@/lib/services/settings";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return apiError("Unauthorized", 401);
    }

    // Only admins can view all settings
    // For non-admins, return only public settings
    const user = await auth.api.getSession({ headers: await headers() });
    const isAdmin = (user?.user as any)?.isAdmin || false;

    const settings = isAdmin
      ? await SettingsService.getAllSettings()
      : await SettingsService.getEnabledSettings();

    return apiSuccess(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return apiError("Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return apiError("Unauthorized", 401);
    }

    // Only admins can create/update settings
    const user = await auth.api.getSession({ headers: await headers() });
    if (!(user?.user as any)?.isAdmin) {
      return apiError("Forbidden", 403);
    }

    const body = await req.json();
    const { key, value, description, isEnabled = true } = body;

    if (!key) {
      return apiError("Setting key is required", 400);
    }

    const setting = await SettingsService.setSetting(
      key,
      value,
      description,
      isEnabled
    );

    return apiSuccess(setting);
  } catch (error) {
    console.error("Error creating/updating setting:", error);
    return apiError("Internal server error", 500);
  }
}