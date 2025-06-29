import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link className="flex items-center gap-2" href="/">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-900">AIMaker</span>
            </Link>
            <nav className="hidden md:flex">
              <ul className="flex items-center h-10">
                <li className="h-full">
                  <Link className="h-full px-4 flex items-center text-sm transition-colors hover:text-neutral-900 hover:bg-neutral-100 rounded-xl text-neutral-900 font-semibold" href="/">
                    Home
                  </Link>
                </li>
                <li className="h-full">
                  <Link className="h-full px-4 flex items-center text-sm font-medium transition-colors hover:text-neutral-900 hover:bg-neutral-100 rounded-xl text-neutral-500" href="/#features">
                    Features
                  </Link>
                </li>
                <li className="h-full">
                  <Link className="h-full px-4 flex items-center text-sm font-medium transition-colors hover:text-neutral-900 hover:bg-neutral-100 rounded-xl text-neutral-500" href="/pricing">
                    Pricing
                  </Link>
                </li>
                <li className="h-full">
                  <Link className="h-full px-4 flex items-center text-sm font-medium transition-colors hover:text-neutral-900 hover:bg-neutral-100 rounded-xl text-neutral-500" href="/blog">
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <div className="flex items-center gap-2">
                <Link href="/auth/sign-in">
                  <Button variant="ghost" className="h-9 rounded-lg px-3 hover:bg-neutral-200/50 hover:text-accent-foreground transition-all duration-200">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button className="h-9 rounded-lg px-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xs transition-all duration-200">
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 