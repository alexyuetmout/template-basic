import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  secret: process.env.BETTER_AUTH_SECRET as string,
  baseURL: process.env.BETTER_AUTH_URL as string,
  user: {
    additionalFields: {
      // 只保留真正需要的业务字段
      stripeCustomerId: {
        type: "string", 
        required: false,
        unique: true,
      },
      balance: {
        type: "number",
        required: false,
        defaultValue: 0,
      },
      oneTimePoints: {
        type: "number",
        required: false,
        defaultValue: 0,
      },
      subscriptionPoints: {
        type: "number",
        required: false,
        defaultValue: 0,
      },
      pointsExpiresAt: {
        type: "date",
        required: false,
      },
      isAdmin: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
      status: {
        type: "string",
        required: false,
        defaultValue: "ACTIVE",
      },
      countryCode: {
        type: "string",
        required: false,
      },
    },
  },
});