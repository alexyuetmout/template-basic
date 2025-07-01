import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { apiError } from "@/lib/api-response"
import { NextResponse } from "next/server"

export async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return apiError("Unauthorized", 401)
  }

  return { session, user: session.user }
}

export async function requireAdmin() {
  const authResult = await requireAuth()
  
  if (authResult && typeof (authResult as any).status === 'number') {
    return authResult // Return the error response
  }

  const { user } = authResult as { session: any; user: any }
  
  if (!user.isAdmin) {
    return apiError("Forbidden - Admin access required", 403)
  }

  return authResult
}