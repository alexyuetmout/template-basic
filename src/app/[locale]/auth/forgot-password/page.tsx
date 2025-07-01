"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import React, { useState } from "react"
import { Mail, ArrowLeft } from "lucide-react"
import { AuthNavigation } from "@/components/auth/AuthNavigation"
import { useTranslation } from "@/hooks/useTranslation"
import { usePath } from "@/hooks/usePath"

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { t } = useTranslation('auth')
  const { routes } = usePath()
  
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    setIsLoading(true)
    // TODO: 实现忘记密码逻辑
    console.log("Reset password for:", values.email)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background px-4 relative">
        <AuthNavigation />
        <div className="w-full max-w-md">
          <Card className="border-border dark:border-border">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-chart-2 dark:text-chart-2" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground dark:text-foreground mb-2">
                  Check your email
                </h1>
                <p className="text-muted-foreground dark:text-muted-foreground">
                  We&apos;ve sent a password reset link to{" "}
                  <span className="font-medium">{form.getValues("email")}</span>
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                  Didn&apos;t receive the email? Check your spam folder or try again.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full"
                >
                  Try again
                </Button>
                <Link href={routes.SIGN_IN}>
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to sign in
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background px-4 relative">
      <AuthNavigation />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground dark:text-foreground">
            Forgot Password?
          </h1>
          <p className="text-muted-foreground dark:text-muted-foreground mt-2">
            Enter your email address and we&apos;ll send you a link to reset your password
          </p>
        </div>

        <Card className="border-border dark:border-border">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center text-foreground dark:text-foreground">
              Reset Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-neutral-700 dark:text-muted">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </Form>

            <div className="text-center">
              <Link
                href={routes.SIGN_IN}
                className="inline-flex items-center text-sm text-primary hover:text-primary/80"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}