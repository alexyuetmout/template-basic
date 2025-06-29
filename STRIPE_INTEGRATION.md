# Stripe 集成指南

## 概述

本项目已集成完整的 Stripe 支付系统，支持：
- 一次性支付
- 月度订阅
- 年度订阅
- Webhook 处理
- 积分系统集成

## 环境变量配置

在 `.env.local` 文件中添加以下环境变量：

```env
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## API 路由

### 一次性支付
- **POST** `/api/checkout/payment`
- 创建 Stripe Checkout Session 用于一次性支付

请求体：
```json
{
  "priceId": "price_xxx",
  "quantity": 1,
  "successUrl": "https://yoursite.com/payment/success",
  "cancelUrl": "https://yoursite.com/payment/cancel"
}
```

### 订阅支付
- **POST** `/api/checkout/subscription`
- 创建 Stripe Checkout Session 用于订阅

请求体：
```json
{
  "priceId": "price_xxx",
  "trialDays": 7,
  "successUrl": "https://yoursite.com/subscription/success",
  "cancelUrl": "https://yoursite.com/subscription/cancel"
}
```

- **GET** `/api/checkout/subscription`
- 获取用户的订阅列表

### Webhook
- **POST** `/api/webhooks/stripe`
- 处理 Stripe Webhook 事件

支持的事件：
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`

## 前端组件

### PaymentButton
用于创建支付按钮的组件：

```tsx
import { PaymentButton } from "@/components/payments/PaymentButton";

<PaymentButton
  priceId="price_xxx"
  type="payment" // 或 "subscription"
  trialDays={7} // 仅订阅使用
>
  购买
</PaymentButton>
```

### PricingCard
显示定价卡片的组件：

```tsx
import { PricingCard } from "@/components/payments/PricingCard";

const plan = {
  id: "price_xxx",
  name: "专业版",
  description: "适合小团队",
  price: 2990, // 分为单位
  currency: "usd",
  interval: "month", // "month", "year", 或 null
  stripePriceId: "price_xxx",
  features: ["功能1", "功能2"],
  popular: true,
  trialDays: 7
};

<PricingCard plan={plan} />
```

### PricingSection
完整的定价页面组件：

```tsx
import { PricingSection } from "@/components/payments/PricingSection";

<PricingSection />
```

## 数据库模型

确保你的数据库中有以下表和字段：

### Price 表
- `id`: String
- `name`: String
- `description`: String
- `amount`: Int (分为单位)
- `currency`: String
- `interval`: String? ("month", "year", null)
- `stripePriceId`: String
- `pointsReward`: Int (积分奖励)

### Order 表
- `id`: String
- `orderNumber`: String
- `userId`: String
- `priceId`: String
- `amount`: Int
- `status`: OrderStatus
- `stripePaymentIntentId`: String?
- `pointsAdded`: Int

### Subscription 表
- `id`: String
- `userId`: String
- `priceId`: String
- `stripeSubscriptionId`: String
- `subscriptionType`: SubscriptionType
- `status`: SubscriptionStatus
- `currentPeriodStart`: DateTime
- `currentPeriodEnd`: DateTime

### User 表
需要添加：
- `stripeCustomerId`: String?

## Stripe 控制台配置

1. **创建产品和价格**
   - 在 Stripe 控制台创建产品
   - 为每个产品创建对应的价格
   - 复制 Price ID 到数据库

2. **配置 Webhook**
   - 在 Stripe 控制台添加 Webhook 端点
   - URL: `https://yoursite.com/api/webhooks/stripe`
   - 选择以下事件：
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`

## 测试

### 测试卡号
- 成功: `4242424242424242`
- 失败: `4000000000000002`
- 需要验证: `4000002500003155`

### 本地测试 Webhook
使用 Stripe CLI：

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## 使用示例

### 基本使用
```tsx
"use client";

import { PricingSection } from "@/components/payments/PricingSection";

export default function PricingPage() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        选择适合您的计划
      </h1>
      <PricingSection />
    </div>
  );
}
```

### 自定义支付按钮
```tsx
"use client";

import { PaymentButton } from "@/components/payments/PaymentButton";

export default function CustomPayment() {
  return (
    <div>
      <h2>购买积分包</h2>
      <PaymentButton
        priceId="price_credits_xxx"
        type="payment"
        className="bg-blue-600 hover:bg-blue-700"
      >
        购买 10000 积分 - $49.90
      </PaymentButton>
    </div>
  );
}
```

## 注意事项

1. **安全性**
   - 永远不要在前端暴露 `STRIPE_SECRET_KEY`
   - 验证所有 Webhook 签名
   - 使用 HTTPS 在生产环境中

2. **用户体验**
   - 提供清晰的成功/取消页面
   - 在支付流程中显示加载状态
   - 处理支付失败的情况

3. **测试**
   - 在生产环境前充分测试所有支付流程
   - 测试 Webhook 事件处理
   - 验证积分系统集成

4. **监控**
   - 监控 Webhook 事件处理
   - 设置支付失败告警
   - 跟踪订阅状态变化

## 故障排除

### 常见问题

1. **Webhook 签名验证失败**
   - 检查 `STRIPE_WEBHOOK_SECRET` 是否正确
   - 确保使用原始请求体进行验证

2. **客户创建失败**
   - 检查用户邮箱是否有效
   - 确保 Stripe 客户 ID 正确保存

3. **订阅状态不同步**
   - 检查 Webhook 事件是否正确处理
   - 验证订阅 ID 映射是否正确

如需更多帮助，请查看 Stripe 官方文档或联系开发团队。