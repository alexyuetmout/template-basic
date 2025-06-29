"use client";

import { useState, useEffect } from "react";
import { PricingCard } from "./PricingCard";

interface Price {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  interval?: "month" | "year" | null;
  stripePriceId: string;
  features: string[];
  popular?: boolean;
  trialDays?: number;
}

export function PricingSection() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const response = await fetch("/api/prices");
      if (response.ok) {
        const data = await response.json();
        setPrices(data);
      }
    } catch (error) {
      console.error("Error fetching prices:", error);
    } finally {
      setLoading(false);
    }
  };

  // 示例数据（当 API 没有数据时使用）
  const examplePlans: Price[] = [
    {
      id: "price_basic",
      name: "基础版",
      description: "适合个人用户",
      amount: 990, // $9.90
      currency: "usd",
      interval: "month",
      stripePriceId: "price_1234567890", // 替换为实际的 Stripe Price ID
      features: [
        "每月 1000 积分",
        "基础 AI 功能",
        "邮件支持",
        "基础分析报告"
      ],
    },
    {
      id: "price_pro",
      name: "专业版",
      description: "适合小团队",
      amount: 2990, // $29.90
      currency: "usd",
      interval: "month",
      stripePriceId: "price_0987654321", // 替换为实际的 Stripe Price ID
      features: [
        "每月 5000 积分",
        "高级 AI 功能",
        "优先支持",
        "详细分析报告",
        "API 访问权限"
      ],
      popular: true,
      trialDays: 7,
    },
    {
      id: "price_enterprise",
      name: "企业版",
      description: "适合大型团队",
      amount: 9990, // $99.90
      currency: "usd",
      interval: "month",
      stripePriceId: "price_1122334455", // 替换为实际的 Stripe Price ID
      features: [
        "无限积分",
        "所有 AI 功能",
        "专属客户经理",
        "定制化报告",
        "完整 API 权限",
        "单点登录 (SSO)"
      ],
    },
    // 年度计划
    {
      id: "price_pro_yearly",
      name: "专业版（年付）",
      description: "年付享受 2 个月免费",
      amount: 29900, // $299.00 (节省 $59.80)
      currency: "usd",
      interval: "year",
      stripePriceId: "price_yearly_123", // 替换为实际的 Stripe Price ID
      features: [
        "每月 5000 积分",
        "高级 AI 功能",
        "优先支持",
        "详细分析报告",
        "API 访问权限",
        "年付优惠 17%"
      ],
      popular: true,
      trialDays: 14,
    },
    // 一次性购买
    {
      id: "price_credits",
      name: "积分包",
      description: "一次性购买积分",
      amount: 4990, // $49.90
      currency: "usd",
      interval: null, // 一次性付款
      stripePriceId: "price_credits_789", // 替换为实际的 Stripe Price ID
      features: [
        "10000 积分",
        "永不过期",
        "可叠加使用",
        "适合偶尔使用"
      ],
    },
  ];

  const displayPlans = prices.length > 0 ? prices : examplePlans;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // 分组显示：订阅计划和一次性购买
  const subscriptionPlans = displayPlans.filter(plan => plan.interval !== null);
  const oneTimePlans = displayPlans.filter(plan => plan.interval === null);

  return (
    <div className="space-y-12">
      {/* 订阅计划 */}
      {subscriptionPlans.length > 0 && (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">订阅计划</h2>
            <p className="text-lg text-muted-foreground">
              选择最适合你的订阅计划，随时可以取消
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      )}

      {/* 一次性购买 */}
      {oneTimePlans.length > 0 && (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">一次性购买</h2>
            <p className="text-lg text-muted-foreground">
              按需购买，无需订阅
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {oneTimePlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      )}

      {/* 常见问题 */}
      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold mb-4">常见问题</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <p className="font-medium">可以随时取消订阅吗？</p>
            <p className="text-muted-foreground">是的，你可以随时取消订阅，取消后仍可使用到当前计费周期结束。</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">支持哪些支付方式？</p>
            <p className="text-muted-foreground">我们支持所有主流信用卡、借记卡以及其他本地支付方式。</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">可以升级或降级计划吗？</p>
            <p className="text-muted-foreground">可以的，你可以随时更改你的订阅计划，费用会按比例调整。</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">有退款政策吗？</p>
            <p className="text-muted-foreground">我们提供 30 天退款保证，如不满意可申请全额退款。</p>
          </div>
        </div>
      </div>
    </div>
  );
}