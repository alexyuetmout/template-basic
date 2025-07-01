import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BlogCardProps {
  post: {
    id: number
    title: string
    date: string
    author: string
    description: string
    image: string
    slug: string
    readTime: string
    tags: string[]
  }
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article>
      <Card className="group bg-background dark:bg-card rounded-2xl border border-border dark:border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
              {post.tags[0]}
            </span>
          </div>
        </div>
        
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time>{post.date}</time>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-foreground dark:text-foreground mb-3 group-hover:text-primary dark:group-hover:text-primary transition-colors">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h2>
          
          <p className="text-muted-foreground dark:text-muted-foreground mb-4 flex-grow">
            {post.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-sm text-muted-foreground dark:text-muted-foreground">
              {post.readTime}
            </span>
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-primary dark:text-primary font-medium hover:gap-3 transition-all duration-200"
            >
              Read More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </article>
  )
}