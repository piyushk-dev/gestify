'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Calendar, User, Eye } from 'lucide-react'

interface Article {
  id: string | number
  title: string
  excerpt: string
  fullContent: string
  date: string
  readTime: string
  category: string
  image?: string
  tags?: string[]
  sentiment?: string
  sources?: string[]
}

interface NewspaperProps {
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
}: NewspaperProps) {
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getDropCap = (text: string) => {
    return text.charAt(0)
  }

  const getBodyText = (text: string) => {
    return text.slice(1)
  }

  return (
    <div className="newspaper-paper min-h-screen py-8 px-4 sm:px-6 lg:px-8 newspaper-shadow">
      <div className="max-w-6xl mx-auto">
        {/* Newspaper Masthead */}
        <div className="mb-8 text-center">
          <div className="newspaper-masthead">
            <h1 className="font-serif font-black text-6xl md:text-7xl text-gray-900 tracking-tighter mb-2">
              THE DAILY BRIEF
            </h1>
            <p className="font-sans text-xs md:text-sm uppercase tracking-widest text-gray-700 letter-spacing">
              Your Daily News & Insights
            </p>
          </div>

          {/* Date and Edition Badge */}
          <div className="flex justify-between items-center mt-6 text-xs">
            <span className="text-gray-600">EDITION NO. 001</span>
            <div className="newspaper-date-badge">
              {formatDate(today)}
            </div>
            <span className="text-gray-600">WEEKDAY EDITION</span>
          </div>
        </div>

        {/* Top Divider */}
        <div className="h-1 bg-black mb-8 mt-8"></div>

        {/* Main Story Section - Full Width */}
        <div className="mb-12">
          <article className="bg-white bg-opacity-60 p-6 sm:p-8 border-2 border-gray-800 newspaper-shadow">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* Main Headline Content */}
              <div className="md:col-span-2">
                <span className="inline-block bg-gray-900 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4">
                  {mainHeadline.category}
                </span>

                <h2 className="newspaper-headline font-serif font-black text-4xl md:text-5xl text-gray-900 mb-4 leading-tight">
                  {mainHeadline.title}
                </h2>

                <p className="newspaper-byline text-gray-700 mb-4">
                  By {mainHeadline.sources?.[0] || 'Staff Writer'} | {formatDate(mainHeadline.date)} | Read Time: {mainHeadline.readTime}
                </p>

                <div className="prose prose-sm max-w-none text-gray-800">
                  <p className="font-serif text-base leading-relaxed">
                    <span className="newspaper-drop-cap text-gray-900 font-serif font-bold">
                      {getDropCap(mainHeadline.excerpt)}
                    </span>
                    {getBodyText(mainHeadline.excerpt)}
                  </p>
                </div>
              </div>

              {/* Main Image */}
              {mainHeadline.image && (
                <div className="md:col-span-1">
                  <div className="relative w-full h-64 md:h-80 border-4 border-gray-800 bg-gray-200 overflow-hidden">
                    <Image
                      src={mainHeadline.image}
                      alt={mainHeadline.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <p className="text-xs text-gray-700 mt-2 font-sans italic text-center">
                    Photo Credit: Associated Press
                  </p>
                </div>
              )}
            </div>
          </article>
        </div>

        {/* Section Divider */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          <div className="h-1 bg-gray-800"></div>
          <div className="h-1 bg-red-700"></div>
          <div className="h-1 bg-gray-800"></div>
        </div>

        {/* Two-Column Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Secondary Headline */}
          <div className="newspaper-article">
            <span className="inline-block bg-red-700 text-white px-2 py-1 text-xs font-bold uppercase tracking-widest mb-3">
              {secondaryHeadline.category}
            </span>
            <h3 className="newspaper-headline font-serif font-bold text-2xl md:text-3xl text-gray-900 mb-2">
              {secondaryHeadline.title}
            </h3>
            <p className="newspaper-byline text-xs text-gray-600 mb-3">
              {formatDate(secondaryHeadline.date)}
            </p>
            <p className="font-serif text-sm leading-relaxed text-gray-800 mb-4">
              {secondaryHeadline.excerpt}
            </p>
            <Link
              href={`/article/${secondaryHeadline.id}`}
              className="inline-flex items-center text-red-700 font-semibold text-sm hover:text-red-900 transition"
            >
              Read Full Story <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Quick Stories */}
          <div className="space-y-4">
            <h4 className="newspaper-section-title font-serif font-bold text-xl uppercase text-gray-900 border-b-2 border-gray-800 pb-2">
              In Brief
            </h4>
            {moreStories.slice(0, 3).map((story) => (
              <div key={story.id} className="newspaper-sub-article pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
                  {story.category}
                </span>
                <h5 className="font-serif font-bold text-sm text-gray-900 mt-1 mb-1 line-clamp-2">
                  {story.title}
                </h5>
                <p className="font-sans text-xs text-gray-600 mb-2">
                  {formatDate(story.date)}
                </p>
                <Link
                  href={`/article/${story.id}`}
                  className="text-red-700 hover:text-red-900 text-xs font-semibold transition"
                >
                  Continue Reading →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Full Width Divider */}
        <div className="h-px bg-gray-400 my-12"></div>

        {/* Categories Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {Object.entries(categoryData)
            .slice(0, 3)
            .map(([category, articles]) => (
              <div key={category} className="newspaper-column">
                <h4 className="newspaper-section-title font-serif font-bold text-xl uppercase text-gray-900 border-b-2 border-gray-800 pb-2 mb-4">
                  {category.toUpperCase()}
                </h4>

                <div className="space-y-4">
                  {articles.slice(0, 2).map((article) => (
                    <article key={article.id} className="newspaper-sub-article">
                      <h5 className="font-serif font-bold text-base text-gray-900 mb-2 line-clamp-2 leading-tight">
                        {article.title}
                      </h5>
                      <p className="font-serif text-xs leading-relaxed text-gray-700 mb-3 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-600">
                        <span>{article.readTime}</span>
                        <Link
                          href={`/article/${article.id}`}
                          className="text-red-700 hover:text-red-900 font-bold transition"
                        >
                          Read →
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Bottom Section - Weather & Notices */}
        <div className="grid md:grid-cols-2 gap-8 mt-12 pt-8 border-t-4 border-black">
          <div className="text-center py-6 border-r-2 border-gray-400">
            <h4 className="newspaper-section-title font-serif font-bold text-lg uppercase mb-4">
              Stay Updated
            </h4>
            <p className="font-sans text-sm text-gray-700 mb-4">
              Subscribe to our newsletter for daily updates and exclusive insights.
            </p>
            <button className="bg-gray-900 text-white px-6 py-2 font-bold uppercase text-xs hover:bg-red-700 transition">
              Subscribe Now
            </button>
          </div>

          <div className="text-center py-6">
            <h4 className="newspaper-section-title font-serif font-bold text-lg uppercase mb-4">
              About This Edition
            </h4>
            <p className="font-sans text-xs text-gray-600">
              The Daily Brief is your trusted source for news, analysis, and insights. Published daily.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t-2 border-black text-center">
          <p className="font-sans text-xs text-gray-700 tracking-widest uppercase letter-spacing">
            &copy; 2024 The Daily Brief | All Rights Reserved | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </div>
  )
}
