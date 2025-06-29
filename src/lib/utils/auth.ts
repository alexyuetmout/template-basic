import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error("Authentication required");
  }
  
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  
  if (!(user as any).isAdmin) {
    throw new Error("Admin access required");
  }
  
  return user;
}

export function getClientIP(headers: Headers): string | null {
  const forwardedFor = headers.get("x-forwarded-for");
  const realIP = headers.get("x-real-ip");
  const connectingIP = headers.get("x-connecting-ip");
  
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  
  return realIP || connectingIP || null;
}