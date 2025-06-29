'use client'

import Head from 'next/head'
import { usePathname } from 'next/navigation'
import { pageConfigs, defaultSEOConfig, type SEOConfig } from '@/lib/seo-config'

interface TagSEOProps {
  title?: string
  description?: string
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
  keywords?: string
  autoDetect?: boolean
}

export default function TagSEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterCard,
  twitterSite,
  twitterCreator,
  noindex,
  nofollow,
  keywords,
  autoDetect = true
}: TagSEOProps) {
  const pathname = usePathname()
  
  const getAutoDetectedConfig = (): SEOConfig => {
    if (!autoDetect) return defaultSEOConfig
    
    const config = pageConfigs[pathname] || defaultSEOConfig
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com'
    
    return {
      ...config,
      canonical: canonical || `${baseUrl}${pathname}`,
      ogUrl: ogUrl || `${baseUrl}${pathname}`,
      ogImage: ogImage || config.ogImage || "/images/og-image.jpg"
    }
  }
  
  const autoConfig = getAutoDetectedConfig()
  
  const finalConfig = {
    title: title || autoConfig.title,
    description: description || autoConfig.description,
    keywords: keywords || autoConfig.keywords,
    canonical: canonical || autoConfig.canonical,
    ogTitle: ogTitle || autoConfig.ogTitle || title || autoConfig.title,
    ogDescription: ogDescription || autoConfig.ogDescription || description || autoConfig.description,
    ogImage: ogImage || autoConfig.ogImage,
    ogUrl: ogUrl || autoConfig.ogUrl,
    twitterCard: twitterCard || autoConfig.twitterCard || "summary_large_image",
    twitterSite: twitterSite || autoConfig.twitterSite,
    twitterCreator: twitterCreator || autoConfig.twitterCreator,
    noindex: noindex !== undefined ? noindex : autoConfig.noindex || false,
    nofollow: nofollow !== undefined ? nofollow : autoConfig.nofollow || false
  }
  const robotsContent = `${finalConfig.noindex ? 'noindex' : 'index'},${finalConfig.nofollow ? 'nofollow' : 'follow'}`
  
  return (
    <Head>
      <title>{finalConfig.title}</title>
      <meta name="description" content={finalConfig.description} />
      {finalConfig.keywords && <meta name="keywords" content={finalConfig.keywords} />}
      <meta name="robots" content={robotsContent} />
      
      {finalConfig.canonical && <link rel="canonical" href={finalConfig.canonical} />}
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalConfig.ogTitle} />
      <meta property="og:description" content={finalConfig.ogDescription} />
      {finalConfig.ogImage && <meta property="og:image" content={finalConfig.ogImage} />}
      {finalConfig.ogUrl && <meta property="og:url" content={finalConfig.ogUrl} />}
      
      <meta name="twitter:card" content={finalConfig.twitterCard} />
      <meta name="twitter:title" content={finalConfig.ogTitle} />
      <meta name="twitter:description" content={finalConfig.ogDescription} />
      {finalConfig.ogImage && <meta name="twitter:image" content={finalConfig.ogImage} />}
      {finalConfig.twitterSite && <meta name="twitter:site" content={finalConfig.twitterSite} />}
      {finalConfig.twitterCreator && <meta name="twitter:creator" content={finalConfig.twitterCreator} />}
      
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}