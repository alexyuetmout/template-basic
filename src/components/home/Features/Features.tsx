import React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const features1 = [
  {
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    ),
    title: "Complete AI Framework",
    description: "Built-in AI integration with modern components and infrastructure. Everything you need to build and scale your AI application."
  },
  {
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z"></path>
      </svg>
    ),
    title: "Production Ready",
    description: "Authentication with GitHub/Google OAuth, Stripe payments, and scalable infrastructure with best practices built-in."
  },
  {
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
      </svg>
    ),
    title: "Ship Fast",
    description: "Next.js 15, React 19, TypeScript, and modern development tools. Deploy your AI product in hours, not weeks."
  }
]

const features2 = [
  {
    title: "Modern Authentication",
    description: "Complete authentication system with GitHub and Google OAuth support",
    bgColor: "bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20",
    image: "/images/feature/feature-2/1.svg"
  },
  {
    title: "Payment Integration", 
    description: "Built-in Stripe payment system for subscriptions and one-time payments",
    bgColor: "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20",
    image: "/images/feature/feature-2/2.svg"
  },
  {
    title: "Dark Mode Support",
    description: "Seamless dark mode integration with modern design system",
    bgColor: "bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20",
    image: "/images/feature/feature-2/3.svg"
  },
  {
    title: "Responsive Design",
    description: "Fully responsive layouts that work perfectly on all devices",
    bgColor: "bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20",
    image: "/images/feature/feature-2/4.svg"
  },
  {
    title: "SEO Optimized",
    description: "Auto-generated sitemap and SEO-friendly structure",
    bgColor: "bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20",
    image: "/images/feature/feature-2/5.svg"
  },
  {
    title: "Modular Architecture",
    description: "Clean and modular code structure for easy customization",
    bgColor: "bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20",
    image: "/images/feature/feature-2/6.svg"
  }
]

function Features1() {
  return (
    <div className="relative py-20 bg-white dark:bg-neutral-900" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold tracking-wide text-primary bg-primary/10 dark:text-primary dark:bg-primary/20">
            Why Choose AIMaker
          </h2>
          <p className="mt-6 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Everything You Need for AI Development
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-base text-neutral-600 dark:text-neutral-400">
            Launch your AI product in hours, not weeks. Built with modern tech stack and designed for rapid development.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features1.map((feature, index) => (
              <div key={index} className="h-full">
                <Card className="h-full p-8 bg-white dark:bg-neutral-800 rounded-2xl border-0 shadow-sm">
                  <CardContent className="p-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary">
                      {feature.icon}
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Features2() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <div className="relative py-20 bg-gray-50 dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold tracking-wide text-primary bg-primary/10 dark:bg-primary/5 mb-6">
            Template Features
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
            Everything You Need
          </h2>
          <p className="max-w-2xl mx-auto text-base text-neutral-600 dark:text-neutral-400">
            A comprehensive Next.js template with rich components and modern features. Built for developers, designed for rapid development.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {features2.map((feature, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="group h-full">
                  <div className="h-full flex flex-col bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/5 flex items-center justify-center flex-shrink-0">
                          <div className="w-6 h-6 rounded-lg bg-primary/20"></div>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    
                    <div className={`relative h-48 ${feature.bgColor} p-6 flex items-center justify-center`}>
                      <div className="relative w-28 h-28">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}

export function Features() {
  return (
    <>
      <Features1 />
      <Features2 />
    </>
  )
}