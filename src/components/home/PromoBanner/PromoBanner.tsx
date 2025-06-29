"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <span>🎁 Special Launch Offer</span>
          <Link 
            href="https://github.com/aimaker-dev/aimaker-template"
            className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:no-underline"
          >
            <strong>AIMaker Template</strong>
            <img 
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
              alt="GitHub" 
              className="h-4 w-4"
            />
          </Link>
          <span>- Ship Your AI Product in Hours</span>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <Link 
            href="https://github.com/aimaker-dev/aimaker-template"
            className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium hover:bg-white/20 transition-colors"
          >
            Get Started
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="rounded-full p-1 hover:bg-white/10 transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}