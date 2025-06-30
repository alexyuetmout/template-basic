"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password-input"
import Link from "next/link"
import React, { useState } from "react"
import { AuthNavigation } from "@/components/auth/AuthNavigation"
import { AuthDivider } from "@/components/auth/AuthDivider"
import { GoogleIcon } from "@/components/icons/GoogleIcon"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { useTranslation } from "@/hooks/useTranslation"

const signInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberMe: z.boolean(),
})

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { t } = useTranslation()
  
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setError("")
    setIsLoading(true)

    try {
      const result = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      })

      if (result.error) {
        setError(result.error.message || "Login failed")
      } else {
        // Login successful, redirect to home
        router.push("/")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError("")
    setIsLoading(true)
    try {
      // 根据 Better Auth 官方文档的正确方式
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // 成功后重定向到首页
      })
    } catch (err) {
      setError("Google sign in failed. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900 px-4 relative">
      <AuthNavigation />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Welcome Back
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            Sign in to your account to continue
          </p>
        </div>

        <Card className="border-neutral-200 dark:border-neutral-700">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center text-neutral-900 dark:text-neutral-100">
              {t('auth.signIn')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google登录按钮 */}
            <Button
              variant="outline"
              className="w-full h-12 border-neutral-300 dark:border-neutral-600"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <GoogleIcon className="w-5 h-5 mr-2" />
              {t('auth.orContinueWith')} Google
            </Button>

            {/* 分割线 */}
            <AuthDivider />

            {/* 错误信息显示 */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* 邮箱登录表单 */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('auth.email')}</FormLabel>
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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('auth.password')}</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label htmlFor="remember" className="text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer">
                          Remember me
                        </label>
                      </div>
                    )}
                  />
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary hover:text-primary/80"
                  >
                    {t('auth.forgotPassword')}
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={isLoading}
                >
                  {isLoading ? t('common.loading') : t('auth.signIn')}
                </Button>
              </form>
            </Form>

            <div className="text-center">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {t('auth.dontHaveAccount')}{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  {t('auth.signUp')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}