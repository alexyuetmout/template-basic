import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { HeadingH2 } from "@/components/ui/headings";

export function TechStack() {
  return (
    <section className="py-16 sm:py-20 bg-muted/80 dark:bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <HeadingH2 className="text-foreground dark:text-foreground">
            Modern Tech Stack
          </HeadingH2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground dark:text-muted-foreground">
            Built with the latest technologies to help you create modern web
            applications quickly and efficiently
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Next.js */}
            <Card className="group relative rounded-2xl border border-border dark:border-border/50 bg-background dark:bg-card/50 px-6 py-3 hover:border-border dark:hover:border-border transition-colors">
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
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                      Next.js
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                      React framework for production
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tailwind CSS */}
            <Card className="group relative rounded-2xl border border-border dark:border-border/50 bg-background dark:bg-card/50 px-6 py-3 hover:border-border dark:hover:border-border transition-colors">
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
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                      Tailwind CSS
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                      Utility-first CSS framework
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shadcn UI */}
            <Card className="group relative rounded-2xl border border-border dark:border-border/50 bg-background dark:bg-card/50 px-6 py-3 hover:border-border dark:hover:border-border transition-colors">
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
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                      Shadcn UI
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                      Beautifully designed components
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Better Auth */}
            <Card className="group relative rounded-2xl border border-border dark:border-border/50 bg-background dark:bg-card/50 px-6 py-3 hover:border-border dark:hover:border-border transition-colors">
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
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                      Better Auth
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                      Modern authentication solution
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stripe */}
            <Card className="group relative rounded-2xl border border-border dark:border-border/50 bg-background dark:bg-card/50 px-6 py-3 hover:border-border dark:hover:border-border transition-colors">
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
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                      Stripe
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                      Payment processing platform
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resend */}
            <Card className="group relative rounded-2xl border border-border dark:border-border/50 bg-background dark:bg-card/50 px-6 py-3 hover:border-border dark:hover:border-border transition-colors">
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
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                      Resend
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                      Email delivery service
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* GitHub */}
            <Card className="group relative rounded-2xl border border-border dark:border-border/50 bg-background dark:bg-card/50 px-6 py-3 hover:border-border dark:hover:border-border transition-colors">
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
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                      GitHub
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                      Code hosting platform
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vercel */}
            <Card className="group relative rounded-2xl border border-border dark:border-border/50 bg-background dark:bg-card/50 px-6 py-3 hover:border-border dark:hover:border-border transition-colors">
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
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                      Vercel
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                      Modern hosting platform
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cursor */}
            <Card className="group relative rounded-2xl border border-border dark:border-border/50 bg-background dark:bg-card/50 px-6 py-3 hover:border-border dark:hover:border-border transition-colors">
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
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                      Cursor
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                      AI-powered code editor
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Figma */}
            <Card className="group relative rounded-2xl border border-border dark:border-border/50 bg-background dark:bg-card/50 px-6 py-3 hover:border-border dark:hover:border-border transition-colors">
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
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                      Figma
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                      Professional design tool
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cloudflare */}
            <Card className="group relative rounded-2xl border border-border dark:border-border/50 bg-background dark:bg-card/50 px-6 py-3 hover:border-border dark:hover:border-border transition-colors">
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
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                      Cloudflare
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                      CDN and domain management
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Zeabur */}
            <Card className="group relative rounded-2xl border border-border dark:border-border/50 bg-background dark:bg-card/50 px-6 py-3 hover:border-border dark:hover:border-border transition-colors">
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
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                      Zeabur
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                      Cloud deployment platform
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Tech Features */}
          <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-4">
            {/* Modern Frontend */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                Modern Frontend
              </h3>
              <p className=" text-muted-foreground dark:text-muted-foreground">
                Built with Next.js 15 and React 19, featuring Tailwind CSS for
                modern UI design and shadcn/ui for beautiful components
              </p>
            </div>

            {/* Authentication & Payments */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                Authentication & Payments
              </h3>
              <p className=" text-muted-foreground dark:text-muted-foreground">
                Integrated Better Auth for secure authentication and Stripe for
                flexible payment processing
              </p>
            </div>

            {/* Development Tools */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                Development Tools
              </h3>
              <p className=" text-muted-foreground dark:text-muted-foreground">
                Enhanced with Prisma ORM for database management and Biome for
                code formatting and checking
              </p>
            </div>

            {/* Deployment & SEO */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                Deployment & SEO
              </h3>
              <p className=" text-muted-foreground dark:text-muted-foreground">
                Optimized for deployment with Vercel and Cloudflare, featuring
                auto-generated SEO-friendly sitemaps
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
