import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function CTA() {
  return (
    <section className="overflow-hidden bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col items-center gap-12 text-center">
          <div className="max-w-3xl">
            <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Ready to Build Your <br/>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Modern Website</span> Today?
            </h2>
            <p className="mb-8 text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Start with our comprehensive Next.js template featuring rich components and modern features. Save weeks of development time and focus on what matters most - your product.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/auth/sign-up">
                <Button className="h-14 rounded-xl px-8 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started Now
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" className="h-14 rounded-xl px-8 text-lg font-medium border-2 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all duration-300">
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
  )
} 