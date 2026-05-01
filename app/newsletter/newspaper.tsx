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

  return (
    <div className="newspaper-paper min-h-screen">
      {/* Outer margin and shadow effect */}
      <div className="max-w-[900px] mx-auto px-6 py-12 newspaper-shadow bg-[#faf7f2]">
        {/* MASTHEAD */}
        <header className="newspaper-masthead text-center mb-8">
          <div className="mb-4">
            <h1 className="font-serif font-black text-6xl md:text-7xl text-gray-900 leading-none mb-2">
              GESTIFY
            </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-700 font-bold">
              Daily News Digest
            </p>
          </div>

          {/* Date and Edition */}
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            <span className="newspaper-date-badge">{today.toUpperCase()}</span>
            <span className="text-xs uppercase tracking-widest text-gray-600 font-semibold">
              Your Personalized Edition
            </span>
          </div>

          {/* Tagline */}
          <p className="text-sm italic text-gray-600 mt-4 font-serif">
            {`"${savedPrefs.length} ${savedPrefs.length === 1 ? 'category' : 'categories'} of curated news""`}
          </p>
        </header>

        {/* DIVIDER */}
        <div className="border-t-2 border-t-gray-400 border-b border-b-gray-300 py-3 mb-8">
          <div className="flex justify-center gap-2">
            <span className="w-1 h-1 bg-gray-900 rounded-full"></span>
            <span className="w-1 h-1 bg-gray-900 rounded-full"></span>
            <span className="w-1 h-1 bg-gray-900 rounded-full"></span>
          </div>
        </div>

        {/* MAIN HEADLINE SECTION */}
        {mainHeadline && (
          <section className="mb-8 pb-8 border-b-4 border-b-black">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Story Image and Content */}
              <div className="md:col-span-2">
                <h2 className="newspaper-headline">
                  {mainHeadline.title}
                </h2>
                <div className="newspaper-byline flex gap-2">
                  <span>{mainHeadline.category}</span>
                  <span>•</span>
                  <span>{formatDate(mainHeadline.date)}</span>
                  <span>•</span>
                  <span>{mainHeadline.readTime}</span>
                </div>

                {/* Article preview */}
                <p className="text-sm leading-relaxed text-gray-800 mb-4 font-serif">
                  {mainHeadline.excerpt?.substring(0, 300)}...
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mainHeadline.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-gray-800 px-3 py-1 text-xs font-bold uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={mainHeadline.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-700 font-bold text-sm uppercase tracking-wide hover:underline flex items-center gap-1"
                >
                  Read Full Story <ChevronRight size={16} />
                </a>
              </div>

              {/* Image column */}
              <div className="md:col-span-1">
                {mainHeadline.image && mainHeadline.image !== '/placeholder.svg?height=400&width=600' ? (
                  <div className="relative w-full h-64 border-2 border-gray-400 shadow-lg bg-gray-100">
                    <Image
                      src={mainHeadline.image}
                      alt={mainHeadline.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 border-2 border-gray-400 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500 font-serif italic text-sm">[Image]</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* SECONDARY HEADLINE & SUPPORTING STORIES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Secondary Story - Featured */}
          {secondaryHeadline && (
            <div className="md:col-span-1 newspaper-article">
              <h3 className="font-serif font-bold text-xl leading-snug text-gray-900 mb-2">
                {secondaryHeadline.title}
              </h3>
              <p className="newspaper-byline mb-3">
                {formatDate(secondaryHeadline.date)}
              </p>
              <p className="text-xs leading-relaxed text-gray-800 font-serif mb-3">
                {secondaryHeadline.excerpt?.substring(0, 150)}...
              </p>
              <a
                href={secondaryHeadline.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-700 font-bold text-xs uppercase tracking-wide hover:underline"
              >
                Continue Reading →
              </a>
            </div>
          )}

          {/* More Stories - 2 columns */}
          {moreStories.slice(0, 2).map((story, idx) => (
            <div key={idx} className="newspaper-article">
              <h3 className="font-serif font-bold text-lg leading-snug text-gray-900 mb-2">
                {story.title}
              </h3>
              <p className="text-xs font-bold text-gray-700 uppercase mb-2">
                {story.category}
              </p>
              <p className="text-xs leading-relaxed text-gray-800 font-serif mb-3">
                {story.excerpt?.substring(0, 120)}...
              </p>
            </div>
          ))}
        </div>

        {/* SECTION DIVIDERS - INSIDE PAGES */}
        {savedPrefs.length > 0 && (
          <section className="mb-8">
            <div className="border-t-2 border-t-gray-400 border-b border-b-gray-300 py-3 mb-6">
              <h2 className="newspaper-section-title text-center">More From Today's Edition</h2>
            </div>

            {/* Multi-column layout for remaining stories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moreStories.slice(2, 8).map((story, idx) => (
                <div
                  key={idx}
                  className="newspaper-sub-article hover:bg-gray-50 transition-colors"
                >
                  <h4 className="font-serif font-bold text-base leading-tight text-gray-900 mb-1">
                    {story.title}
                  </h4>
                  <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold mb-2">
                    {story.category}
                  </p>
                  <p className="text-xs leading-relaxed text-gray-700 font-serif mb-3">
                    {story.excerpt?.substring(0, 100)}...
                  </p>
                  <p className="text-xs text-gray-500 italic">{story.readTime}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer className="border-t-2 border-t-black mt-8 pt-6">
          <div className="text-center text-xs text-gray-600 font-sans space-y-2">
            <p>
              Gestify News • Personalized Daily Digest
            </p>
            <p className="text-[10px] uppercase tracking-widest">
              © {new Date().getFullYear()} Gestify. All rights reserved.
            </p>
            <p className="text-[10px] italic">
              This is your personalized news edition based on your selected preferences.
            </p>
          </div>
        </footer>
      </div>

      {/* Page fold effect */}
      <div className="newspaper-fold h-1 w-full"></div>
    </div>
  )
}
