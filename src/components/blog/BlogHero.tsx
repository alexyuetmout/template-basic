interface BlogHeroProps {
  title: string
  subtitle: string
}

export function BlogHero({ title, subtitle }: BlogHeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-6">
            {title}
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}