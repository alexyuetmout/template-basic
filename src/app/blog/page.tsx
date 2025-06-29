import { blogPosts } from "@/lib/blog-data"
import { BlogCard } from "@/components/blog/BlogCard"
import { BlogHero } from "@/components/blog/BlogHero"
import { NewsletterSection } from "@/components/blog/NewsletterSection"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <BlogHero 
        title="AI Development Blog"
        subtitle="Discover the latest insights, tutorials, and best practices in AI development. From beginner guides to advanced techniques."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <NewsletterSection />
      </div>
    </div>
  )
}