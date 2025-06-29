import { db } from "@/lib/db";
import { PointTransaction, PointType, TransactionType } from "@prisma/client";

export interface CreatePointTransactionData {
  userId: string;
  points: number;
  pointType: PointType;
  transactionType: TransactionType;
  reason?: string;
  description?: string;
  orderId?: string;
  subscriptionId?: string;
  referenceId?: string;
}

export class PointsService {
  static async createTransaction(data: CreatePointTransactionData): Promise<PointTransaction> {
    return db.$transaction(async (tx) => {
      // Create the point transaction
      const transaction = await tx.pointTransaction.create({
        data,
      });

      // Update user points based on transaction type and point type
      if (data.transactionType === "EARN" || data.transactionType === "BONUS") {
        if (data.pointType === "ONE_TIME") {
          await tx.user.update({
            where: { id: data.userId },
            data: {
              oneTimePoints: { increment: data.points },
            },
          });
        } else if (data.pointType === "SUBSCRIPTION") {
          await tx.user.update({
            where: { id: data.userId },
            data: {
              subscriptionPoints: { increment: data.points },
            },
          });
        }
      } else if (data.transactionType === "SPEND" || data.transactionType === "EXPIRE" || data.transactionType === "REFUND") {
        if (data.pointType === "ONE_TIME") {
          await tx.user.update({
            where: { id: data.userId },
            data: {
              oneTimePoints: { decrement: Math.abs(data.points) },
            },
          });
        } else if (data.pointType === "SUBSCRIPTION") {
          await tx.user.update({
            where: { id: data.userId },
            data: {
              subscriptionPoints: { decrement: Math.abs(data.points) },
            },
          });
        }
      }

      return transaction;
    });
  }

  static async getUserTransactions(
    userId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<PointTransaction[]> {
    return db.pointTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
      include: {
        order: true,
        subscription: true,
      },
    });
  }

  static async getUserPointsBalance(userId: string): Promise<{
    oneTimePoints: number;
    subscriptionPoints: number;
    totalPoints: number;
    pointsExpiresAt: Date | null;
  }> {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        oneTimePoints: true,
        subscriptionPoints: true,
        pointsExpiresAt: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      oneTimePoints: user.oneTimePoints,
      subscriptionPoints: user.subscriptionPoints,
      totalPoints: user.oneTimePoints + user.subscriptionPoints,
      pointsExpiresAt: user.pointsExpiresAt,
    };
  }

  static async spendPoints(
    userId: string,
    pointsToSpend: number,
    reason?: string,
    description?: string
  ): Promise<{ success: boolean; message: string }> {
    return db.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: {
          oneTimePoints: true,
          subscriptionPoints: true,
        },
      });

      if (!user) {
        return { success: false, message: "User not found" };
      }

      const totalPoints = user.oneTimePoints + user.subscriptionPoints;
      if (totalPoints < pointsToSpend) {
        return { success: false, message: "Insufficient points" };
      }

      // Spend subscription points first, then one-time points
      let remainingToSpend = pointsToSpend;
      
      if (user.subscriptionPoints > 0 && remainingToSpend > 0) {
        const subscriptionPointsToSpend = Math.min(user.subscriptionPoints, remainingToSpend);
        
        await this.createTransaction({
          userId,
          points: subscriptionPointsToSpend,
          pointType: "SUBSCRIPTION",
          transactionType: "SPEND",
          reason,
          description,
        });
        
        remainingToSpend -= subscriptionPointsToSpend;
      }

      if (remainingToSpend > 0) {
        await this.createTransaction({
          userId,
          points: remainingToSpend,
          pointType: "ONE_TIME",
          transactionType: "SPEND",
          reason,
          description,
        });
      }

      return { success: true, message: "Points spent successfully" };
    });
  }

  static async grantPointsForOrder(
    userId: string,
    orderId: string,
    points: number,
    expiresAt?: Date
  ): Promise<PointTransaction> {
    return db.$transaction(async (tx) => {
      // Create transaction
      const transaction = await this.createTransaction({
        userId,
        points,
        pointType: "ONE_TIME",
        transactionType: "EARN",
        reason: "Purchase reward",
        description: `Points earned from order ${orderId}`,
        orderId,
      });

      // Update expiration date if provided
      if (expiresAt) {
        await tx.user.update({
          where: { id: userId },
          data: { pointsExpiresAt: expiresAt },
        });
      }

      return transaction;
    });
  }

  static async grantSubscriptionPoints(
    userId: string,
    subscriptionId: string,
    points: number
  ): Promise<PointTransaction> {
    return this.createTransaction({
      userId,
      points,
      pointType: "SUBSCRIPTION",
      transactionType: "EARN",
      reason: "Subscription reward",
      description: `Monthly points from subscription ${subscriptionId}`,
      subscriptionId,
    });
  }

  static async expireUserPoints(userId: string): Promise<void> {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { oneTimePoints: true },
    });

    if (!user || user.oneTimePoints <= 0) {
      return;
    }

    await this.createTransaction({
      userId,
      points: user.oneTimePoints,
      pointType: "ONE_TIME",
      transactionType: "EXPIRE",
      reason: "Points expired",
      description: "One-time points have expired",
    });
  }
}