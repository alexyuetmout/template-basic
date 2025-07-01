import { NextRequest, NextResponse } from "next/server"
import { apiSuccess, apiError } from "@/lib/api-response"
import { requireAdmin } from "@/lib/auth-middleware"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  const authResult = await requireAdmin()
  
  if (authResult instanceof NextResponse) {
    return authResult
  }

  // Only admins can see all users
  const users = await db.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      status: true,
      balance: true,
      isAdmin: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return apiSuccess(users)
}