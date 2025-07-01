import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { OrderService } from "@/lib/services/orders";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return apiError("Unauthorized", 401);
    }

    const body = await req.json();
    const { priceId, metadata } = body;

    if (!priceId) {
      return apiError("Price ID is required", 400);
    }

    const result = await OrderService.createOrder({
      userId: (session.user as any).id,
      priceId,
      metadata,
    });

    return apiSuccess({
      order: result.order,
      clientSecret: (result.paymentIntent as any).client_secret,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return apiError("Internal server error", 500);
  }
}

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return apiError("Unauthorized", 401);
    }

    const orders = await OrderService.getUserOrders((session.user as any).id);

    return apiSuccess(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return apiError("Internal server error", 500);
  }
}