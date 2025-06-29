"use client"

import { Header } from "@/components/home/Header/Header"
import { Footer } from "@/components/home/Footer/Footer"
import { Pricing } from "@/components/home/Pricing/Pricing"
import { PricingSection } from "@/components/payments/PricingSection"
import TagSchema from "@/components/TagSchema"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <TagSchema />
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">选择适合您的计划</h1>
            <p className="text-xl text-muted-foreground">
              灵活的定价选项，满足您的不同需求
            </p>
          </div>
          
          <PricingSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}