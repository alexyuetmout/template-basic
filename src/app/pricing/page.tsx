"use client"

import { Header } from "@/components/home/Header/Header"
import { Footer } from "@/components/home/Footer/Footer"
import { PricingPlans } from "@/components/payments/PricingPlans"
import TagSchema from "@/components/TagSchema"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <TagSchema />
      <Header />
      <PricingPlans />
      <Footer />
    </div>
  )
}