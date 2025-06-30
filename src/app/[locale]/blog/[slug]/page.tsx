import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { getBlogPost, getRelatedPosts } from "@/lib/blog-data"

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
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 text-neutral-600 dark:text-neutral-400">
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
            <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-4">
                <span className="text-neutral-600 dark:text-neutral-400 font-medium">Share this article:</span>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
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
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    About the Author
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-neutral-100">{post.author}</p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">AI Developer</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Passionate about making AI accessible to everyone through clear tutorials and practical examples.
                  </p>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link 
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                              {relatedPost.readTime}
                            </p>
                          </div>
                        </div>
                      </Link>
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