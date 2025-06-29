'use client'

import Head from 'next/head'
import { usePathname } from 'next/navigation'
import { 
  pageConfigs, 
  defaultSEOConfig, 
  defaultOrganization, 
  generateBreadcrumbs,
  type Organization,
  type BreadcrumbItem 
} from '@/lib/seo-config'

interface Person {
  name: string
  url?: string
}

interface TagSchemaProps {
  type?: 'WebSite' | 'WebPage' | 'Article' | 'BlogPosting' | 'Product' | 'Organization'
  title?: string
  description?: string
  url?: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: Person
  organization?: Organization
  breadcrumbs?: BreadcrumbItem[]
  price?: {
    amount: number
    currency: string
  }
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
  autoDetect?: boolean
}

export default function TagSchema({
  type,
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
  organization = defaultOrganization,
  breadcrumbs,
  price,
  aggregateRating,
  autoDetect = true
}: TagSchemaProps) {
  const pathname = usePathname()
  
  const getAutoDetectedConfig = () => {
    if (!autoDetect) return {}
    
    const config = pageConfigs[pathname] || defaultSEOConfig
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com'
    
    const autoBreadcrumbs = pathname !== '/' ? generateBreadcrumbs(pathname, baseUrl) : undefined
    
    return {
      type: config.schemaType,
      title: config.title,
      description: config.description,
      url: `${baseUrl}${pathname}`,
      image: config.ogImage || `${baseUrl}/images/og-image.jpg`,
      breadcrumbs: autoBreadcrumbs
    }
  }
  
  const autoConfig = getAutoDetectedConfig()
  const finalConfig = {
    type: type || autoConfig.type || 'WebPage',
    title: title || autoConfig.title,
    description: description || autoConfig.description,
    url: url || autoConfig.url,
    image: image || autoConfig.image,
    breadcrumbs: breadcrumbs || autoConfig.breadcrumbs,
    datePublished,
    dateModified,
    author,
    organization,
    price,
    aggregateRating
  }
  const generateSchema = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': finalConfig.type,
      ...(finalConfig.title && { name: finalConfig.title, headline: finalConfig.title }),
      ...(finalConfig.description && { description: finalConfig.description }),
      ...(finalConfig.url && { url: finalConfig.url }),
      ...(finalConfig.image && { image: finalConfig.image })
    }

    if (finalConfig.type === 'Article' || finalConfig.type === 'BlogPosting') {
      return {
        ...baseSchema,
        ...(finalConfig.datePublished && { datePublished: finalConfig.datePublished }),
        ...(finalConfig.dateModified && { dateModified: finalConfig.dateModified }),
        ...(finalConfig.author && {
          author: {
            '@type': 'Person',
            name: finalConfig.author.name,
            ...(finalConfig.author.url && { url: finalConfig.author.url })
          }
        }),
        ...(finalConfig.organization && {
          publisher: {
            '@type': 'Organization',
            name: finalConfig.organization.name,
            url: finalConfig.organization.url,
            ...(finalConfig.organization.logo && {
              logo: {
                '@type': 'ImageObject',
                url: finalConfig.organization.logo
              }
            })
          }
        })
      }
    }

    if (finalConfig.type === 'Product') {
      return {
        ...baseSchema,
        ...(finalConfig.price && {
          offers: {
            '@type': 'Offer',
            price: finalConfig.price.amount,
            priceCurrency: finalConfig.price.currency,
            availability: 'https://schema.org/InStock'
          }
        }),
        ...(finalConfig.aggregateRating && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: finalConfig.aggregateRating.ratingValue,
            reviewCount: finalConfig.aggregateRating.reviewCount
          }
        })
      }
    }

    if (finalConfig.type === 'Organization') {
      return {
        ...baseSchema,
        ...(finalConfig.organization && {
          name: finalConfig.organization.name,
          url: finalConfig.organization.url,
          ...(finalConfig.organization.logo && { logo: finalConfig.organization.logo })
        })
      }
    }

    return baseSchema
  }

  const generateBreadcrumbSchema = () => {
    if (!finalConfig.breadcrumbs || finalConfig.breadcrumbs.length === 0) return null

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: finalConfig.breadcrumbs.map((item: BreadcrumbItem, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }
  }

  const schema = generateSchema()
  const breadcrumbSchema = generateBreadcrumbSchema()

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
    </Head>
  )
}