"use client";

import { useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

interface PaymentButtonProps extends Omit<ButtonProps, 'onClick' | 'disabled' | 'type'> {
  priceId: string;
  type: "payment" | "subscription";
  children: React.ReactNode;
  disabled?: boolean;
  trialDays?: number;
  successUrl?: string;
  cancelUrl?: string;
}

export function PaymentButton({
  priceId,
  type,
  children,
  className,
  disabled,
  trialDays,
  successUrl,
  cancelUrl,
  variant,
  size,
  ...props
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!priceId) {
      console.error("Price ID is required");
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = type === "payment" 
        ? "/api/checkout/payment" 
        : "/api/checkout/subscription";

      const body: any = {
        priceId,
        successUrl,
        cancelUrl,
      };

      // 如果是订阅且有试用期，添加试用天数
      if (type === "subscription" && trialDays) {
        body.trialDays = trialDays;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // 重定向到 Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Failed to start checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={className}
      variant={variant}
      size={size}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </Button>
  );
}