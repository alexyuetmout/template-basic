"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { HeadingH2 } from "@/components/ui/headings";
import { usePath } from "@/hooks/usePath";

export function Blog() {
  const { t } = useTranslation("home");
  const { routes } = usePath();

  const blogPosts = [
    {
      title: t('blog.posts.0.title'),
      date: t('blog.posts.0.date'),
      description: t('blog.posts.0.description'),
      image: "/images/blog/ai-chatbot.jpg",
      slug: "building-ai-chatbot",
    },
    {
      title: t('blog.posts.1.title'),
      date: t('blog.posts.1.date'),
      description: t('blog.posts.1.description'),
      image: "/images/blog/ai-development.jpg",
      slug: "getting-started-with-ai-development",
    },
    {
      title: t('blog.posts.2.title'),
      date: t('blog.posts.2.date'),
      description: t('blog.posts.2.description'),
      image: "/images/blog/welcome.jpg",
      slug: "welcome-to-aimaker",
    },
  ];

  return (
    <div className="relative py-20 bg-gray-50 dark:bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <HeadingH2 className="text-foreground dark:text-foreground mb-4">
            {t("blog.title")}
          </HeadingH2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground dark:text-muted-foreground">
            {t("blog.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="group bg-background dark:bg-background rounded-2xl border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <time className="text-sm text-primary dark:text-primary font-medium">
                  {post.date}
                </time>
                <h3 className="text-xl font-semibold text-foreground dark:text-foreground mt-2 mb-3 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-muted-foreground dark:text-muted-foreground mb-4">
                  {post.description}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-primary dark:text-primary font-medium hover:gap-3 transition-all duration-200"
                >
                  {t("blog.readMore")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={routes.BLOG}
            className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200"
          >
            {t("blog.viewAllPosts")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
