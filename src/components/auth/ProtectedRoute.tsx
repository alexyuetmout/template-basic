"use client"

import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { usePath } from "@/hooks/usePath"

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
  fallback?: React.ReactNode
}

export function ProtectedRoute({ 
  children, 
  redirectTo,
  fallback = <div>Loading...</div>
}: ProtectedRouteProps) {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const { routes } = usePath()
  const defaultRedirectTo = redirectTo || routes.SIGN_IN

  useEffect(() => {
    if (!isPending && !session) {
      router.push(defaultRedirectTo)
    }
  }, [session, isPending, router, redirectTo])

  if (isPending) {
    return fallback
  }

  if (!session) {
    return null // Will redirect
  }

  return <>{children}</>
}