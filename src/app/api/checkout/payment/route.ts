import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    // 检查 Stripe 是否配置
    if (!stripe) {
      return apiError("Payment service not configured", 500);
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return apiError("Unauthorized", 401);
    }

    const body = await req.json();
    const { priceId, quantity = 1, successUrl, cancelUrl } = body;

    if (!priceId) {
      return apiError("Price ID is required", 400);
    }

    // 获取价格信息
    const price = await db.price.findUnique({
      where: { id: priceId },
    });

    if (!price) {
      return apiError("Price not found", 404);
    }

    // 获取用户信息
    const user = await db.user.findUnique({
      where: { id: (session.user as any).id },
    });

    if (!user) {
      return apiError("User not found", 404);
    }

    // 确保用户有 Stripe 客户 ID
    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
        metadata: {
          userId: user.id,
        },
      });
      
      stripeCustomerId = customer.id;
      
      // 更新用户的 Stripe 客户 ID
      await db.user.update({
        where: { id: user.id },
        data: { stripeCustomerId },
      });
    }

    // 创建 Checkout Session 用于一次性支付
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: [
        {
          price: price.stripePriceId,
          quantity,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${req.nextUrl.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.nextUrl.origin}/payment/cancel`,
      metadata: {
        userId: user.id,
        priceId: price.id,
      },
    });

    return apiSuccess({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error("Error creating payment session:", error);
    return apiError("Internal server error", 500);
  }
}