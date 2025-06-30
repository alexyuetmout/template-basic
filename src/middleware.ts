import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import i18nConfig from '../i18nConfig'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Handle /en/* paths - redirect to remove /en prefix (English is default)
  if (pathname.startsWith('/en/') || pathname === '/en') {
    const url = request.nextUrl.clone()
    url.pathname = pathname === '/en' ? '/' : pathname.slice(3) // Remove '/en' prefix
    return NextResponse.redirect(url)
  }
  
  // Check if path already has a locale
  const pathnameHasLocale = i18nConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  // If path has no locale, it's English (default) - rewrite to /en/path internally
  if (!pathnameHasLocale) {
    const url = request.nextUrl.clone()
    url.pathname = `/en${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }
  
  // For paths with other locales, continue normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|.*\\..*|logo.svg).*)'
  ]
}