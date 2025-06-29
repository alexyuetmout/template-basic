"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AuthNavigation() {
  return (
    <div className="absolute top-4 left-4 z-10">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}