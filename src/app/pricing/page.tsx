"use client"

import { Header } from "@/components/home/Header/Header"
import { Footer } from "@/components/home/Footer/Footer"
import { Pricing } from "@/components/home/Pricing/Pricing"
import TagSchema from "@/components/TagSchema"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <TagSchema />
      <Header />
      <main className="flex-1">
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}