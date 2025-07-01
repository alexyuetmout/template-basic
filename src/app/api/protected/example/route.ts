import { NextRequest, NextResponse } from "next/server"
import { apiSuccess } from "@/lib/api-response"
import { requireAuth } from "@/lib/auth-middleware"

export async function GET(request: NextRequest) {
  const authResult = await requireAuth()
  
  // If authentication failed, return the error response
  if (authResult instanceof NextResponse) {
    return authResult
  }

  const { user } = authResult

  return apiSuccess({
    message: "This is a protected endpoint",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  })
}

export async function POST(request: NextRequest) {
  const authResult = await requireAuth()
  
  if (authResult instanceof NextResponse) {
    return authResult
  }

  const { user } = authResult
  const body = await request.json()

  // Your protected logic here
  return apiSuccess({
    message: "Data processed successfully",
    userId: user.id,
    data: body,
  })
}