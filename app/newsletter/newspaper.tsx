'use client'

interface Article {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  tags: string[]
  sentiment: string
  source: string
  category: string
  link?: string
}

interface NewspaperLayoutProps {
  today: string
  mainHeadline: Article
  secondaryHeadline: Article
  moreStories: Article[]
  categoryData: Record<string, Article[]>
  savedPrefs: string[]
}

export default function NewspaperLayout({
  today,
  mainHeadline,
  secondaryHeadline,
  moreStories,
  categoryData,
  savedPrefs,
}: NewspaperLayoutProps) {
  return (
    <main className="newspaper-paper min-h-screen py-8">
      <article className="max-w-6xl mx-auto px-6 md:px-8 newspaper-shadow">
        {/* Masthead */}
        <header className="newspaper-masthead text-center mb-6 pb-6">
          <div className="text-xs uppercase tracking-widest text-gray-600 mb-2">
            {today}
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-black text-gray-900 mb-3">
            GESTIFY NEWS
          </h1>
          <p className="font-serif text-sm md:text-base italic text-gray-700">
            Your Daily Personalized News Digest
          </p>
        </header>

        {/* Main Headline Section */}
        {mainHeadline && (
          <section className="mb-8 pb-8 border-b-2 border-gray-400">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="newspaper-headline text-3xl md:text-5xl mb-4">
                  {mainHeadline.title}
                </h2>
                <div className="newspaper-byline">
                  <span className="font-bold">{mainHeadline.source}</span>
                  <span className="mx-2">•</span>
                  <span>{mainHeadline.date}</span>
                  <span className="mx-2">•</span>
                  <span>{mainHeadline.readTime}</span>
                </div>
                <p className="font-serif text-base text-gray-800 mb-4 leading-relaxed">
                  {mainHeadline.excerpt}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {mainHeadline.tags.map((tag) => (
                    <span
                      key={tag}
                      className="newspaper-date-badge bg-gray-900 text-white text-xs px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-1">
                <div className="border-4 border-gray-800 overflow-hidden">
                  <img
                    src={mainHeadline.image}
                    alt={mainHeadline.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Secondary Headline */}
        {secondaryHeadline && (
          <section className="mb-8 pb-8 border-b-2 border-gray-400">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 order-2 md:order-1">
                <div className="border-4 border-gray-600 overflow-hidden">
                  <img
                    src={secondaryHeadline.image}
                    alt={secondaryHeadline.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-2 order-1 md:order-2">
                <h2 className="newspaper-headline text-2xl md:text-3xl mb-3">
                  {secondaryHeadline.title}
                </h2>
                <div className="newspaper-byline">
                  <span className="font-bold">{secondaryHeadline.source}</span>
                  <span className="mx-2">•</span>
                  <span>{secondaryHeadline.date}</span>
                  <span className="mx-2">•</span>
                  <span>{secondaryHeadline.readTime}</span>
                </div>
                <p className="font-serif text-sm text-gray-800 leading-relaxed">
                  {secondaryHeadline.excerpt}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* More Stories Grid */}
        <section className="mb-8">
          <h3 className="newspaper-section-title text-2xl md:text-3xl mb-6">
            More Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moreStories.map((story) => (
              <article
                key={story.id}
                className="border-l-4 border-l-red-700 pl-4 pb-4 border-b border-b-gray-300 hover:shadow-lg transition-shadow"
              >
                <div className="border-2 border-gray-600 overflow-hidden mb-3">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-32 object-cover"
                  />
                </div>
                <h4 className="font-serif font-bold text-sm md:text-base mb-2 text-gray-900">
                  {story.title}
                </h4>
                <p className="font-serif text-xs text-gray-700 mb-3 line-clamp-2">
                  {story.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="font-semibold">{story.source}</span>
                  <span>•</span>
                  <span>{story.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mt-12 pt-8 border-t-4 border-black">
          <h3 className="newspaper-section-title text-2xl md:text-3xl mb-6">
            By Category
          </h3>
          <div className="space-y-8">
            {savedPrefs.map((category) => {
              const categoryArticles = categoryData[category] || []
              if (categoryArticles.length === 0) return null

              return (
                <div key={category} className="newspaper-article">
                  <h4 className="font-serif font-bold text-xl mb-4 uppercase text-gray-900">
                    {category.replace(/\//g, ' / ')}
                  </h4>
                  <div className="space-y-4">
                    {categoryArticles.slice(0, 3).map((article, idx) => (
                      <div
                        key={article.id}
                        className="newspaper-sub-article"
                      >
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <p className="font-serif font-semibold text-sm mb-1 text-gray-900">
                              {article.title}
                            </p>
                            <p className="text-xs text-gray-600">
                              {article.source} • {article.date}
                            </p>
                          </div>
                          <div className="text-xs font-semibold text-gray-700 whitespace-nowrap">
                            {article.readTime}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t-2 border-gray-400 text-center">
          <p className="font-serif text-sm text-gray-600 mb-2">
            © 2024 Gestify News. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Personalized news digest curated from {savedPrefs.length} selected categories
          </p>
        </footer>
      </article>
    </main>
  )
}
