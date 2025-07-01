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

const createSignUpSchema = (t: any) => z.object({
  email: z.string().email({
    message: t('signUp.errors.invalidEmail'),
  }),
  password: z.string().min(6, {
    message: t('signUp.errors.passwordMinLength'),
  }),
  confirmPassword: z.string(),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: t('signUp.errors.termsRequired'),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: t('signUp.errors.passwordsDontMatch'),
  path: ["confirmPassword"],
})

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { routes } = usePath()
  const { t } = useTranslation('auth')
  
  const signUpSchema = createSignUpSchema(t)
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      agreedToTerms: false,
    },
  })

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setError("")
    setIsLoading(true)

    try {
      const result = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.email.split("@")[0],
      })

      if (result.error) {
        setError(result.error.message || t('signUp.errors.registrationFailed'))
      } else {
        // Registration successful, redirect to home
        router.push(routes.HOME)
      }
    } catch (err) {
      setError(t('signUp.errors.unexpectedError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setError("")
    setIsLoading(true)
    try {
      // 根据 Better Auth 官方文档的正确方式
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // 成功后重定向到首页
      })
    } catch (err) {
      setError(t('signUp.errors.googleSignUpFailed'))
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background px-4 relative">
      <AuthNavigation />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground dark:text-foreground">
            {t('signUp.createAccount')}
          </h1>
          <p className="text-muted-foreground dark:text-muted-foreground mt-2">
            {t('signUp.signUpDescription')}
          </p>
        </div>

        <Card className="border-border dark:border-border">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center text-foreground dark:text-foreground">
              {t('signUp.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google注册按钮 */}
            <Button
              variant="outline"
              className="w-full h-12 border-border dark:border-neutral-600"
              onClick={handleGoogleSignUp}
              disabled={isLoading}
            >
              <GoogleIcon className="w-5 h-5 mr-2" />
              {t('signUp.continueWithGoogle')}
            </Button>

            {/* 分割线 */}
            <AuthDivider />

            {/* 错误信息显示 */}
            {error && (
              <div className="bg-destructive/5 dark:bg-destructive/10/20 border border-destructive/30 dark:border-destructive/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* 邮箱注册表单 */}
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
                          placeholder={t('signUp.emailPlaceholder')}
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
                          placeholder={t('signUp.passwordPlaceholder')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-neutral-700 dark:text-muted">{t('confirmPassword')}</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder={t('signUp.confirmPasswordPlaceholder')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agreedToTerms"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5"
                          />
                        </FormControl>
                        <div className="text-sm">
                          <label className="text-muted-foreground dark:text-muted-foreground cursor-pointer">
                            {t('signUp.agreeToTerms')}{" "}
                            <Link href={routes.TERMS} className="text-primary dark:text-primary hover:text-primary dark:hover:text-blue-300 underline">
                              {t('signUp.termsOfService')}
                            </Link>{" "}
                            {t('signUp.and')}{" "}
                            <Link href={routes.PRIVACY} className="text-primary dark:text-primary hover:text-primary dark:hover:text-blue-300 underline">
                              {t('signUp.privacyPolicy')}
                            </Link>
                          </label>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={isLoading}
                >
                  {isLoading ? t('signUp.creatingAccount') : t('signUp.createAccount')}
                </Button>
              </form>
            </Form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                {t('alreadyHaveAccount')}{" "}
                <Link
                  href={routes.SIGN_IN}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  {t('signIn.title')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}