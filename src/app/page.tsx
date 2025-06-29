"use client"

import { Hero } from "@/components/home/Hero/Hero"
import { HeroBackground } from "@/components/home/HeroBackground/HeroBackground"
import { Features } from "@/components/home/Features/Features"
import { Header } from "@/components/home/Header/Header"
import { CTA } from "@/components/home/CTA/CTA"
import { Footer } from "@/components/home/Footer/Footer"
import { TechStack } from "@/components/home/TechStack/TechStack"
import { FAQ } from "@/components/home/FAQ/FAQ"
import { Pricing } from "@/components/home/Pricing/Pricing"
import { Testimonials } from "@/components/home/Testimonials/Testimonials"
import { PromoBanner } from "@/components/home/PromoBanner/PromoBanner"
import { FeatureShowcase } from "@/components/home/FeatureShowcase/FeatureShowcase"
import { ComparisonChart } from "@/components/home/ComparisonChart/ComparisonChart"
import { Blog } from "@/components/home/Blog/Blog"
import { Stats } from "@/components/home/Stats/Stats"
import { VideoTutorial } from "@/components/home/VideoTutorial/VideoTutorial"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <PromoBanner />
      <Header />
      <main className="flex-1">
        <div className="relative">
          <HeroBackground />
          <Hero />
          <Features />
          <TechStack />
          <ComparisonChart />
          <FeatureShowcase />
          <Blog />
          <Testimonials />
          <FAQ />
          <Pricing />
          <VideoTutorial />
          <Stats />
          <CTA />
        </div>
      </main>
      <Footer />
    </div>
  )
}
