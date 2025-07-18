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
import { usePath } from "@/hooks/usePath"

const createSignInSchema = (t: any) => z.object({
  email: z.string().email({
    message: t('signIn.errors.invalidEmail'),
  }),
  password: z.string().min(1, {
    message: t('signIn.errors.passwordRequired'),
  }),
  rememberMe: z.boolean(),
})

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { routes } = usePath()
  const { t } = useTranslation('auth')
  
  const signInSchema = createSignInSchema(t)
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
        setError(result.error.message || t('signIn.errors.loginFailed'))
      } else {
        // Login successful, redirect to home
        router.push(routes.HOME)
      }
    } catch (err) {
      setError(t('signIn.errors.unexpectedError'))
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
      setError(t('signIn.errors.googleSignInFailed'))
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background px-4 relative">
      <AuthNavigation />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground dark:text-foreground">
            {t('signIn.welcomeBack')}
          </h1>
          <p className="text-muted-foreground dark:text-muted-foreground mt-2">
            {t('signIn.signInDescription')}
          </p>
        </div>

        <Card className="border-border dark:border-border">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center text-foreground dark:text-foreground">
              {t('signIn.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google登录按钮 */}
            <Button
              variant="outline"
              className="w-full h-12 border-border dark:border-neutral-600"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <GoogleIcon className="w-5 h-5 mr-2" />
              {t('signIn.continueWithGoogle')}
            </Button>

            {/* 分割线 */}
            <AuthDivider />

            {/* 错误信息显示 */}
            {error && (
              <div className="bg-destructive/5 dark:bg-destructive/10/20 border border-destructive/30 dark:border-destructive/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
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
                      <FormLabel className="text-sm font-medium text-neutral-700 dark:text-muted">{t('email')}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t('signIn.emailPlaceholder')}
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
                      <FormLabel className="text-sm font-medium text-neutral-700 dark:text-muted">{t('password')}</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder={t('signIn.passwordPlaceholder')}
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
                        <label htmlFor="remember" className="text-sm text-muted-foreground dark:text-muted-foreground cursor-pointer">
                          {t('signIn.rememberMe')}
                        </label>
                      </div>
                    )}
                  />
                  <Link
                    href={routes.FORGOT_PASSWORD}
                    className="text-sm text-primary hover:text-primary/80"
                  >
                    {t('forgotPassword')}
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={isLoading}
                >
                  {isLoading ? t('loading') : t('signIn.title')}
                </Button>
              </form>
            </Form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                {t('dontHaveAccount')}{" "}
                <Link
                  href={routes.SIGN_UP}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  {t('signUp.title')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}