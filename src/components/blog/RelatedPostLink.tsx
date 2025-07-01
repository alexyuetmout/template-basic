'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePath } from '@/hooks/usePath'

interface RelatedPost {
  id: string
  slug: string
  title: string
  excerpt: string
  imageUrl: string
  date: string
}

interface RelatedPostLinkProps {
  post: RelatedPost
}

export function RelatedPostLink({ post }: RelatedPostLinkProps) {
  const { path } = usePath()
  
  return (
    <Link 
      href={path(`/blog/${post.slug}`)}
      className="block group"
    >
      <div className="flex gap-3">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={64}
            height={64}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {post.date}
          </p>
        </div>
      </div>
    </Link>
  )
}