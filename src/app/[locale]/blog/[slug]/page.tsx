import { notFound } from "next/navigation"
import { Calendar, User, Clock, Share2 } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { getBlogPost, getRelatedPosts } from "@/lib/blog-data"
import { BlogNavigation } from "@/components/blog/BlogNavigation"
import { RelatedPostLink } from "@/components/blog/RelatedPostLink"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.id, 2)

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BlogNavigation />

          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="bg-primary/10 dark:bg-primary/20/30 text-primary dark:text-primary text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-foreground mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 text-muted-foreground dark:text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time>{post.date}</time>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="flex-1">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: (post.content || '').replace(/\n/g, '<br />').replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>') 
                }}
              />
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-border dark:border-border">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground dark:text-muted-foreground font-medium">Share this article:</span>
                <button className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="sticky top-8">
              {/* Author Info */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground dark:text-foreground mb-2">
                    About the Author
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20/30 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary dark:text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground dark:text-foreground">{post.author}</p>
                      <p className="text-sm text-muted-foreground dark:text-muted-foreground">AI Developer</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                    Passionate about making AI accessible to everyone through clear tutorials and practical examples.
                  </p>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground dark:text-foreground mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <RelatedPostLink 
                        key={relatedPost.id}
                        post={{
                          id: relatedPost.id.toString(),
                          slug: relatedPost.slug,
                          title: relatedPost.title,
                          excerpt: relatedPost.content || '',
                          imageUrl: relatedPost.image,
                          date: relatedPost.readTime
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}