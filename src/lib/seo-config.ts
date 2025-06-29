export interface SEOConfig {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  twitterSite?: string
  twitterCreator?: string
  noindex?: boolean
  nofollow?: boolean
  schemaType?: 'WebSite' | 'WebPage' | 'Article' | 'BlogPosting' | 'Product' | 'Organization'
}

export interface Organization {
  name: string
  url: string
  logo?: string
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export const defaultOrganization: Organization = {
  name: 'Template Basic',
  url: 'https://yourdomain.com',
  logo: 'https://yourdomain.com/logo.svg'
}

export const defaultSEOConfig: SEOConfig = {
  title: "Template Basic - Modern Next.js Starter",
  description: "A modern, responsive Next.js template with TypeScript, Tailwind CSS, and optimized SEO.",
  keywords: "nextjs, react, typescript, tailwind, template, starter",
  ogImage: "/images/og-image.jpg",
  twitterCard: "summary_large_image",
  schemaType: "WebSite"
}

export const pageConfigs: Record<string, SEOConfig> = {
  '/': {
    title: 'Template Basic - Modern Next.js Starter',
    description: 'A modern, responsive Next.js template with TypeScript, Tailwind CSS, and optimized SEO.',
    keywords: 'nextjs, react, typescript, tailwind, template, starter',
    schemaType: 'WebSite'
  },
  '/pricing': {
    title: 'Pricing - Template Basic',
    description: 'Choose the perfect plan for your needs. Flexible pricing options for every project size.',
    keywords: 'pricing, plans, subscription, template basic',
    schemaType: 'WebPage'
  },
  '/auth/sign-in': {
    title: 'Sign In - Template Basic',
    description: 'Sign in to your account to access premium features.',
    keywords: 'sign in, login, authentication',
    schemaType: 'WebPage',
    noindex: true
  },
  '/auth/sign-up': {
    title: 'Sign Up - Template Basic',
    description: 'Create your account and start building with our template.',
    keywords: 'sign up, register, create account',
    schemaType: 'WebPage',
    noindex: true
  },
  '/auth/forgot-password': {
    title: 'Reset Password - Template Basic',
    description: 'Reset your password to regain access to your account.',
    keywords: 'reset password, forgot password, recover',
    schemaType: 'WebPage',
    noindex: true
  }
}

export const generateBreadcrumbs = (path: string, baseUrl: string): BreadcrumbItem[] => {
  const segments = path.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: baseUrl }
  ]
  
  let currentPath = ''
  segments.forEach(segment => {
    currentPath += `/${segment}`
    const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ')
    breadcrumbs.push({
      name,
      url: `${baseUrl}${currentPath}`
    })
  })
  
  return breadcrumbs
}