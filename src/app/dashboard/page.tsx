"use client"

import { useSession, authClient } from "@/lib/auth-client"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface UserInfo {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  balance: number;
  oneTimePoints: number;
  subscriptionPoints: number;
  emailVerified: boolean;
  createdAt: string;
  isAdmin: boolean;
}

function DashboardContent() {
  const { data: session } = useSession()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user) {
      fetchUserInfo()
    }
  }, [session])

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('/api/user/info')
      if (response.ok) {
        const data = await response.json()
        setUserInfo(data.user)
      }
    } catch (error) {
      console.error('Error fetching user info:', error)
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {userInfo?.name || userInfo?.email}!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${(userInfo?.balance || 0) / 100}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>One-time Points</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{userInfo?.oneTimePoints || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Points</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{userInfo?.subscriptionPoints || 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Email:</strong> {userInfo?.email}</p>
              <p><strong>Name:</strong> {userInfo?.name || 'Not set'}</p>
              <p><strong>ID:</strong> {userInfo?.id}</p>
              {userInfo?.isAdmin && (
                <p><strong>Role:</strong> <span className="text-red-600">Admin</span></p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Email Verified:</strong> {userInfo?.emailVerified ? 'Yes' : 'No'}</p>
              <p><strong>Created:</strong> {new Date(userInfo?.createdAt || '').toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Button 
          variant="outline" 
          onClick={async () => {
            await authClient.signOut()
            window.location.href = "/"
          }}
        >
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