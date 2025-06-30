"use client"

import { createAuthClient } from "better-auth/react"
import { oneTapClient, customSessionClient } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" 
    ? window.location.origin 
    : process.env.BETTER_AUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  plugins: [
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      autoSelect: false,
      cancelOnTapOutside: true,
      context: "signin",
      promptOptions: {
        baseDelay: 2000,
        maxAttempts: 3
      }
    }),
    customSessionClient<typeof auth>(),
  ],
  fetchOptions: {
    // 全局错误处理
    onError: async (ctx) => {
      console.error("Auth Client Error:", {
        error: ctx.error,
        response: ctx.response,
        timestamp: new Date().toISOString(),
      });
      
      // 处理特定的 state_not_found 错误
      if (ctx.error.message?.includes("state_not_found") || ctx.error.message?.includes("State not found")) {
        console.warn("State not found error detected, this might be due to:");
        console.warn("1. Session cookie was cleared or expired");
        console.warn("2. Browser security settings blocking cookies");
        console.warn("3. Time synchronization issues");
        console.warn("4. Multiple login attempts in different tabs");
        
        // 可以选择重新开始登录流程
        if (typeof window !== "undefined") {
          const shouldRetry = confirm("登录过程中出现问题，是否重新尝试？");
          if (shouldRetry) {
            window.location.href = "/auth/sign-in";
          }
        }
      }
    },
  },
})

export const { signIn, signUp, signOut, useSession, oneTap, updateUser } = authClient