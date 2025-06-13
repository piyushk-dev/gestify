import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AIExplainer from "../components/ui/ai-explainer"
import { TopBar } from "@/components/ui/topbar"
export default function Home() {
  // Mock news data
  const featuredNews = {
    title: "Global Climate Summit Reaches Historic Agreement",
    excerpt:
      "World leaders have agreed on unprecedented measures to combat climate change in what experts are calling a turning point for environmental policy.",
    category: "World",
    date: "May 3, 2025",
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=600",
  }

  const latestNews = [
    {
      id: 1,
      title: "Tech Giants Announce Collaboration on AI Safety Standards",
      excerpt:
        "Major technology companies have formed an alliance to establish industry-wide safety protocols for artificial intelligence development.",
      category: "Technology",
      date: "May 3, 2025",
      readTime: "4 min read",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      title: "Global Markets React to Central Bank Policy Shifts",
      excerpt:
        "Stock markets worldwide showed volatility as multiple central banks signaled changes to interest rate policies.",
      category: "Economy",
      date: "May 3, 2025",
      readTime: "3 min read",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: "New Study Reveals Breakthrough in Renewable Energy Storage",
      excerpt:
        "Researchers have developed a novel battery technology that could solve long-standing energy storage challenges.",
      category: "Science",
      date: "May 2, 2025",
      readTime: "6 min read",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const trendingNews = [
    {
      id: 1,
      title: "Healthcare Reform Bill Passes with Bipartisan Support",
      excerpt:
        "After months of negotiation, the comprehensive healthcare reform package has been approved by lawmakers from both parties.",
      category: "Politics",
      date: "May 3, 2025",
      readTime: "4 min read",
    },
    {
      id: 2,
      title: "Film Festival Announces Surprising Award Winners",
      excerpt:
        "The international film community was stunned by several unexpected choices for this year's prestigious cinema awards.",
      category: "Entertainment",
      date: "May 2, 2025",
      readTime: "3 min read",
    },
    {
      id: 3,
      title: "Major Sports League Expands to New International Markets",
      excerpt:
        "In a historic move, the league has announced plans to establish teams in three new countries starting next season.",
      category: "Sports",
      date: "May 2, 2025",
      readTime: "5 min read",
    },
    {
      id: 4,
      title: "Archaeologists Uncover Ancient City in Unexpected Location",
      excerpt:
        "The discovery challenges previous understanding of historical trade routes and cultural exchanges in the region.",
      category: "Science",
      date: "May 1, 2025",
      readTime: "7 min read",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top bar with date and subscription info */}
      <TopBar />

      {/* Main header with logo and navigation */}


      <main className="container mx-auto px-4 py-8">
        {/* Featured article */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-red-700 text-white px-2 py-1 text-xs font-bold mb-3">
                {featuredNews.category}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                {featuredNews.title}
              </h1>
              <p className="text-gray-700 text-base md:text-lg mb-4">{featuredNews.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>{featuredNews.date}</span>
                <span className="mx-2">•</span>
                <span>{featuredNews.readTime}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button className="bg-black hover:bg-gray-800 text-white">Read Full Article</Button>
                <Button variant="outline">Save for Later</Button>
              </div>
              <div className="mt-4 text-sm">
                <span className="font-medium">Sources:</span> Reuters, AP News, Bloomberg
              </div>
            </div>
            <div className="relative h-[250px] md:h-[400px] w-full">
              <Image
                src={featuredNews.image || "/placeholder.svg"}
                alt={featuredNews.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* AI Explanation Section */}
        <AIExplainer />

        {/* Latest News Section */}
        <section className="mb-12">
          <div className="border-b-2 border-black mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold inline-block border-b-4 border-black pb-2 -mb-[2px]">
              Latest News
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {latestNews.map((article) => (
              <div key={article.id} className="border-b pb-6">
                <div className="relative h-[180px] w-full mb-4">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                </div>
                <span className="inline-block bg-gray-200 px-2 py-1 text-xs font-medium mb-2">{article.category}</span>
                <h3 className="font-serif text-lg md:text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-gray-700 mb-3 text-xs md:text-sm">{article.excerpt}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
                <div className="mt-2 text-xs">
                  <span className="font-medium">Sources:</span> NYT, Guardian, WSJ
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline" className="border-black text-black hover:bg-gray-100">
              View More Articles
            </Button>
          </div>
        </section>

        {/* Trending Section */}
        <section className="mb-12">
          <div className="border-b-2 border-black mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold inline-block border-b-4 border-black pb-2 -mb-[2px]">
              Trending Now
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {trendingNews.map((article) => (
              <div key={article.id} className="flex border-b pb-4">
                <div className="mr-4 text-3xl font-serif font-bold text-gray-300">{article.id}</div>
                <div>
                  <span className="inline-block bg-gray-200 px-2 py-1 text-xs font-medium mb-2">
                    {article.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold mb-2">{article.title}</h3>
                  <p className="text-gray-700 mb-2 text-sm">{article.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="bg-gray-100 p-8 border border-gray-300 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl font-bold mb-4">Get Your Personalized Daily Briefing</h2>
            <p className="text-gray-700 mb-6">
              Subscribe to receive a daily email with news tailored to your interests, summarized by AI from multiple
              trusted sources.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Button className="bg-black hover:bg-gray-800 text-white">Subscribe</Button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to our Terms of Service and Privacy Policy. You can unsubscribe at any time.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-serif text-xl font-bold mb-4">Gestify</h3>
              <p className="text-gray-400 text-sm">
                AI-powered news aggregation and summarization from trusted sources worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Sections</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/world" className="hover:text-white">
                    World
                  </Link>
                </li>
                <li>
                  <Link href="/business" className="hover:text-white">
                    Business
                  </Link>
                </li>
                <li>
                  <Link href="/technology" className="hover:text-white">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link href="/science" className="hover:text-white">
                    Science
                  </Link>
                </li>
                <li>
                  <Link href="/health" className="hover:text-white">
                    Health
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/advertise" className="hover:text-white">
                    Advertise
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/accessibility" className="hover:text-white">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Gestify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
