import Stripe from "stripe";

// 检查 Stripe 密钥是否配置
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey || stripeSecretKey.startsWith('sk_test_your-')) {
  console.warn('⚠️  Stripe secret key not configured properly. Some payment features will not work.');
}

export const stripe = stripeSecretKey && !stripeSecretKey.startsWith('sk_test_your-') 
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-05-28.basil",
      typescript: true,
    })
  : null;

export const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY || '';