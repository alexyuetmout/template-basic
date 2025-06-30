'use client'
import React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"


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


export function Features2() {
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