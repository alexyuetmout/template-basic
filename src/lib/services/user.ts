import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { User, Prisma } from "@prisma/client";

export interface CreateUserData {
  email: string;
  name?: string;
  image?: string;
  countryCode?: string;
}

export class UserService {
  static async createUser(data: CreateUserData): Promise<User> {
    // Create Stripe customer
    const stripeCustomer = await stripe.customers.create({
      email: data.email,
      name: data.name,
    });

    const user = await db.user.create({
      data: {
        email: data.email,
        name: data.name,
        image: data.image,
        countryCode: data.countryCode,
        stripeCustomerId: stripeCustomer.id,
      },
    });

    return user;
  }

  static async getUserById(id: string): Promise<User | null> {
    return db.user.findUnique({
      where: { id },
    });
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    return db.user.findUnique({
      where: { email },
    });
  }

  static async getUserByStripeCustomerId(stripeCustomerId: string): Promise<User | null> {
    return db.user.findUnique({
      where: { stripeCustomerId },
    });
  }

  static async updateUser(id: string, data: Partial<User>): Promise<User> {
    return db.user.update({
      where: { id },
      data,
    });
  }

  static async updateUserBalance(id: string, amount: number): Promise<User> {
    return db.user.update({
      where: { id },
      data: {
        balance: {
          increment: amount,
        },
      },
    });
  }

  static async updateUserPoints(
    id: string, 
    oneTimePoints?: number, 
    subscriptionPoints?: number,
    pointsExpiresAt?: Date
  ): Promise<User> {
    const updateData: Prisma.UserUpdateInput = {};
    
    if (oneTimePoints !== undefined) {
      updateData.oneTimePoints = { increment: oneTimePoints };
    }
    
    if (subscriptionPoints !== undefined) {
      updateData.subscriptionPoints = { increment: subscriptionPoints };
    }
    
    if (pointsExpiresAt) {
      updateData.pointsExpiresAt = pointsExpiresAt;
    }

    return db.user.update({
      where: { id },
      data: updateData,
    });
  }

  static async getUsersWithExpiredPoints(): Promise<User[]> {
    return db.user.findMany({
      where: {
        pointsExpiresAt: {
          lte: new Date(),
        },
        oneTimePoints: {
          gt: 0,
        },
      },
    });
  }

  static async expireUserPoints(id: string): Promise<void> {
    await db.user.update({
      where: { id },
      data: {
        oneTimePoints: 0,
        pointsExpiresAt: null,
      },
    });
  }
}