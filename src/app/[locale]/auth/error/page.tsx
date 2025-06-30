"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const errorCode = searchParams.get('code')

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'invalid_code':
        return 'The authorization code is invalid or has expired. Please try signing in again.'
      case 'access_denied':
        return 'You denied access to the application. Please try again if this was a mistake.'
      case 'invalid_request':
        return 'Invalid request. Please try again.'
      default:
        return 'An unexpected error occurred during authentication. Please try again.'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900 px-4">
      <div className="w-full max-w-md">
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600 dark:text-red-400">
              Authentication Error
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {getErrorMessage(errorCode)}
              </p>
              
              {errorCode && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded-lg mb-4">
                  <p className="text-sm text-red-700 dark:text-red-400">
                    <strong>Error Code:</strong> {errorCode}
                  </p>
                  {error && (
                    <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                      <strong>Details:</strong> {error}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Link href="/auth/sign-in">
                <Button className="w-full">
                  Try Sign In Again
                </Button>
              </Link>
              
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
        <div className="text-center">Loading...</div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  )
}