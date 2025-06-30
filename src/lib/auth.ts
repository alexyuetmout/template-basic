import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { oneTap, customSession } from "better-auth/plugins";
import { db } from "@/lib/db";
import { SettingsService } from "@/lib/services/settings";
import { createAuthMiddleware } from "better-auth/api";
import { TRANSACTION_TYPE, POINT_TYPE } from "@/lib/constants/enums";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    sendResetPassword: async () => {
      // 可以在这里添加发送重置密码邮件的逻辑
      // 现在暂时留空，因为我们主要用 setPassword 功能
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    oneTap(),
    customSession(async ({ user, session }) => {
      // 获取完整的用户信息，包括积分等数据
      const fullUser = await db.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          emailVerified: true,
          isAdmin: true,
          balance: true,
          oneTimePoints: true,
          subscriptionPoints: true,
          pointsExpiresAt: true,
          countryCode: true,
          stripeCustomerId: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        user: fullUser || user,
        session,
      };
    }),
  ],
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  // 注册成功后的回调
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      // 处理邮箱注册
      if (ctx.path === "/sign-up/email") {
        const newSession = ctx.context.newSession;
        if (newSession) {
          await grantRegistrationPoints(newSession.user);
        }
      }
      
      // 处理 OAuth 注册（首次登录）
      if (ctx.path?.startsWith("/callback/")) {
        const newSession = ctx.context.newSession;
        if (newSession) {
          // 检查是否是新注册用户（刚创建的用户）
          const userCreatedRecently = new Date(newSession.user.createdAt).getTime() > Date.now() - 10000; // 10秒内创建
          if (userCreatedRecently) {
            await grantRegistrationPoints(newSession.user);
          }
        }
      }
    }),
  },
});

// 赠送注册积分的辅助函数
async function grantRegistrationPoints(user: any) {
  if (!user) return;
  
  try {
    // 获取注册赠送积分设置
    const registerPoints = await SettingsService.getNumericSetting("register_points", 0);
    
    if (registerPoints > 0) {
      // 检查用户是否已经有注册积分记录（避免重复赠送）
      const existingTransaction = await db.pointTransaction.findFirst({
        where: {
          userId: user.id,
          transactionType: TRANSACTION_TYPE.BONUS,
          reason: "新用户注册",
        },
      });

      if (!existingTransaction) {
        // 赠送注册积分
        await db.user.update({
          where: { id: user.id },
          data: { 
            oneTimePoints: { increment: registerPoints }
          },
        });

        // 记录积分交易
        await db.pointTransaction.create({
          data: {
            userId: user.id,
            points: registerPoints,
            pointType: POINT_TYPE.ONE_TIME,
            transactionType: TRANSACTION_TYPE.BONUS,
            description: "注册赠送积分",
            reason: "新用户注册",
          },
        });

        console.log(`✅ User ${user.email} received ${registerPoints} registration points`);
      }
    }
  } catch (error) {
    console.error("Error granting registration points:", error);
  }
}