import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserService } from "@/lib/services/user";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return apiError("Unauthorized", 401);
    }

    const user = await UserService.getUserById((session.user as any).id);
    
    if (!user) {
      return apiError("User not found", 404);
    }

    const userProfile = user;

    return apiSuccess(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return apiError("Internal server error", 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return apiError("Unauthorized", 401);
    }

    const body = await req.json();
    const { name, image, countryCode } = body;

    const updatedUser = await UserService.updateUser((session.user as any).id, {
      name,
      image,
      countryCode,
    });

    const userProfile = updatedUser;

    return apiSuccess(userProfile);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return apiError("Internal server error", 500);
  }
}