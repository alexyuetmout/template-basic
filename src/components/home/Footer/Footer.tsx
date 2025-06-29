import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-gradient-to-b from-neutral-50/50 to-neutral-100/80 border-neutral-200/50 dark:from-neutral-800/50 dark:to-neutral-900 dark:border-neutral-700/30">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Link className="flex items-center gap-2" href="/">
              <Image src="/logo.svg" alt="AIMaker Logo" width={32} height={32} className="h-8 w-8" />
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-100 dark:to-neutral-300 bg-clip-text text-transparent">
                AIMaker
              </span>
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Empowering everyone with AI tools. Build faster, smarter, and more efficiently.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-primary dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                <span className="sr-only">GitHub</span>
              </Button>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-neutral-900 dark:text-white">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200" href="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200" href="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-neutral-900 dark:text-white">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200" href="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200" href="/terms">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Empty column for spacing */}
          <div></div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              © 2025 AIMaker. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200" href="/privacy">
                Privacy
              </Link>
              <Link className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200" href="/terms">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 