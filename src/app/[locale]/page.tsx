import { Hero } from "@/components/home/Hero/Hero"
import { Features1 } from "@/components/home/Features/Feature-1"
import { Features2 } from "@/components/home/Features/Feature-2"
import { Header } from "@/components/home/Header/Header"
import { CTA } from "@/components/home/CTA/CTA"
import { Footer } from "@/components/home/Footer/Footer"
import { TechStack } from "@/components/home/TechStack/TechStack"
import { FAQ } from "@/components/home/FAQ/FAQ"
import { Pricing } from "@/components/home/Pricing/Pricing"
import { Testimonials } from "@/components/home/Testimonials/Testimonials"
import { TopBanner } from "@/components/home/TopBanner/TopBanner"
import { ComparisonChart } from "@/components/home/ComparisonChart/ComparisonChart"
import { Blog } from "@/components/home/Blog/Blog"
import { Stats } from "@/components/home/Stats/Stats"
import { VideoTutorial } from "@/components/home/VideoTutorial/VideoTutorial"
import { AutoOneTap } from "@/components/auth/AutoOneTap"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <AutoOneTap callbackURL="/dashboard" delay={5000} />
      <TopBanner />
      <Header />
      <main className="flex-1">
        <div className="relative">
          <Hero />
          <Features1 />
          <Features2 />
          <TechStack />
          <ComparisonChart />
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
