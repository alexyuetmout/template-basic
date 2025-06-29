"use client"

import { useSession } from "@/lib/auth-client"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function DashboardContent() {
  const { data: session } = useSession()
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {session?.user.name || session?.user.email}!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${session?.user.balance || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>One-time Points</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{session?.user.oneTimePoints || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Points</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{session?.user.subscriptionPoints || 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Button variant="outline" onClick={() => window.location.href = "/api/auth/sign-out"}>
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}