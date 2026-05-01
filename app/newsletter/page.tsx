'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface NewsItem {
  id: string
  title: string
  subtitle?: string
  category: string
  content: string
  image?: string
  featured?: boolean
  date: string
}

const NEWSLETTER_DATA: NewsItem[] = [
  {
    id: '1',
    title: 'Global Markets Surge as Economic Outlook Brightens',
    subtitle: 'Investors respond positively to latest quarterly reports',
    category: 'BUSINESS',
    content: 'Major stock indices reached new heights today as investors gained confidence in the global economic recovery. The surge was driven by better-than-expected corporate earnings and optimistic guidance from tech giants.',
    featured: true,
    date: 'March 15, 2025'
  },
  {
    id: '2',
    title: 'New Climate Accord Signed by 150 Nations',
    subtitle: 'Historic agreement aims to reduce emissions by 60% within decade',
    category: 'INTERNATIONAL',
    content: 'In a landmark moment for global environmental policy, 150 nations have committed to an ambitious new climate framework designed to accelerate the transition to renewable energy sources.',
    date: 'March 14, 2025'
  },
  {
    id: '3',
    title: 'Tech Innovation Transforms Healthcare Industry',
    subtitle: 'Artificial intelligence and machine learning drive medical breakthroughs',
    category: 'TECHNOLOGY',
    content: 'Cutting-edge technology continues to revolutionize patient care with new diagnostic tools and treatment options becoming available to hospitals worldwide.',
    date: 'March 13, 2025'
  },
  {
    id: '4',
    title: 'Championship Team Secures Historic Victory',
    subtitle: 'Final match displays exceptional skill and determination',
    category: 'SPORTS',
    content: 'In an thrilling finale, the championship team emerged victorious with a commanding performance. The match will be remembered as one of the greatest sporting events of our time.',
    date: 'March 12, 2025'
  },
  {
    id: '5',
    title: 'Education Reform Initiative Launched Nationwide',
    subtitle: 'New framework aims to improve literacy and numeracy outcomes',
    category: 'EDUCATION',
    content: 'The government has unveiled a comprehensive education reform program targeting improved student outcomes across all levels of schooling.',
    date: 'March 11, 2025'
  },
  {
    id: '6',
    title: 'Entertainment Industry Celebrates Golden Age',
    subtitle: 'Record viewership for streaming platforms and theatrical releases',
    category: 'ENTERTAINMENT',
    content: 'The entertainment industry is experiencing unprecedented growth with audiences consuming more content than ever before across multiple platforms.',
    date: 'March 10, 2025'
  }
]

export default function NewsletterPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Paper texture background and container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        {/* Masthead Section */}
        <div className="mb-8 md:mb-12 text-center relative">
          {/* Decorative top border */}
          <div className="absolute -top-4 left-0 right-0 h-1 bg-primary"></div>
          
          <header className="newspaper-masthead">
            <h1 className="text-5xl md:text-7xl font-serif font-black text-primary tracking-widest">
              GESTIFY
            </h1>
            <p className="text-xs md:text-sm tracking-[0.2em] text-primary font-sans mt-2 uppercase">
              Your Daily News Gazette
            </p>
            <p className="text-xs text-muted-foreground font-sans tracking-widest mt-3 uppercase">
              Thursday, March 15, 2025 | Edition 1,847
            </p>
          </header>
          
          {/* Decorative divider line */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex-1 h-px bg-secondary"></div>
            <span className="text-2xl text-primary">✦</span>
            <div className="flex-1 h-px bg-secondary"></div>
          </div>
        </div>

        {/* Featured Story Section */}
        <section className="mb-12 md:mb-16">
          <div className="newspaper-section bg-card border-l-8 border-accent p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <p className="newspaper-date text-accent uppercase font-bold mb-3">
                  {NEWSLETTER_DATA[0].category}
                </p>
                <h2 className="newspaper-headline text-4xl md:text-5xl mb-3">
                  {NEWSLETTER_DATA[0].title}
                </h2>
                {NEWSLETTER_DATA[0].subtitle && (
                  <p className="newspaper-subheadline text-lg md:text-xl text-secondary-foreground mb-4">
                    {NEWSLETTER_DATA[0].subtitle}
                  </p>
                )}
                <p className="text-sm text-muted-foreground mb-2">
                  {NEWSLETTER_DATA[0].date}
                </p>
                <p className="text-base leading-relaxed text-foreground mb-6 font-serif">
                  {NEWSLETTER_DATA[0].content}
                </p>
                <Link 
                  href={`/article/${NEWSLETTER_DATA[0].id}`}
                  className="inline-flex items-center gap-2 text-accent font-serif font-bold text-lg hover:gap-3 transition-all"
                >
                  Read Full Story <ChevronRight size={20} />
                </Link>
              </div>
              
              {/* Featured article accent box */}
              <div className="hidden md:flex items-center justify-center">
                <div className="w-full aspect-square bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-6xl font-serif font-bold text-accent/40">Ed.</p>
                    <p className="text-xs text-accent/60 uppercase tracking-wider mt-2">Featured Article</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content - Multi-column layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Wide stories */}
          <div className="md:col-span-2">
            <div className="space-y-8">
              {NEWSLETTER_DATA.slice(1, 4).map((item, index) => (
                <article key={item.id} className="pb-6">
                  {/* Column divider */}
                  {index > 0 && <div className="newspaper-divider"></div>}
                  
                  <div className="group cursor-pointer">
                    <p className="newspaper-date text-accent font-bold uppercase">
                      {item.category}
                    </p>
                    <Link href={`/article/${item.id}`}>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary mt-2 mb-2 leading-tight group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    {item.subtitle && (
                      <p className="text-sm md:text-base italic text-muted-foreground mb-3">
                        {item.subtitle}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.date}
                    </p>
                    <p className="text-sm leading-relaxed text-foreground line-clamp-3">
                      {item.content}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <aside className="md:border-l-2 md:border-secondary md:pl-6">
            <div className="space-y-6">
              {/* Section Header */}
              <div className="border-b-2 border-secondary pb-3 mb-6">
                <h2 className="text-xl font-serif font-bold text-primary uppercase tracking-wider">
                  In Brief
                </h2>
              </div>

              {/* Sidebar articles */}
              {NEWSLETTER_DATA.slice(4, 6).map((item) => (
                <article key={item.id} className="pb-4 border-b border-secondary last:border-b-0">
                  <Link href={`/article/${item.id}`} className="group">
                    <p className="text-xs font-bold text-accent uppercase mb-1">
                      {item.category}
                    </p>
                    <h4 className="text-sm font-serif font-bold text-primary group-hover:text-accent transition-colors mb-2 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {item.date}
                    </p>
                  </Link>
                </article>
              ))}

              {/* Advertisement/Spotlight box */}
              <div className="mt-8 pt-6 border-t-2 border-secondary">
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent p-4">
                  <p className="text-xs font-sans font-bold text-accent uppercase tracking-widest mb-2">
                    Latest Updates
                  </p>
                  <p className="text-sm font-serif text-foreground mb-4">
                    Stay informed with daily news summaries delivered to your inbox.
                  </p>
                  <button className="w-full py-2 px-3 bg-primary text-primary-foreground font-serif font-bold text-sm uppercase tracking-wider hover:bg-accent hover:text-foreground transition-colors">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer Section */}
        <footer className="mt-16 pt-8 border-t-4 border-primary">
          <div className="grid md:grid-cols-4 gap-8 text-center md:text-left mb-8">
            <div>
              <h5 className="font-serif font-bold text-primary mb-2 uppercase text-sm">Categories</h5>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><Link href="#" className="hover:text-accent">Business</Link></li>
                <li><Link href="#" className="hover:text-accent">Technology</Link></li>
                <li><Link href="#" className="hover:text-accent">Sports</Link></li>
                <li><Link href="#" className="hover:text-accent">International</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-serif font-bold text-primary mb-2 uppercase text-sm">Resources</h5>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><Link href="#" className="hover:text-accent">Archive</Link></li>
                <li><Link href="#" className="hover:text-accent">Subscribe</Link></li>
                <li><Link href="#" className="hover:text-accent">Contact</Link></li>
                <li><Link href="#" className="hover:text-accent">Advertise</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-serif font-bold text-primary mb-2 uppercase text-sm">About</h5>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><Link href="#" className="hover:text-accent">Our Story</Link></li>
                <li><Link href="#" className="hover:text-accent">Team</Link></li>
                <li><Link href="#" className="hover:text-accent">Careers</Link></li>
                <li><Link href="#" className="hover:text-accent">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-serif font-bold text-primary mb-2 uppercase text-sm">Connect</h5>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><Link href="#" className="hover:text-accent">Twitter</Link></li>
                <li><Link href="#" className="hover:text-accent">Facebook</Link></li>
                <li><Link href="#" className="hover:text-accent">Instagram</Link></li>
                <li><Link href="#" className="hover:text-accent">LinkedIn</Link></li>
              </ul>
            </div>
          </div>

          {/* Copyright and footer info */}
          <div className="border-t border-secondary pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
              <p>© 2025 Gestify News Gazette. All rights reserved.</p>
              <div className="flex gap-6 text-center">
                <Link href="#" className="hover:text-primary">Terms of Service</Link>
                <Link href="#" className="hover:text-primary">Privacy Policy</Link>
                <Link href="#" className="hover:text-primary">Cookie Settings</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
