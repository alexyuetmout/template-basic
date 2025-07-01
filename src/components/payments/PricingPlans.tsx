"use client";

import { useState, useEffect } from "react";
import { PaymentButton } from "./PaymentButton";
import { PRICE_INTERVAL } from "@/lib/constants/enums";
import { useTranslation } from "@/hooks/useTranslation";
import { HeadingH1 } from "@/components/ui/headings";

interface PriceData {
  id: string;
  stripePriceId: string;
  amount: number;
  type: string;
  interval: string | null;
  pointsReward: number;
  sortOrder: number;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  priceDetail: string;
  features: string[];
  buttonText: string;
  buttonVariant: "primary" | "secondary";
  popular?: boolean;
}

type PricingMode = "onetime" | "monthly" | "yearly";

// 定价模式配置
const getPricingModeConfig = (t: any) => ({
  defaultMode: "yearly" as PricingMode, // 默认选中年订阅
  popularIds: {
    onetime: "onetime_pro", // 一次性模式的流行选项
    monthly: "subscribe_pro", // 月订阅模式的流行选项
    yearly: "subscribe_basic_year", // 年订阅模式的流行选项
  },
  buttonText: t("getStarted"), // 统一的按钮文案
  modes: [
    { key: "onetime", label: t("modes.onetime") },
    { key: "monthly", label: t("modes.monthly") },
    { key: "yearly", label: t("modes.yearly") },
  ],
});

// 使用多语言配置数据
const getCardContent = (t: any) => {
  const planConfigs = {
    onetime_basic: t("planConfigs.onetime_basic", { returnObjects: true }),
    onetime_pro: t("planConfigs.onetime_pro", { returnObjects: true }),
    onetime_premium: t("planConfigs.onetime_premium", { returnObjects: true }),
    subscribe_basic: t("planConfigs.subscribe_basic", { returnObjects: true }),
    subscribe_pro: t("planConfigs.subscribe_pro", { returnObjects: true }),
    subscribe_premium: t("planConfigs.subscribe_premium", {
      returnObjects: true,
    }),
    subscribe_basic_year: t("planConfigs.subscribe_basic_year", {
      returnObjects: true,
    }),
    subscribe_pro_year: t("planConfigs.subscribe_pro_year", {
      returnObjects: true,
    }),
    subscribe_pre_year: t("planConfigs.subscribe_pre_year", {
      returnObjects: true,
    }),
  };

  return Object.entries(planConfigs).map(([id, config]: [string, any]) => ({
    id,
    name: config.name,
    description: config.description,
    features: config.features,
  }));
};

interface PricingPlansProps {
  initialPrices?: PriceData[];
}

export function PricingPlans({ initialPrices = [] }: PricingPlansProps) {
  const { t } = useTranslation("pricing");
  const pricingModeConfig = getPricingModeConfig(t);
  const cardContent = getCardContent(t);

  const [pricingMode, setPricingMode] = useState<PricingMode>(
    pricingModeConfig.defaultMode
  );
  const [priceData, setPriceData] = useState<PriceData[]>(initialPrices);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);

  // 如果没有初始价格数据，从客户端获取
  useEffect(() => {
    if (initialPrices.length === 0) {
      const fetchPrices = async () => {
        setLoading(true);
        try {
          const response = await fetch("/api/prices");
          const data = await response.json();
          setPriceData(data);
        } catch (error) {
          console.error("Error fetching prices:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPrices();
    }
  }, [initialPrices.length]);

  // 根据定价模式筛选和组合数据
  useEffect(() => {
    if (priceData.length === 0) return;

    let filteredPrices: PriceData[] = [];

    // 根据定价模式筛选价格数据
    switch (pricingMode) {
      case "onetime":
        filteredPrices = priceData.filter((price) => price.interval === null);
        break;
      case "monthly":
        filteredPrices = priceData.filter(
          (price) => price.interval === PRICE_INTERVAL.MONTH
        );
        break;
      case "yearly":
        filteredPrices = priceData.filter(
          (price) => price.interval === PRICE_INTERVAL.YEAR
        );
        break;
    }

    // 组合价格数据和文案配置
    const combinedPlans: Plan[] = filteredPrices.map((priceItem) => {
      const contentConfig = cardContent.find(
        (content) => content.id === priceItem.id
      );

      // 动态判断是否为当前模式的流行选项
      const isPopular =
        pricingModeConfig.popularIds[pricingMode] === priceItem.id;

      if (!contentConfig) {
        // 如果没有找到对应的文案配置，使用默认值
        return {
          id: priceItem.id,
          name: t("unknown"),
          description: t("descriptionNotAvailable"),
          price: `$${(priceItem.amount / 100).toFixed(2)}`,
          priceDetail:
            pricingMode === "onetime"
              ? ""
              : `/${pricingMode === "monthly" ? t("month") : t("year")}`,
          features: [],
          buttonText: pricingModeConfig.buttonText,
          buttonVariant: isPopular ? "primary" : "secondary",
          popular: isPopular,
        };
      }

      return {
        id: priceItem.id,
        name: contentConfig.name,
        description: contentConfig.description,
        price: `$${(priceItem.amount / 100).toFixed(2)}`,
        priceDetail:
          pricingMode === "onetime"
            ? ""
            : `/${pricingMode === "monthly" ? t("month") : t("year")}`,

        features: contentConfig.features,
        buttonText: pricingModeConfig.buttonText,
        buttonVariant: isPopular ? "primary" : "secondary",
        popular: isPopular,
      };
    });

    setPlans(combinedPlans);
  }, [priceData, pricingMode]);

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">{t("loading")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            {t("title")}
          </div>
          <HeadingH1 className=" text-3xl md:text-4xl text-neutral-900 mb-2">
            {t("subtitle")}
          </HeadingH1>
          <p className="text-base text-secondary-foreground">
            {t("description")}
          </p>
        </div>

        {/* Pricing Mode Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            {pricingModeConfig.modes.map((mode) => (
              <button
                key={mode.key}
                onClick={() => setPricingMode(mode.key as PricingMode)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  pricingMode === mode.key
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-lg p-8 relative ${
                plan.popular
                  ? "border-2 border-blue-500 transform scale-105"
                  : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                    {t("mostPopular")}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span
                    className={`text-5xl font-bold ${
                      plan.price === "Free" ? "text-blue-500" : "text-gray-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.priceDetail && (
                    <span className="text-gray-500 text-lg">
                      {plan.priceDetail}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      {feature.startsWith("×") ? (
                        <>
                          <svg
                            className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-400">
                            {feature.slice(1)}
                          </span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <div className="text-center">
                <PaymentButton
                  priceId={plan.id}
                  type="payment"
                  variant={
                    plan.buttonVariant === "primary" ? "default" : "outline"
                  }
                  size="lg"
                  className={`w-full mx-auto max-w-xs rounded-2xl transition-all duration-200 ${
                    plan.buttonVariant === "primary"
                      ? "transform hover:scale-105 shadow-lg hover:shadow-xl"
                      : ""
                  }`}
                >
                  {plan.buttonText}
                </PaymentButton>
              </div>
            </div>
          ))}
        </div>

        {/* No Data Message */}
        {plans.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t("noPricingPlans")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
