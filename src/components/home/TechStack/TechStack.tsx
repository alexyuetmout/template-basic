import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export function TechStack() {
  return (
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                      src="/images/logos/resend.svg"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Resend</h3>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Email delivery service</p>
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

            {/* Cursor */}
            <Card className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/50 px-6 py-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 h-full">
                  <div className="relative h-10 w-10 flex-shrink-0">
                    <Image
                      alt="Cursor"
                      fill
                      className="object-contain"
                      src="/images/logos/cursor.svg"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Cursor</h3>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">AI-powered code editor</p>
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

          {/* Additional Tech Features */}
          <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-4">
            {/* Modern Frontend */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Modern Frontend
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Built with Next.js 15 and React 19, featuring Tailwind CSS for modern UI design and shadcn/ui for beautiful components
              </p>
            </div>

            {/* Authentication & Payments */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Authentication & Payments
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Integrated Better Auth for secure authentication and Stripe for flexible payment processing
              </p>
            </div>

            {/* Development Tools */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Development Tools
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Enhanced with Prisma ORM for database management and Biome for code formatting and checking
              </p>
            </div>

            {/* Deployment & SEO */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Deployment & SEO
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Optimized for deployment with Vercel and Cloudflare, featuring auto-generated SEO-friendly sitemaps
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 