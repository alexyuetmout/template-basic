"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

// 星级评分组件
function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center mt-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  )
}

// 评价数据类型
interface Testimonial {
  id: number
  name: string
  title: string
  avatar: string
  content: string
  rating: number
}

// 单个评价卡片组件
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full group relative rounded-2xl border border-border/50 bg-card hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed flex-grow">
          &ldquo;{testimonial.content}&rdquo;
        </p>
        <StarRating rating={testimonial.rating} />
      </CardContent>
    </Card>
  )
}

// 评价数据
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Full Stack Developer",
    avatar: "/images/avatar/avatar-1.webp",
    content: "This template saved me weeks of development time. The AI integration is seamless and the code quality is exceptional. Highly recommended for any AI project.",
    rating: 5
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    title: "AI Engineer",
    avatar: "/images/avatar/avatar-2.webp",
    content: "The authentication system and payment integration work flawlessly. Perfect starting point for any SaaS application with AI capabilities.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Watson",
    title: "Product Manager",
    avatar: "/images/avatar/avatar-3.webp",
    content: "From a design perspective, this template is outstanding. The component library is comprehensive, animations are smooth, and the overall aesthetic is modern and professional.",
    rating: 5
  },
  {
    id: 4,
    name: "David Kim",
    title: "Startup Founder",
    avatar: "/images/avatar/avatar-1.webp",
    content: "Built our MVP in record time using this template. The documentation is clear, the code is well-structured, and support is excellent.",
    rating: 5
  },
  {
    id: 5,
    name: "Lisa Zhang",
    title: "DevOps Engineer",
    avatar: "/images/avatar/avatar-2.webp",
    content: "Deployment was a breeze. The CI/CD setup is perfect and the performance optimizations are already built-in. Saves so much time!",
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            What Developers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who are building amazing AI applications with our template
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </section>
  )
} 