'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { usePath } from '@/hooks/usePath'

export function BlogNavigation() {
  const { routes } = usePath()
  
  return (
    <Link 
      href={routes.BLOG}
      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Blog
    </Link>
  )
}