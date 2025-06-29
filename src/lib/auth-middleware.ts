import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return { session, user: session.user }
}

export async function requireAdmin() {
  const authResult = await requireAuth()
  
  if (authResult instanceof NextResponse) {
    return authResult // Return the error response
  }

  const { user } = authResult
  
  if (!user.isAdmin) {
    return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 })
  }

  return authResult
}