import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
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
                <Image src="/images/logos/resend.svg" alt="Resend" width={24} height={24} className="h-6 w-6" />
                <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Resend</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/images/logos/cursor.svg" alt="Cursor" width={24} height={24} className="h-6 w-6" />
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
                <Image src="/images/logos/resend.svg" alt="Resend" width={24} height={24} className="h-6 w-6" />
                <span className="text-md text-gray-600 dark:text-gray-400 font-medium">Resend</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/images/logos/cursor.svg" alt="Cursor" width={24} height={24} className="h-6 w-6" />
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
  )
} 