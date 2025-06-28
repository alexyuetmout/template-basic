"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Link from "next/link"
import Image from "next/image"
import { Check, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function Home() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full transition-all duration-200">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link className="flex items-center gap-2" href="/">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-neutral-900">AIMaker</span>
              </Link>
              <nav className="hidden md:flex">
                <ul className="flex items-center h-10">
                  <li className="h-full">
                    <Link className="h-full px-4 flex items-center text-sm transition-colors hover:text-neutral-900 hover:bg-neutral-100 rounded-xl text-neutral-900 font-semibold" href="/">
                      Home
                    </Link>
                  </li>
                  <li className="h-full">
                    <div className="relative h-full">
                      <button type="button" className="h-full px-4 flex items-center gap-1.5 outline-none text-sm font-medium hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors duration-200 text-neutral-500">
                        Templates
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-200 text-neutral-500">
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </button>
                    </div>
                  </li>
                  <li className="h-full">
                    <Link className="h-full px-4 flex items-center text-sm font-medium transition-colors hover:text-neutral-900 hover:bg-neutral-100 rounded-xl text-neutral-500" href="/#features">
                      Features
                    </Link>
                  </li>
                  <li className="h-full">
                    <Link className="h-full px-4 flex items-center text-sm font-medium transition-colors hover:text-neutral-900 hover:bg-neutral-100 rounded-xl text-neutral-500" href="/pricing">
                      Pricing
                    </Link>
                  </li>
                  <li className="h-full">
                    <Link className="h-full px-4 flex items-center text-sm font-medium transition-colors hover:text-neutral-900 hover:bg-neutral-100 rounded-xl text-neutral-500" href="/blog">
                      Blog
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <div className="flex items-center gap-2">
                  <Link href="/auth/sign-in">
                    <Button variant="ghost" className="h-9 rounded-lg px-3 hover:bg-neutral-200/50 hover:text-accent-foreground transition-all duration-200">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/auth/sign-up">
                    <Button className="h-9 rounded-lg px-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xs transition-all duration-200">
                      Sign up
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <button type="button" className="h-10 w-10 flex items-center justify-center rounded-xl outline-none hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-200 text-neutral-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="M4.93 4.93l1.41 1.41"></path>
                    <path d="M17.66 17.66l1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="M6.34 17.66l-1.41 1.41"></path>
                    <path d="M19.07 4.93l-1.41 1.41"></path>
                  </svg>
                </button>
              </div>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium hover:bg-neutral-200/50 hover:text-accent-foreground transition-all duration-200 size-9 md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="relative">
          {/* Complex Background Effects */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background"></div>
            <div 
              className="absolute top-[20%] left-1/4 -translate-x-1/2 w-[50%] aspect-square rounded-full opacity-10 dark:opacity-50 blur-[120px]"
              style={{background: 'var(--primary)'}}
            ></div>
            <div 
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `linear-gradient(90deg, 
                  transparent 49.5%,
                  var(--primary) 49.5%,
                  var(--primary) 50.5%,
                  transparent 50.5%
                )`,
                backgroundSize: '100px 100px',
                maskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent)'
              }}
            ></div>
            <div 
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `linear-gradient(0deg, 
                  transparent 49.5%,
                  var(--secondary) 49.5%,
                  var(--secondary) 50.5%,
                  transparent 50.5%
                )`,
                backgroundSize: '100px 100px',
                maskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent)'
              }}
            ></div>
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-background via-background/95 to-transparent"></div>
          </div>

          {/* Hero Section */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center justify-center px-4 py-2 mb-8 text-sm font-medium text-primary bg-primary/10 rounded-full">
                <span className="mr-2">🚀</span>Modern AI Development Template
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 w-4 h-4">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Ship AI Products Fast</span>
                <span className="block mt-2">From Idea to Launch</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300">
                A complete Next.js 15 development framework with authentication, payments, rich components, and AI integration. Focus on innovation while we handle the infrastructure.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="https://aimaker.dev" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive font-bold bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 transition-all duration-200 h-12 rounded-xl px-6">
                  Start Building
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 w-5 h-5">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
                <Link href="/demo" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive font-bold bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white border dark:border-0 border-gray-200 shadow-xs hover:bg-gray-200/80 dark:hover:bg-white/20 transition-all duration-200 h-12 rounded-xl px-6">
                  View Components
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 w-5 h-5">
                    <polygon points="6 3 20 12 6 21 6 3"></polygon>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mt-20">
              <p className="text-center text-base text-gray-600 dark:text-gray-400">Powered by Modern Tech Stack</p>
              <div className="relative mt-8 overflow-hidden">
                <div className="flex animate-scroll">
                  <div className="flex space-x-12 px-12 min-w-max">
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/nextjs.svg" alt="Next.js" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Next.js</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/tailwind.svg" alt="Tailwind CSS" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Tailwind CSS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/shadcn.svg" alt="Shadcn UI" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Shadcn UI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/better-auth.svg" alt="Better Auth" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Better Auth</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/stripe.svg" alt="Stripe" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Stripe</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/resend.png" alt="Resend" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Resend</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/cursor.png" alt="Cursor" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Cursor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/github.svg" alt="GitHub" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">GitHub</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/figma.svg" alt="Figma" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Figma</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/vercel.svg" alt="Vercel" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Vercel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/cloudflare.svg" alt="Cloudflare" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Cloudflare</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/zeabur.svg" alt="Zeabur" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Zeabur</span>
                    </div>
                  </div>
                  <div className="flex space-x-12 min-w-max">
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/nextjs.svg" alt="Next.js" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Next.js</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/tailwind.svg" alt="Tailwind CSS" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Tailwind CSS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/shadcn.svg" alt="Shadcn UI" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Shadcn UI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/better-auth.svg" alt="Better Auth" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Better Auth</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/stripe.svg" alt="Stripe" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Stripe</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/resend.png" alt="Resend" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Resend</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/cursor.png" alt="Cursor" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Cursor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/github.svg" alt="GitHub" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">GitHub</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/figma.svg" alt="Figma" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Figma</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/vercel.svg" alt="Vercel" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Vercel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/cloudflare.svg" alt="Cloudflare" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Cloudflare</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/logos/zeabur.svg" alt="Zeabur" width={24} height={24} className="h-6 w-6" />
                      <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Zeabur</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <div className="relative py-20 bg-white dark:bg-neutral-900" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold tracking-wide text-primary bg-primary/10 dark:text-primary dark:bg-primary/20">
              Why Choose AIMaker
            </h2>
            <p className="mt-6 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Everything You Need for AI Development
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-400">
              Launch your AI product in hours, not weeks. Built with modern tech stack and designed for rapid development.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="h-full">
                <Card className="h-full p-8 bg-white dark:bg-neutral-800 rounded-2xl border-0 shadow-sm">
                  <CardContent className="p-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                      Complete AI Framework
                    </h3>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                      Built-in AI integration with modern components and infrastructure. Everything you need to build and scale your AI application.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Feature 2 */}
              <div className="h-full">
                <Card className="h-full p-8 bg-white dark:bg-neutral-800 rounded-2xl border-0 shadow-sm">
                  <CardContent className="p-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                      </svg>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                      Production Ready
                    </h3>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                      Authentication with GitHub/Google OAuth, Stripe payments, and scalable infrastructure with best practices built-in.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Feature 3 */}
              <div className="h-full">
                <Card className="h-full p-8 bg-white dark:bg-neutral-800 rounded-2xl border-0 shadow-sm">
                  <CardContent className="p-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                      Ship Fast
                    </h3>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                      Next.js 15, React 19, TypeScript, and modern development tools. Deploy your AI product in hours, not weeks.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <section className="py-16 sm:py-20 bg-neutral-100/80 dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
              Modern Tech Stack
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
              Built with the latest technologies to help you create modern web applications quickly and efficiently
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Next.js */}
              <Card className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/50 px-6 py-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 h-full">
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <Image
                        alt="Next.js"
                        fill
                        className="object-contain"
                        src="/images/logos/nextjs.svg"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Next.js</h3>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">React framework for production</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tailwind CSS */}
              <Card className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/50 px-6 py-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 h-full">
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <Image
                        alt="Tailwind CSS"
                        fill
                        className="object-contain"
                        src="/images/logos/tailwind.svg"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Tailwind CSS</h3>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Utility-first CSS framework</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shadcn UI */}
              <Card className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/50 px-6 py-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 h-full">
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <Image
                        alt="Shadcn UI"
                        fill
                        className="object-contain"
                        src="/images/logos/shadcn.svg"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Shadcn UI</h3>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Beautifully designed components</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Better Auth */}
              <Card className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/50 px-6 py-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 h-full">
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <Image
                        alt="Better Auth"
                        fill
                        className="object-contain"
                        src="/images/logos/better-auth.svg"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Better Auth</h3>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Modern authentication solution</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stripe */}
              <Card className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/50 px-6 py-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 h-full">
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <Image
                        alt="Stripe"
                        fill
                        className="object-contain"
                        src="/images/logos/stripe.svg"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Stripe</h3>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Payment processing platform</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resend */}
              <Card className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/50 px-6 py-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 h-full">
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <Image
                        alt="Resend"
                        fill
                        className="object-contain"
                        src="/images/logos/resend.png"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Resend</h3>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Email delivery service</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cursor */}
              <Card className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/50 px-6 py-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 h-full">
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <Image
                        alt="Cursor"
                        fill
                        className="object-contain"
                        src="/images/logos/cursor.png"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Cursor</h3>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">AI-powered code editor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* GitHub */}
              <Card className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/50 px-6 py-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 h-full">
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <Image
                        alt="GitHub"
                        fill
                        className="object-contain"
                        src="/images/logos/github.svg"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">GitHub</h3>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Code hosting platform</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Figma */}
              <Card className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/50 px-6 py-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 h-full">
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <Image
                        alt="Figma"
                        fill
                        className="object-contain"
                        src="/images/logos/figma.svg"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Figma</h3>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Professional design tool</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vercel */}
              <Card className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/50 px-6 py-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 h-full">
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <Image
                        alt="Vercel"
                        fill
                        className="object-contain"
                        src="/images/logos/vercel.svg"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Vercel</h3>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Modern hosting platform</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cloudflare */}
              <Card className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/50 px-6 py-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 h-full">
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <Image
                        alt="Cloudflare"
                        fill
                        className="object-contain"
                        src="/images/logos/cloudflare.svg"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Cloudflare</h3>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">CDN and domain management</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Zeabur */}
              <Card className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/50 px-6 py-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 h-full">
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <Image
                        alt="Zeabur"
                        fill
                        className="object-contain"
                        src="/images/logos/zeabur.svg"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Zeabur</h3>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Cloud deployment platform</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="mt-16">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Modern Frontend</h3>
                  <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                    Built with Next.js 15 and React 19, featuring Tailwind CSS for modern UI design and shadcn/ui for beautiful components
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Authentication & Payments</h3>
                  <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                    Integrated Better Auth for secure authentication and Stripe for flexible payment processing
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Development Tools</h3>
                  <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                    Enhanced with Prisma ORM for database management and Biome for code formatting and checking
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Deployment & SEO</h3>
                  <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                    Optimized for deployment with Vercel and Cloudflare, featuring auto-generated SEO-friendly sitemaps
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 dark:bg-blue-500/20 px-4 py-1.5 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              Template Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive Next.js template with rich components and modern features. Built for developers, designed for rapid development.
            </p>
          </div>

          <div className="relative w-full">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10"></div>
            
            <div className="relative w-full overflow-x-hidden">
              <div className="flex gap-6 py-8 pl-32 pr-32 animate-scroll">
                {/* Feature Card 1: Rich Component Library */}
                <Card className="flex-none w-[300px] group bg-card hover:bg-card/80 dark:bg-card/80 dark:hover:bg-card border border-border/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <Image
                          alt="Rich Component Library"
                          width={24}
                          height={24}
                          className="text-primary"
                          src="/images/feature/feature-2/1.svg"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Rich Component Library</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6">
                      Extensive collection of pre-built components including Hero, Features, FAQ sections
                    </p>
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        alt="Rich Component Library"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        src="/images/feature/feature-2/1.svg"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Feature Card 2: Modern Authentication */}
                <Card className="flex-none w-[300px] group bg-card hover:bg-card/80 dark:bg-card/80 dark:hover:bg-card border border-border/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <Image
                          alt="Modern Authentication"
                          width={24}
                          height={24}
                          className="text-primary"
                          src="/images/feature/feature-2/2.svg"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Modern Authentication</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6">
                      Complete authentication system with GitHub and Google OAuth support
                    </p>
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        alt="Modern Authentication"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        src="/images/feature/feature-2/2.svg"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Feature Card 3: Payment Integration */}
                <Card className="flex-none w-[300px] group bg-card hover:bg-card/80 dark:bg-card/80 dark:hover:bg-card border border-border/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <Image
                          alt="Payment Integration"
                          width={24}
                          height={24}
                          className="text-primary"
                          src="/images/feature/feature-2/3.svg"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Payment Integration</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6">
                      Built-in Stripe payment system for subscriptions and one-time payments
                    </p>
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        alt="Payment Integration"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        src="/images/feature/feature-2/3.svg"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Feature Card 4: Dark Mode Support */}
                <Card className="flex-none w-[300px] group bg-card hover:bg-card/80 dark:bg-card/80 dark:hover:bg-card border border-border/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <Image
                          alt="Dark Mode Support"
                          width={24}
                          height={24}
                          className="text-primary"
                          src="/images/feature/feature-2/4.svg"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Dark Mode Support</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6">
                      Seamless dark mode integration with modern design system
                    </p>
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        alt="Dark Mode Support"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        src="/images/feature/feature-2/4.svg"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Feature Card 5: Responsive Design */}
                <Card className="flex-none w-[300px] group bg-card hover:bg-card/80 dark:bg-card/80 dark:hover:bg-card border border-border/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <Image
                          alt="Responsive Design"
                          width={24}
                          height={24}
                          className="text-primary"
                          src="/images/feature/feature-2/5.svg"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Responsive Design</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6">
                      Fully responsive layouts that work perfectly on all devices
                    </p>
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        alt="Responsive Design"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        src="/images/feature/feature-2/5.svg"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Feature Card 6: SEO Optimized */}
                <Card className="flex-none w-[300px] group bg-card hover:bg-card/80 dark:bg-card/80 dark:hover:bg-card border border-border/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <Image
                          alt="SEO Optimized"
                          width={24}
                          height={24}
                          className="text-primary"
                          src="/images/feature/feature-2/6.svg"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">SEO Optimized</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6">
                      Auto-generated sitemap and SEO-friendly structure
                    </p>
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        alt="SEO Optimized"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        src="/images/feature/feature-2/6.svg"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Feature Card 7: Modular Architecture */}
                <Card className="flex-none w-[300px] group bg-card hover:bg-card/80 dark:bg-card/80 dark:hover:bg-card border border-border/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <Image
                          alt="Modular Architecture"
                          width={24}
                          height={24}
                          className="text-primary"
                          src="/images/feature/feature-2/7.svg"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Modular Architecture</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6">
                      Clean and modular code structure for easy customization
                    </p>
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        alt="Modular Architecture"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        src="/images/feature/feature-2/7.svg"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Feature Card 8: Developer Tools */}
                <Card className="flex-none w-[300px] group bg-card hover:bg-card/80 dark:bg-card/80 dark:hover:bg-card border border-border/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <Image
                          alt="Developer Tools"
                          width={24}
                          height={24}
                          className="text-primary"
                          src="/images/feature/feature-2/8.svg"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Developer Tools</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6">
                      Integrated with Biome for code formatting and checking
                    </p>
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        alt="Developer Tools"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        src="/images/feature/feature-2/8.svg"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Feature Card 9: Premium Templates */}
                <Card className="flex-none w-[300px] group bg-card hover:bg-card/80 dark:bg-card/80 dark:hover:bg-card border border-border/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <Image
                          alt="Premium Templates"
                          width={24}
                          height={24}
                          className="text-primary"
                          src="/images/feature/feature-2/9.svg"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Premium Templates</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6">
                      Multiple theme styles and customizable design system
                    </p>
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        alt="Premium Templates"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        src="/images/feature/feature-2/9.svg"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Duplicate first three cards for seamless loop effect */}
                <Card className="flex-none w-[300px] group bg-card hover:bg-card/80 dark:bg-card/80 dark:hover:bg-card border border-border/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <Image
                          alt="Rich Component Library"
                          width={24}
                          height={24}
                          className="text-primary"
                          src="/images/feature/feature-2/1.svg"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Rich Component Library</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6">
                      Extensive collection of pre-built components including Hero, Features, FAQ sections
                    </p>
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        alt="Rich Component Library"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        src="/images/feature/feature-2/1.svg"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex-none w-[300px] group bg-card hover:bg-card/80 dark:bg-card/80 dark:hover:bg-card border border-border/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <Image
                          alt="Modern Authentication"
                          width={24}
                          height={24}
                          className="text-primary"
                          src="/images/feature/feature-2/2.svg"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Modern Authentication</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6">
                      Complete authentication system with GitHub and Google OAuth support
                    </p>
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        alt="Modern Authentication"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        src="/images/feature/feature-2/2.svg"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex-none w-[300px] group bg-card hover:bg-card/80 dark:bg-card/80 dark:hover:bg-card border border-border/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <Image
                          alt="Payment Integration"
                          width={24}
                          height={24}
                          className="text-primary"
                          src="/images/feature/feature-2/3.svg"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Payment Integration</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6">
                      Built-in Stripe payment system for subscriptions and one-time payments
                    </p>
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        alt="Payment Integration"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        src="/images/feature/feature-2/3.svg"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Why Choose AIMaker Template?</h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300">
              Save weeks of development time and focus on what matters most
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Traditional Development */}
            <Card className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 bg-white dark:bg-neutral-800">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">
                  Traditional Development
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                    <span>2-3 weeks to set up Authentication System</span>
                  </li>
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                    <span>2-3 weeks to set up Payment Integration</span>
                  </li>
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                    <span>2-3 weeks to set up AI Infrastructure</span>
                  </li>
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                    <span>2-3 weeks to set up Component Library</span>
                  </li>
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                    <span>2-3 weeks to set up Dark Mode Support</span>
                  </li>
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                    <span>2-3 weeks to set up SEO Optimization</span>
                  </li>
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                    <span>2-3 weeks to set up TypeScript Setup</span>
                  </li>
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                    <span>2-3 weeks to set up Development Tools</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                  <p className="text-2xl font-bold text-red-500">3-4 Months</p>
                  <p className="text-neutral-600 dark:text-neutral-300">Total Development Time</p>
                </div>
              </CardContent>
            </Card>

            {/* AIMaker Template */}
            <Card className="rounded-xl border-2 border-primary p-6 relative bg-white dark:bg-neutral-800">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm">
                Recommended
              </div>
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4 text-primary">AIMaker Template</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Ready to use Authentication System</span>
                  </li>
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Ready to use Payment Integration</span>
                  </li>
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Ready to use AI Infrastructure</span>
                  </li>
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Ready to use Component Library</span>
                  </li>
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Ready to use Dark Mode Support</span>
                  </li>
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Ready to use SEO Optimization</span>
                  </li>
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Ready to use TypeScript Setup</span>
                  </li>
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Ready to use Development Tools</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                  <p className="text-2xl font-bold text-green-500">5 Minutes</p>
                  <p className="text-neutral-600 dark:text-neutral-300">Setup Time</p>
                </div>
              </CardContent>
            </Card>

            {/* Your Savings */}
            <Card className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 bg-white dark:bg-neutral-800">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4 text-primary">Your Savings</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Development Time</h4>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      Save 3-4 months of development time
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Development Cost</h4>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      Save $20,000+ in development costs
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Maintenance</h4>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      Reduce ongoing maintenance costs
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Time to Market</h4>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      Launch your product faster
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="relative overflow-hidden py-20 dark:bg-neutral-900 bg-neutral-50 dark:text-neutral-100">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance bg-gradient-to-br from-neutral-900 to-neutral-600 bg-clip-text text-3xl font-bold text-transparent dark:from-neutral-100 dark:to-neutral-400 md:text-4xl lg:text-5xl">
              Latest Blog Posts
            </h2>
            <p className="mt-4 text-balance text-lg text-neutral-600 dark:text-neutral-400">
              Explore cutting-edge AI development techniques and best practices
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Blog Post 1 */}
            <Card className="group relative flex h-full flex-col overflow-hidden bg-white/50 transition duration-300 hover:scale-[1.02] dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-100/50 to-neutral-200/50 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-neutral-800/50 dark:to-neutral-700/50"></div>
              </div>
              
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  alt="Building Your First AI Chatbot"
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop"
                  sizes="100vw"
                />
              </div>

              <CardContent className="flex flex-col gap-1.5 px-6 space-y-2 pt-6">
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <time dateTime="2024-04-03T00:00:00.000Z">April 3, 2024</time>
                </div>
                <Link 
                  className="block text-xl font-semibold leading-tight tracking-tight text-neutral-900 transition-colors hover:text-primary dark:text-neutral-100" 
                  href="/blog/building-ai-chatbot"
                >
                  Building Your First AI Chatbot
                </Link>
              </CardContent>

              <CardContent className="px-6 flex-1">
                <p className="line-clamp-3 text-base leading-relaxed tracking-wide text-neutral-600 dark:text-neutral-300">
                  A comprehensive guide to building an intelligent chatbot using Next.js and OpenAI API
                </p>
              </CardContent>

              <CardContent className="flex items-center px-6 pb-6">
                <Link href="/blog/building-ai-chatbot">
                  <Button variant="ghost" className="inline-flex items-center justify-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/90 transition-all duration-200 h-9 rounded-lg px-3 text-primary hover:text-primary/90">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Blog Post 2 */}
            <Card className="group relative flex h-full flex-col overflow-hidden bg-white/50 transition duration-300 hover:scale-[1.02] dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-100/50 to-neutral-200/50 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-neutral-800/50 dark:to-neutral-700/50"></div>
              </div>
              
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  alt="Getting Started with AI Development"
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1932&auto=format&fit=crop"
                  sizes="100vw"
                />
              </div>

              <CardContent className="flex flex-col gap-1.5 px-6 space-y-2 pt-6">
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <time dateTime="2024-04-02T00:00:00.000Z">April 2, 2024</time>
                </div>
                <Link 
                  className="block text-xl font-semibold leading-tight tracking-tight text-neutral-900 transition-colors hover:text-primary dark:text-neutral-100" 
                  href="/blog/getting-started-with-ai-development"
                >
                  Getting Started with AI Development
                </Link>
              </CardContent>

              <CardContent className="px-6 flex-1">
                <p className="line-clamp-3 text-base leading-relaxed tracking-wide text-neutral-600 dark:text-neutral-300">
                  Learn the basics of AI development and start building your first AI application
                </p>
              </CardContent>

              <CardContent className="flex items-center px-6 pb-6">
                <Link href="/blog/getting-started-with-ai-development">
                  <Button variant="ghost" className="inline-flex items-center justify-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/90 transition-all duration-200 h-9 rounded-lg px-3 text-primary hover:text-primary/90">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Blog Post 3 */}
            <Card className="group relative flex h-full flex-col overflow-hidden bg-white/50 transition duration-300 hover:scale-[1.02] dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-100/50 to-neutral-200/50 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-neutral-800/50 dark:to-neutral-700/50"></div>
              </div>
              
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  alt="Welcome to AImaker"
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop"
                  sizes="100vw"
                />
              </div>

              <CardContent className="flex flex-col gap-1.5 px-6 space-y-2 pt-6">
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <time dateTime="2024-04-01T00:00:00.000Z">April 1, 2024</time>
                </div>
                <Link 
                  className="block text-xl font-semibold leading-tight tracking-tight text-neutral-900 transition-colors hover:text-primary dark:text-neutral-100" 
                  href="/blog/welcome-to-aimaker"
                >
                  Welcome to AImaker
                </Link>
              </CardContent>

              <CardContent className="px-6 flex-1">
                <p className="line-clamp-3 text-base leading-relaxed tracking-wide text-neutral-600 dark:text-neutral-300">
                  Start your AI journey and explore unlimited possibilities in AI development
                </p>
              </CardContent>

              <CardContent className="flex items-center px-6 pb-6">
                <Link href="/blog/welcome-to-aimaker">
                  <Button variant="ghost" className="inline-flex items-center justify-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/90 transition-all duration-200 h-9 rounded-lg px-3 text-primary hover:text-primary/90">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Link href="/blog">
              <Button variant="outline" className="inline-flex items-center justify-center gap-2 border border-neutral-900 dark:border-white bg-background shadow-xs hover:bg-neutral-200/50 dark:hover:bg-neutral-800/90 hover:text-accent-foreground transition-all duration-200 h-12 rounded-xl px-6">
                View All Posts
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-neutral-50 py-16 dark:bg-neutral-900 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Loved by Developers
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              See what developers are saying about our template and how it helps them build modern websites faster
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
                        <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
                slidesToScroll: 3,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {/* Testimonial 1 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-700">
                          <Image
                            alt="Kevin Zhang"
                            fill
                            className="object-cover"
                            src="/images/avatar/avatar-1.webp"
                            sizes="100vw"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-white">Kevin Zhang</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Frontend Developer, TechForward</p>
                        </div>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 flex-1">
                        &ldquo;This template saved me weeks of development time. The components are well-designed and the code structure is clean and maintainable. Highly recommended!&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 2 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-700">
                          <Image
                            alt="Emily Lin"
                            fill
                            className="object-cover"
                            src="/images/avatar/avatar-2.webp"
                            sizes="100vw"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-white">Emily Lin</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">UI Designer, DesignLabs</p>
                        </div>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 flex-1">
                        &ldquo;The design system is fantastic. Dark mode support, responsive layouts, and beautiful components - everything works perfectly together. It&rsquo;s a great foundation for any modern web project.&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 3 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-700">
                          <Image
                            alt="Alex Wu"
                            fill
                            className="object-cover"
                            src="/images/avatar/avatar-3.webp"
                            sizes="100vw"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-white">Alex Wu</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Startup Founder, CodeVerse</p>
                        </div>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 flex-1">
                        &ldquo;Perfect for startups! The authentication system and Stripe integration saved us a lot of time. The modular design made it easy to customize according to our needs.&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 4 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">SL</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-white">Sarah Lee</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Product Manager, InnovateCorp</p>
                        </div>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 flex-1">
                        &ldquo;Outstanding documentation and developer experience. Our team was able to ship our MVP in record time. The AI integration patterns are particularly well thought out.&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 5 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">MC</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-white">Michael Chen</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">CTO, DevFlow</p>
                        </div>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 flex-1">
                        &ldquo;The authentication system is rock solid. We&rsquo;ve been using this template for 6 months in production with zero security issues. The code quality is exceptional.&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 6 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">LW</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-white">Lisa Wang</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Lead Developer, TechStart</p>
                        </div>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 flex-1">
                        &ldquo;Incredible developer experience! The TypeScript setup is perfect, ESLint configuration is spot-on, and the folder structure makes sense. This is how modern React should be done.&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 7 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">DM</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-white">David Martinez</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Senior Engineer, CloudTech</p>
                        </div>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 flex-1">
                        &ldquo;The Stripe integration works flawlessly. Payment processing, subscriptions, webhooks - everything is handled professionally. Saved us months of development time.&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 8 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">JT</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-white">Jessica Taylor</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Founder, NextGen Apps</p>
                        </div>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 flex-1">
                        &ldquo;The UI components are beautiful and consistent. Dark mode implementation is perfect, and the responsive design works seamlessly across all devices. Highly professional work.&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 9 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">RG</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-white">Ryan Garcia</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Tech Lead, InnovateLab</p>
                        </div>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 flex-1">
                        &ldquo;Email integration with Resend is seamless. Transactional emails, notifications, marketing campaigns - all work perfectly out of the box. Great attention to detail.&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 10 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">AK</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-white">Anna Kim</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">VP Engineering, ScaleUp</p>
                        </div>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 flex-1">
                        &ldquo;The deployment setup is incredible. Vercel, Cloudflare, Zeabur - multiple options with detailed guides. Our DevOps team was impressed with the CI/CD configurations.&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 11 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">TL</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-white">Tom Liu</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Senior Developer, WebCraft</p>
                        </div>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 flex-1">
                        &ldquo;The AI integration examples are cutting-edge. Chat interfaces, content generation, smart recommendations - everything is implemented with best practices. Future-ready codebase.&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 12 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">MR</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-white">Maria Rodriguez</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Design Director, CreativeStudio</p>
                        </div>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 flex-1">
                        &ldquo;From a design perspective, this template is outstanding. The component library is comprehensive, animations are smooth, and the overall aesthetic is modern and professional.&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="-left-12 hidden md:flex" />
              <CarouselNext className="-right-12 hidden md:flex" />
            </Carousel>
            
            {/* Dots indicator */}
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: count }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`h-2 rounded-full transition-all ${
                    index + 1 === current
                      ? "w-6 bg-primary"
                      : "w-2 bg-neutral-300 dark:bg-neutral-700"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="flex-1">
              <div className="sticky top-24">
                <div className="inline-block bg-[#7CE1FF] dark:bg-blue-500/20 bg-opacity-20 px-4 py-1.5 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
                  FAQ
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                  Frequently<br/>asked<br/>questions
                </h2>
                <p className="mt-6 text-muted-foreground text-lg">
                  For any unanswered questions, reach out to our support team via email. We&rsquo;ll respond as soon as possible to assist you.
                </p>
              </div>
            </div>

            <div className="flex-1">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b border-border/40 dark:border-border/20">
                  <AccordionTrigger className="text-left py-6 text-lg font-medium text-foreground hover:no-underline">
                    What is AIMaker Template?
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground">
                    AIMaker Template is a comprehensive Next.js 15 development framework designed for building AI-powered applications quickly. It includes pre-built authentication, payment processing, modern UI components, and AI integration capabilities, allowing you to focus on your core product features rather than infrastructure setup.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-b border-border/40 dark:border-border/20">
                  <AccordionTrigger className="text-left py-6 text-lg font-medium text-foreground hover:no-underline">
                    What components are included?
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground">
                    The template includes 30+ modern UI components built with shadcn/ui, authentication components with GitHub/Google OAuth support, payment integration with Stripe, AI chat interfaces, dashboard layouts, forms, modals, navigation components, and responsive design patterns. All components are fully customizable and production-ready.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-b border-border/40 dark:border-border/20">
                  <AccordionTrigger className="text-left py-6 text-lg font-medium text-foreground hover:no-underline">
                    What technologies does it use?
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground">
                    Built with Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui components, Better Auth for authentication, Stripe for payments, Resend for emails, and optimized for deployment on Vercel, Zeabur, or Cloudflare. It also includes development tools like Cursor AI integration and GitHub workflows.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-b border-border/40 dark:border-border/20">
                  <AccordionTrigger className="text-left py-6 text-lg font-medium text-foreground hover:no-underline">
                    How customizable is the template?
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground">
                    Extremely customizable! The template uses CSS variables for theming, modular component architecture, and follows modern React patterns. You can easily customize colors, fonts, layouts, add your own components, modify authentication providers, and extend the AI integration. The code is well-documented and follows best practices for maintainability.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-b-0">
                  <AccordionTrigger className="text-left py-6 text-lg font-medium text-foreground hover:no-underline">
                    How do I get started?
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground">
                    Getting started is simple: 1) Purchase and download the template, 2) Clone the repository and install dependencies with npm/yarn, 3) Set up your environment variables for authentication and payments, 4) Customize the design and components to match your brand, and 5) Deploy to your preferred hosting platform. Detailed documentation and video tutorials are included.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="overflow-hidden bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold tracking-wide text-primary bg-primary/10 dark:bg-primary/5 mb-6">
              Pricing Plans
            </h2>
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Choose Your Learning Plan
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Start your AI development journey with the perfect plan for you
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
            {/* Basic Plan */}
            <div className="relative rounded-3xl border bg-white p-8 shadow-sm transition-all hover:shadow-md dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
              <div className="mb-8">
                <h3 className="mb-2 text-2xl font-bold">Basic</h3>
                <p className="mb-6 text-neutral-600 dark:text-neutral-300">
                  Experience Cursor tutorials and AI programming basics
                </p>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Free
                  </span>
                </div>
              </div>

              <div className="mb-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">Basic Cursor tutorials</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">AI programming environment setup</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">Basic development tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">Public community access</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="h-5 w-5 text-neutral-400" />
                  <span className="text-neutral-400 dark:text-neutral-500">Complete Cursor tutorials</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="h-5 w-5 text-neutral-400" />
                  <span className="text-neutral-400 dark:text-neutral-500">AI programming Q&A service</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="h-5 w-5 text-neutral-400" />
                  <span className="text-neutral-400 dark:text-neutral-500">VIP community group</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="h-5 w-5 text-neutral-400" />
                  <span className="text-neutral-400 dark:text-neutral-500">AI application templates</span>
                </div>
              </div>

              <Link href="https://aimaker.dev/#pricing">
                <Button variant="outline" className="w-full h-12 rounded-xl">
                  Start Learning
                </Button>
              </Link>
            </div>

            {/* Complete Course Plan - Most Popular */}
            <div className="relative rounded-3xl border bg-white p-8 shadow-sm transition-all hover:shadow-md dark:bg-neutral-900 border-primary">
              <div className="absolute -top-5 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">
                Most Popular
              </div>
              
              <div className="mb-8">
                <h3 className="mb-2 text-2xl font-bold">Complete Course</h3>
                <p className="mb-6 text-neutral-600 dark:text-neutral-300">
                  Master Cursor and AI programming systematically
                </p>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    $99
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-300">/month</span>
                </div>
              </div>

              <div className="mb-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">Complete Cursor tutorials</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">AI programming projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">One-on-one support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">VIP community access</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">Lifetime course updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="h-5 w-5 text-neutral-400" />
                  <span className="text-neutral-400 dark:text-neutral-500">Priority technical support</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="h-5 w-5 text-neutral-400" />
                  <span className="text-neutral-400 dark:text-neutral-500">AI application templates</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="h-5 w-5 text-neutral-400" />
                  <span className="text-neutral-400 dark:text-neutral-500">Login system source code</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="h-5 w-5 text-neutral-400" />
                  <span className="text-neutral-400 dark:text-neutral-500">Payment system integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="h-5 w-5 text-neutral-400" />
                  <span className="text-neutral-400 dark:text-neutral-500">Commercial license</span>
                </div>
              </div>

              <Link href="https://aimaker.dev/#pricing">
                <Button className="w-full h-12 rounded-xl font-bold">
                  Limited Time Offer
                </Button>
              </Link>
            </div>

            {/* Advanced Plan */}
            <div className="relative rounded-3xl border bg-white p-8 shadow-sm transition-all hover:shadow-md dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
              <div className="mb-8">
                <h3 className="mb-2 text-2xl font-bold">Advanced</h3>
                <p className="mb-6 text-neutral-600 dark:text-neutral-300">
                  Master professional AI programming skills
                </p>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    $199
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-300">/month</span>
                </div>
              </div>

              <div className="mb-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">Complete Cursor tutorials</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">AI programming projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">One-on-one support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">VIP community access</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">Lifetime course updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">Priority technical support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">AI application templates</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">Login system source code</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">Payment system integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-neutral-600 dark:text-neutral-300">Commercial license</span>
                </div>
              </div>

              <Link href="https://aimaker.dev/#pricing">
                <Button variant="outline" className="w-full h-12 rounded-xl">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-white py-24 dark:bg-neutral-900 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                Trusted by Developers Worldwide
              </h2>
              <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
                Join thousands of developers building the future of AI applications
              </p>
            </div>

            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              {/* Active Users */}
              <div className="flex flex-col bg-neutral-50/80 p-8 dark:bg-neutral-800/80">
                <dt className="text-sm font-semibold leading-6 text-neutral-600 dark:text-neutral-300">
                  Active Users
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                  250+
                </dd>
                <div className="mx-auto mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </div>

              {/* Components */}
              <div className="flex flex-col bg-neutral-50/80 p-8 dark:bg-neutral-800/80">
                <dt className="text-sm font-semibold leading-6 text-neutral-600 dark:text-neutral-300">
                  Components
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                  30+
                </dd>
                <div className="mx-auto mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
              </div>

              {/* Launch Time */}
              <div className="flex flex-col bg-neutral-50/80 p-8 dark:bg-neutral-800/80">
                <dt className="text-sm font-semibold leading-6 text-neutral-600 dark:text-neutral-300">
                  Launch Time
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                  5 min
                </dd>
                <div className="mx-auto mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                  </svg>
                </div>
              </div>

              {/* Active Communities */}
              <div className="flex flex-col bg-neutral-50/80 p-8 dark:bg-neutral-800/80">
                <dt className="text-sm font-semibold leading-6 text-neutral-600 dark:text-neutral-300">
                  Active Communities
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                  50+
                </dd>
                <div className="mx-auto mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="overflow-hidden bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex flex-col items-center gap-12 text-center">
            <div className="max-w-3xl">
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Ready to Build Your <br/>
                <span className="text-primary">Modern Website</span> Today?
              </h2>
              <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-300">
                Start with our comprehensive Next.js template featuring rich components and modern features. Save weeks of development time and focus on what matters most - your product.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/auth/sign-up">
                  <Button className="h-12 rounded-xl px-6 w-full sm:w-auto font-bold">
                    Get Started Now
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" className="h-12 rounded-xl px-6 w-full sm:w-auto">
                    View Plans
                  </Button>
                </Link>
              </div>
            </div>

            <div className="w-full max-w-[720px]">
              <div className="relative aspect-[2/1] w-full">
                <Image
                  alt="AI Development"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  src="/images/cta/cta.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t bg-gradient-to-b from-neutral-50/50 to-neutral-100/80 border-neutral-200/50 dark:from-neutral-800/50 dark:to-neutral-900 dark:border-neutral-700/30">
        <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Company Info */}
            <div className="space-y-4">
              <Link className="flex items-center gap-2" href="/">
                <Image src="/logo.svg" alt="AIMaker Logo" width={32} height={32} className="h-8 w-8" />
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-100 dark:to-neutral-300 bg-clip-text text-transparent">
                  AIMaker
                </span>
              </Link>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Empowering everyone with AI tools. Build faster, smarter, and more efficiently.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-primary dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  <span className="sr-only">GitHub</span>
                </Button>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-neutral-900 dark:text-white">
                Company
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200" href="/about">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200" href="/blog">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-neutral-900 dark:text-white">
                Support
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200" href="/privacy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200" href="/terms">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Empty column for spacing */}
            <div></div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                © 2025 AIMaker. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <Link className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200" href="/privacy">
                  Privacy
                </Link>
                <Link className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200" href="/terms">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
