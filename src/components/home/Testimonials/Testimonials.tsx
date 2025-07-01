"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { HeadingH2 } from "@/components/ui/headings";

// 星级评分组件
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating
              ? "fill-chart-3 text-chart-3"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

// 评价数据类型
interface Testimonial {
  id: number;
  name: string;
  title: string;
  content: string;
  avatar?: string;
  rating?: number;
}

// 单个评价卡片组件
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full group relative rounded-2xl border border-border/50 bg-card hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
            {testimonial.avatar ? (
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-lg font-semibold text-primary">
                {testimonial.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-foreground">
              {testimonial.name}
            </h4>
            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed flex-grow">
          &ldquo;{testimonial.content}&rdquo;
        </p>
        <StarRating rating={testimonial.rating || 5} />
      </CardContent>
    </Card>
  );
}

export function Testimonials() {
  const { t } = useTranslation("home");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 头像路径映射
  const avatarMap: Record<number, string> = {
    1: "/images/avatar/avatar-1.webp",
    2: "/images/avatar/avatar-2.webp",
    3: "/images/avatar/avatar-3.webp",
    4: "/images/avatar/avatar-1.webp",
    5: "/images/avatar/avatar-2.webp",
  };

  // 从翻译中获取评价文本数据
  const testimonialsData = t("testimonials", {
    returnObjects: true,
  }) as { items: Testimonial[] };
  
  const testimonials: Testimonial[] = testimonialsData?.items || [];

  const nextTestimonial = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, testimonials.length]);

  // 自动轮播
  useEffect(() => {
    if (!testimonials || testimonials.length === 0) {
      return;
    }

    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, testimonials.length, nextTestimonial]);

  // 防止空数据导致的错误
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToTestimonial = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/10 dark:bg-primary/20 bg-opacity-20 px-4 py-1.5 rounded-full text-primary dark:text-primary text-sm font-medium mb-4">
            {t("testimonials.badge")}
          </div>
          <HeadingH2 className="text-foreground mb-6">
            {t("testimonials.title")}
          </HeadingH2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* 主要评价卡片 */}
          <div className="relative overflow-hidden">
            <div
              className={`transition-all duration-300 ${
                isAnimating
                  ? "opacity-0 transform scale-95"
                  : "opacity-100 transform scale-100"
              }`}
            >
              <Card className="bg-background dark:bg-card border-0 shadow-2xl">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* 头像 */}
                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                      {testimonials[currentIndex]?.id && (
                        <Image
                          src={avatarMap[testimonials[currentIndex].id] || avatarMap[1]}
                          alt={
                            testimonials[currentIndex]?.name || "User avatar"
                          }
                          fill
                          className="object-cover rounded-full ring-4 ring-primary/20"
                        />
                      )}
                    </div>

                    {/* 评价内容 */}
                    <div className="flex-1 text-center md:text-left">
                      <StarRating rating={5} />

                      <blockquote className="text-lg md:text-xl text-neutral-700 dark:text-muted mb-6 leading-relaxed">
                        &ldquo;{testimonials[currentIndex]?.content}&rdquo;
                      </blockquote>

                      <div>
                        <div className="font-semibold text-lg text-foreground dark:text-foreground">
                          {testimonials[currentIndex]?.name}
                        </div>
                        <div className="text-sm text-muted-foreground dark:text-muted-foreground">
                          {testimonials[currentIndex]?.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 导航按钮 */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              disabled={isAnimating}
              className="rounded-full w-10 h-10 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* 指示器 */}
            <div className="flex gap-2 mx-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  disabled={isAnimating}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              disabled={isAnimating}
              className="rounded-full w-10 h-10 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* 缩略图预览 */}
          <div className="flex justify-center gap-4 mt-8 overflow-x-auto pb-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => goToTestimonial(index)}
                disabled={isAnimating}
                className={`flex-shrink-0 relative w-16 h-16 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "ring-2 ring-primary scale-110"
                    : "opacity-60 hover:opacity-80 hover:scale-105"
                }`}
              >
                <Image
                  src={avatarMap[testimonial.id] || avatarMap[1]}
                  alt={testimonial.name || "User avatar"}
                  fill
                  className="object-cover rounded-full"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
