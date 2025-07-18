"use client";
import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useTranslation } from "@/hooks/useTranslation";
import { HeadingH2 } from "@/components/ui/headings";

export function Features2() {
  const { t } = useTranslation("home");

  const features2 = [
    {
      title: t("features2.items.0.title"),
      description: t("features2.items.0.description"),
      bgColor:
        "bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20",
      image: "/images/feature/feature-2/1.svg",
    },
    {
      title: t("features2.items.1.title"),
      description: t("features2.items.1.description"),
      bgColor:
        "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20",
      image: "/images/feature/feature-2/2.svg",
    },
    {
      title: t("features2.items.2.title"),
      description: t("features2.items.2.description"),
      bgColor:
        "bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20",
      image: "/images/feature/feature-2/3.svg",
    },
    {
      title: t("features2.items.3.title"),
      description: t("features2.items.3.description"),
      bgColor:
        "bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20",
      image: "/images/feature/feature-2/4.svg",
    },
    {
      title: t("features2.items.4.title"),
      description: t("features2.items.4.description"),
      bgColor:
        "bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20",
      image: "/images/feature/feature-2/5.svg",
    },
    {
      title: t("features2.items.5.title"),
      description: t("features2.items.5.description"),
      bgColor:
        "bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20",
      image: "/images/feature/feature-2/6.svg",
    },
  ];

  return (
    <div className="relative py-20 bg-gray-50 dark:bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold tracking-wide text-primary bg-primary/10 dark:bg-primary/5 mb-6">
            {t("features2.badge")}
          </div>
          <HeadingH2 className="text-foreground dark:text-foreground mb-4">
            {t("features2.title")}
          </HeadingH2>
          <p className="max-w-2xl mx-auto text-base text-muted-foreground dark:text-muted-foreground">
            {t("features2.subtitle")}
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
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="group h-full">
                  <div className="h-full flex flex-col bg-background dark:bg-background rounded-2xl border border-border dark:border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/5 flex items-center justify-center flex-shrink-0">
                          <div className="w-6 h-6 rounded-lg bg-primary/20"></div>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground dark:text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    <div
                      className={`relative h-48 ${feature.bgColor} p-6 flex items-center justify-center`}
                    >
                      <div className="relative w-28 h-28">
                        <Image
                          src={feature.image}
                          alt={feature.title || "Feature illustration"}
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
  );
}
