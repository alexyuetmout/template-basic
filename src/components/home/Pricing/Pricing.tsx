"use client";

import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { usePath } from "@/lib/utils/path";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  priceUnit?: string;
  isPopular?: boolean;
  features: PricingFeature[];
  ctaText: string;
  ctaVariant?: "default" | "outline";
  ctaHref: string;
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  const { t } = useTranslation("home");
  const path = usePath();

  return (
    <div
      className={`relative rounded-3xl border bg-white p-8 shadow-sm transition-all hover:shadow-md dark:bg-neutral-900 ${
        plan.isPopular
          ? "border-primary"
          : "border-neutral-200 dark:border-neutral-800"
      }`}
    >
      {plan.isPopular && (
        <div className="absolute -top-5 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">
          {t("pricing.mostPopular")}
        </div>
      )}

      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {plan.name}
        </h3>
        <p className="mb-6 text-neutral-600 dark:text-neutral-300">
          {plan.description}
        </p>
        <div className="flex items-baseline">
          <span className="text-5xl font-bold tracking-tight text-primary dark:text-primary">
            {plan.price}
          </span>
          {plan.priceUnit && (
            <span className="text-neutral-600 dark:text-neutral-300">
              {plan.priceUnit}
            </span>
          )}
        </div>
      </div>

      <div className="mb-8 space-y-4">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            {feature.included ? (
              <Check className="h-5 w-5 text-primary" />
            ) : (
              <X className="h-5 w-5 text-neutral-400" />
            )}
            <span
              className={
                feature.included
                  ? "text-neutral-600 dark:text-neutral-300"
                  : "text-neutral-400 dark:text-neutral-500"
              }
            >
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      <Link href={path(plan.ctaHref || "/sign-up")}>
        <Button
          variant={plan.ctaVariant || "outline"}
          className={`w-full h-12 rounded-xl ${
            plan.ctaVariant === "default" ? "font-bold" : ""
          }`}
        >
          {plan.ctaText}
        </Button>
      </Link>
    </div>
  );
}

export function Pricing() {
  const { t } = useTranslation("home");

  const pricingPlans: PricingPlan[] = t("pricing.plans", {
    returnObjects: true,
  }) as PricingPlan[];

  // 防止空数据导致的错误
  if (!pricingPlans || pricingPlans.length === 0) {
    return null;
  }

  // 过滤掉无效的plans并补充默认值
  const validPlans = pricingPlans
    .filter((plan) => plan && plan.name && plan.ctaText)
    .map((plan) => ({
      ...plan,
      ctaHref: plan.ctaHref || "/sign-up",
      ctaVariant: plan.ctaVariant || "outline",
    }));

  return (
    <section
      id="pricing"
      className="overflow-hidden bg-white dark:bg-neutral-900"
    >
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold tracking-wide text-primary bg-primary/10 dark:bg-primary/5 mb-6">
            {t("pricing.badge")}
          </h2>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
            {t("pricing.title")}
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {validPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
