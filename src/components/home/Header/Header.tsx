'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItem {
  label: string
  href: string
  isActive?: boolean
}

interface AuthButton {
  label: string
  href: string
  variant: 'ghost' | 'default'
  className: string
}

const navigationItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' }
]

const authButtons: AuthButton[] = [
  {
    label: 'Log in',
    href: '/auth/sign-in',
    variant: 'ghost',
    className: 'h-9 rounded-lg px-3 hover:bg-neutral-200/50 hover:text-accent-foreground transition-all duration-200'
  },
  {
    label: 'Sign up',
    href: '/auth/sign-up',
    variant: 'default',
    className: 'h-9 rounded-lg px-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xs transition-all duration-200'
  }
]

const Logo = () => (
  <Link className="flex items-center gap-2" href="/">
    <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-sm">AI</span>
    </div>
    <span className="text-xl font-bold tracking-tight text-neutral-900">AIMaker</span>
  </Link>
)

const NavLink = ({ item, isActive }: { item: NavItem; isActive: boolean }) => (
  <li className="h-full">
    <Link 
      className={`h-full px-4 flex items-center text-sm transition-colors hover:text-neutral-900 hover:bg-neutral-100 rounded-xl ${
        isActive 
          ? 'text-neutral-900 font-semibold' 
          : 'text-neutral-500 font-medium'
      }`} 
      href={item.href}
    >
      {item.label}
    </Link>
  </li>
)

const Navigation = () => {
  const pathname = usePathname()
  
  return (
    <nav className="hidden md:flex">
      <ul className="flex items-center h-10">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/' && pathname === '/')
          return (
            <NavLink key={item.href} item={item} isActive={isActive} />
          )
        })}
      </ul>
    </nav>
  )
}

const AuthButtons = () => (
  <div className="hidden md:block">
    <div className="flex items-center gap-2">
      {authButtons.map((button) => (
        <Link key={button.href} href={button.href}>
          <Button variant={button.variant} className={button.className}>
            {button.label}
          </Button>
        </Link>
      ))}
    </div>
  </div>
)

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo />
            <Navigation />
          </div>
          <div className="flex items-center gap-4">
            <AuthButtons />
          </div>
        </div>
      </div>
    </header>
  )
} 