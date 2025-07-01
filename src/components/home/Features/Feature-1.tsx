"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { HeadingH2 } from "@/components/ui/headings";

export function Features1() {
  const { t } = useTranslation("home");

  const features1 = [
    {
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
      ),
      title: t("features1.items.0.title"),
      description: t("features1.items.0.description"),
    },
    {
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          ></path>
        </svg>
      ),
      title: t("features1.items.1.title"),
      description: t("features1.items.1.description"),
    },
    {
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      ),
      title: t("features1.items.2.title"),
      description: t("features1.items.2.description"),
    },
  ];

  return (
    <div className="relative py-20 bg-background dark:bg-background" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold tracking-wide text-primary bg-primary/10 dark:text-primary dark:bg-primary/20">
            {t("features1.badge")}
          </div>
          <HeadingH2 className="mt-6 text-foreground dark:text-foreground">
            {t("features1.title")}
          </HeadingH2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-muted-foreground dark:text-muted-foreground">
            {t("features1.subtitle")}
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features1.map((feature, index) => (
              <div key={index} className="h-full">
                <Card className="h-full p-8 bg-background dark:bg-card rounded-2xl border-0 shadow-sm">
                  <CardContent className="p-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary">
                      {feature.icon}
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-foreground dark:text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground dark:text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
