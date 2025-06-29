"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentButton } from "./PaymentButton";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval?: "month" | "year" | null;
  stripePriceId: string;
  features: string[];
  popular?: boolean;
  trialDays?: number;
}

interface PricingCardProps {
  plan: PricingPlan;
  className?: string;
}

export function PricingCard({ plan, className }: PricingCardProps) {
  const isSubscription = plan.interval !== null;
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: plan.currency,
    minimumFractionDigits: 0,
  }).format(plan.price / 100);

  const getPriceDisplay = () => {
    if (!isSubscription) {
      return formattedPrice;
    }

    const intervalText = plan.interval === "year" ? "年" : "月";
    return `${formattedPrice}/${intervalText}`;
  };

  const getButtonText = () => {
    if (!isSubscription) {
      return "立即购买";
    }

    if (plan.trialDays && plan.trialDays > 0) {
      return `开始 ${plan.trialDays} 天免费试用`;
    }

    return plan.interval === "year" ? "开始年度订阅" : "开始月度订阅";
  };

  return (
    <Card className={`relative ${className} ${plan.popular ? "border-primary shadow-lg" : ""}`}>
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
          最受欢迎
        </Badge>
      )}
      
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
        <CardDescription className="text-base">{plan.description}</CardDescription>
        
        <div className="mt-4">
          <span className="text-4xl font-bold">{getPriceDisplay()}</span>
          {plan.trialDays && plan.trialDays > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              {plan.trialDays} 天免费试用
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <PaymentButton
          priceId={plan.id}
          type={isSubscription ? "subscription" : "payment"}
          trialDays={plan.trialDays}
          className="w-full"
        >
          {getButtonText()}
        </PaymentButton>

        <div className="space-y-3">
          <p className="font-semibold text-sm">功能包含：</p>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}