"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useTranslation("home");

  if (!isVisible) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 text-gray-800">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="geometric-pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="1.5" fill="gray" opacity="0.3" />
                <path
                  d="M0 20 L20 0 L40 20 L20 40 Z"
                  fill="gray"
                  opacity="0.12"
                />
                <rect
                  x="15"
                  y="15"
                  width="10"
                  height="10"
                  fill="gray"
                  opacity="0.08"
                  rx="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
          </svg>
        </div>
        {/* Floating geometric shapes */}
        <div className="absolute top-2 left-16 w-3 h-3 bg-muted/40 rounded transform rotate-45"></div>
        <div className="absolute top-1 right-40 w-2 h-2 bg-muted/35 rounded-full"></div>
        <div className="absolute bottom-2 left-1/4 w-2 h-2 bg-muted/45 transform rotate-45"></div>
        <div className="absolute bottom-1 right-1/4 w-2 h-2 bg-muted/30 rounded-full"></div>
        <div className="absolute top-3 left-1/3 w-1.5 h-1.5 bg-muted/40 rounded"></div>
        <div className="absolute bottom-3 right-1/3 w-1.5 h-1.5 bg-muted/35 transform rotate-45"></div>
        <div className="absolute top-1 left-2/3 w-2 h-2 bg-muted/30 rounded transform rotate-12"></div>
        <div className="absolute bottom-2 left-3/4 w-1 h-1 bg-muted/50 rounded-full"></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <span>{t("topBanner.offer")}</span>
          <Link
            href="https://github.com/aimaker-dev/aimaker-template"
            className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:no-underline"
          >
            <strong>{t("topBanner.template")}</strong>
            <Image
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub"
              width={16}
              height={16}
              className="h-4 w-4"
            />
          </Link>
          <span>{t("topBanner.description")}</span>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <Link
            href="https://github.com/aimaker-dev/aimaker-template"
            className="rounded-full bg-gray-800 text-white px-4 py-1.5 text-xs font-medium hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            {t("topBanner.getStarted")}
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="rounded-full p-1 hover:bg-gray-200 transition-colors flex items-center justify-center"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
