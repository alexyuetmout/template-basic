"use client";

import { PaymentButton } from "./PaymentButton";

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

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Experience Cursor tutorials and AI programming basics",
    price: "Free",
    priceDetail: "",
    features: [
      "Basic Cursor tutorials",
      "AI programming environment setup",
      "Basic development tools",
      "Public community access",
      "×Complete Cursor tutorials",
      "×AI programming Q&A service",
      "×VIP community group",
      "×AI application templates"
    ],
    buttonText: "Start Learning",
    buttonVariant: "secondary"
  },
  {
    id: "complete",
    name: "Complete Course",
    description: "Master Cursor and AI programming systematically",
    price: "$99",
    priceDetail: "/month",
    features: [
      "Complete Cursor tutorials",
      "AI programming projects",
      "One-on-one support",
      "VIP community access",
      "Lifetime course updates",
      "×Priority technical support",
      "×AI application templates",
      "×Login system source code",
      "×Payment system integration",
      "×Commercial license"
    ],
    buttonText: "Limited Time Offer",
    buttonVariant: "primary",
    popular: true
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Master professional AI programming skills",
    price: "$199",
    priceDetail: "/month",
    features: [
      "Complete Cursor tutorials",
      "AI programming projects",
      "One-on-one support",
      "VIP community access",
      "Lifetime course updates",
      "Priority technical support",
      "AI application templates",
      "Login system source code",
      "Payment system integration",
      "Commercial license"
    ],
    buttonText: "View Demo",
    buttonVariant: "secondary"
  }
];

export function PricingPlans() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Pricing Plans
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Learning Plan
          </h1>
          <p className="text-xl text-gray-600">
            Start your AI development journey with the perfect plan for you
          </p>
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
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className={`text-5xl font-bold ${
                    plan.price === "Free" ? "text-blue-500" : "text-gray-900"
                  }`}>
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
                          <svg className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-400">
                            {feature.slice(1)}
                          </span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">
                            {feature}
                          </span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <div className="text-center">
                {plan.buttonVariant === "primary" ? (
                  <PaymentButton
                    priceId={plan.id}
                    type="payment"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                  >
                    {plan.buttonText}
                  </PaymentButton>
                ) : (
                  <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:bg-gray-50">
                    {plan.buttonText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}