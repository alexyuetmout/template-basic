import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import Link from "next/link"

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingPlan {
  name: string
  description: string
  price: string
  priceUnit?: string
  isPopular?: boolean
  features: PricingFeature[]
  ctaText: string
  ctaVariant?: "default" | "outline"
  ctaHref: string
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    description: "Experience Cursor tutorials and AI programming basics",
    price: "Free",
    features: [
      { text: "Basic Cursor tutorials", included: true },
      { text: "AI programming environment setup", included: true },
      { text: "Basic development tools", included: true },
      { text: "Public community access", included: true },
      { text: "Complete Cursor tutorials", included: false },
      { text: "AI programming Q&A service", included: false },
      { text: "VIP community group", included: false },
      { text: "AI application templates", included: false }
    ],
    ctaText: "Start Learning",
    ctaVariant: "outline",
    ctaHref: "https://aimaker.dev/#pricing"
  },
  {
    name: "Complete Course",
    description: "Master Cursor and AI programming systematically",
    price: "$99",
    priceUnit: "/month",
    isPopular: true,
    features: [
      { text: "Complete Cursor tutorials", included: true },
      { text: "AI programming projects", included: true },
      { text: "One-on-one support", included: true },
      { text: "VIP community access", included: true },
      { text: "Lifetime course updates", included: true },
      { text: "Priority technical support", included: false },
      { text: "AI application templates", included: false },
      { text: "Login system source code", included: false },
      { text: "Payment system integration", included: false },
      { text: "Commercial license", included: false }
    ],
    ctaText: "Limited Time Offer",
    ctaVariant: "default",
    ctaHref: "https://aimaker.dev/#pricing"
  },
  {
    name: "Advanced",
    description: "Master professional AI programming skills",
    price: "$199",
    priceUnit: "/month",
    features: [
      { text: "Complete Cursor tutorials", included: true },
      { text: "AI programming projects", included: true },
      { text: "One-on-one support", included: true },
      { text: "VIP community access", included: true },
      { text: "Lifetime course updates", included: true },
      { text: "Priority technical support", included: true },
      { text: "AI application templates", included: true },
      { text: "Login system source code", included: true },
      { text: "Payment system integration", included: true },
      { text: "Commercial license", included: true }
    ],
    ctaText: "View Demo",
    ctaVariant: "outline",
    ctaHref: "https://aimaker.dev/#pricing"
  }
]

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div className={`relative rounded-3xl border bg-white p-8 shadow-sm transition-all hover:shadow-md dark:bg-neutral-900 ${
      plan.isPopular ? 'border-primary' : 'border-neutral-200 dark:border-neutral-800'
    }`}>
      {plan.isPopular && (
        <div className="absolute -top-5 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">
          Most Popular
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
            <span className={feature.included 
              ? "text-neutral-600 dark:text-neutral-300" 
              : "text-neutral-400 dark:text-neutral-500"
            }>
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      <Link href={plan.ctaHref}>
        <Button 
          variant={plan.ctaVariant} 
          className={`w-full h-12 rounded-xl ${plan.ctaVariant === 'default' ? 'font-bold' : ''}`}
        >
          {plan.ctaText}
        </Button>
      </Link>
    </div>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="overflow-hidden bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold tracking-wide text-primary bg-primary/10 dark:bg-primary/5 mb-6">
            Pricing Plans
          </h2>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
            Choose Your Learning Plan
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            Start your AI development journey with the perfect plan for you
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
} 