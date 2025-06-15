import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, FileText, Smartphone } from "lucide-react"
import { verifyToken } from "@/lib/auth"
import { sql } from "@/lib/postgres"
import { connectToMongo } from "@/lib/mongodb"

const CATEGORIES = [
  "trending",
  "politics",
  "horoscope",
  "career and jobs",
  "sports/chess",
  "international",
  "tech",
  "sports/cricket",
  "education",
]

const ZODIAC_SIGNS = [
  { sign: "aries", symbol: "♈", dates: "Mar 21 - Apr 19", element: "Fire" },
  { sign: "taurus", symbol: "♉", dates: "Apr 20 - May 20", element: "Earth" },
  { sign: "gemini", symbol: "♊", dates: "May 21 - Jun 20", element: "Air" },
  { sign: "cancer", symbol: "♋", dates: "Jun 21 - Jul 22", element: "Water" },
  { sign: "leo", symbol: "♌", dates: "Jul 23 - Aug 22", element: "Fire" },
  { sign: "virgo", symbol: "♍", dates: "Aug 23 - Sep 22", element: "Earth" },
  { sign: "libra", symbol: "♎", dates: "Sep 23 - Oct 22", element: "Air" },
  { sign: "scorpio", symbol: "♏", dates: "Oct 23 - Nov 21", element: "Water" },
  { sign: "sagittarius", symbol: "♐", dates: "Nov 22 - Dec 21", element: "Fire" },
  { sign: "capricorn", symbol: "♑", dates: "Dec 22 - Jan 19", element: "Earth" },
  { sign: "aquarius", symbol: "♒", dates: "Jan 20 - Feb 18", element: "Air" },
  { sign: "pisces", symbol: "♓", dates: "Feb 19 - Mar 20", element: "Water" },
]

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function getSentimentStyling(sentiment: string) {
  switch (sentiment.toLowerCase()) {
    case "positive":
      return {
        bgClass: "bg-gradient-to-r from-green-100 to-emerald-100",
        textClass: "text-green-800",
        borderClass: "border-green-400 border-2",
        icon: "📈",
        emoji: "🟢",
        label: "POSITIVE OUTLOOK",
        accentColor: "green-500",
      }
    case "negative":
      return {
        bgClass: "bg-gradient-to-r from-red-100 to-rose-100",
        textClass: "text-red-800",
        borderClass: "border-red-400 border-2",
        icon: "📉",
        emoji: "🔴",
        label: "NEGATIVE",
        accentColor: "red-500",
      }
    case "neutral":
      return {
        bgClass: "bg-gradient-to-r from-gray-100 to-slate-100",
        textClass: "text-gray-800",
        borderClass: "border-gray-400 border-2",
        icon: "📊",
        emoji: "⚪",
        label: "NEUTRAL STANCE",
        accentColor: "gray-500",
      }
    default:
      return {
        bgClass: "bg-gradient-to-r from-blue-100 to-indigo-100",
        textClass: "text-blue-800",
        borderClass: "border-blue-400 border-2",
        icon: "📰",
        emoji: "🔵",
        label: "ANALYSIS",
        accentColor: "blue-500",
      }
  }
}

function getSentimentClass(sentiment: string): string {
  switch (sentiment.toLowerCase()) {
    case "positive":
      return "text-green-700"
    case "negative":
      return "text-red-700"
    default:
      return "text-gray-600"
  }
}

function getZodiacInfo(sign: string) {
  return ZODIAC_SIGNS.find((z) => z.sign.toLowerCase() === sign.toLowerCase()) || ZODIAC_SIGNS[0]
}

// Server-side mobile detection
async function isMobileDevice() {
  const headersList = await headers()
  const userAgent = headersList.get("user-agent") || ""

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
}

async function fetchCategoryData(category: string) {
  const client = await connectToMongo()
  const db = client.db()

  switch (category) {
    case "trending":
      const trendingDocs = await db
        .collection("trendings")
        .find({ date: { $type: "date" } })
        .sort({ date: -1 })
        .limit(20)
        .toArray()

      return trendingDocs.map((doc, index) => {
        const words = doc.story_summary?.split(/\s+/).length || 0
        const readTime = Math.max(1, Math.ceil(words / 200)) + " min read"
        return {
          id: doc._id?.toString() || index,
          title: doc.title,
          excerpt: doc.story_summary,
          fullContent: doc.story_summary,
          link: doc.link,
          date: new Date(doc.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          readTime,
          tags: doc.tags?.map(capitalize) || ["Trending"],
          sentiment:
            typeof doc.sentiment === "string"
              ? capitalize(doc.sentiment)
              : capitalize(doc.sentiment?.label || "Neutral"),
          image: doc.image || "/placeholder.svg?height=400&width=600",
          source: "Livemint",
          category: "Trending",
        }
      })

    case "politics":
      const politicsDocs = await db
        .collection("politics")
        .find({ date: { $type: "date" } })
        .sort({ date: -1 })
        .limit(15)
        .toArray()

      return politicsDocs.map((doc, index) => {
        const words = doc.story_summary?.split(/\s+/).length || 0
        const readTime = Math.max(1, Math.ceil(words / 150)) + " min read"
        const sentimentLabel = typeof doc.sentiment?.label === "string" ? capitalize(doc.sentiment.label) : "Neutral"

        return {
          id: doc._id?.toString() || index,
          title: doc.title,
          excerpt: doc.story_summary,
          fullContent: doc.story_summary,
          link: doc.link,
          date: new Date(doc.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          readTime,
          tags: doc.tags?.map(capitalize) || ["Politics"],
          sentiment: sentimentLabel,
          sentimentClass: getSentimentClass(sentimentLabel),
          sources:
            doc.source_articles?.map((src: any) => ({
              name: src.source_name,
              url: src.url,
            })) || [],
          image: doc.image || "/placeholder.svg?height=400&width=600",
          category: "Politics",
        }
      })

    case "tech":
      const techDocs = await db
        .collection("teches")
        .find({ date: { $type: "date" } })
        .sort({ date: -1 })
        .limit(15)
        .toArray()

      return techDocs.map((doc, index) => {
        const words = doc.story_summary?.split(/\s+/).length || 0
        const readTime = Math.max(1, Math.ceil(words / 200)) + " min read"

        return {
          id: index + 1,
          title: doc.title,
          excerpt: doc.story_summary,
          fullContent: doc.story_summary,
          category: doc.tags?.[0] || "Technology",
          tags: doc.tags?.map(capitalize) || ["Technology"],
          date: new Date(doc.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          readTime,
          image: doc.image || "/placeholder.svg?height=400&width=600",
          sources: ["Gadgets360"],
          link: doc.link,
        }
      })

    case "international":
      const intlDocs = await db
        .collection("internationals")
        .find({ date: { $type: "date" } })
        .sort({ date: -1 })
        .limit(15)
        .toArray()

      return intlDocs.map((doc, index) => {
        const words = doc.story_summary?.split(/\s+/).length || 0
        const readTime = Math.max(1, Math.ceil(words / 200)) + " min read"

        return {
          id: index + 1,
          title: doc.title,
          excerpt: doc.story_summary,
          fullContent: doc.story_summary,
          category: doc.tags?.[0] || "International",
          tags: doc.tags?.map(capitalize) || ["International"],
          date: new Date(doc.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          readTime,
          image: doc.image || "/placeholder.svg?height=400&width=600",
          sources: ["TheHindu"],
          link: doc.link,
        }
      })

    case "sports/cricket":
      const cricketDocs = await db
        .collection("crickets")
        .find({ date: { $type: "date" } })
        .sort({ date: -1 })
        .limit(12)
        .toArray()

      return cricketDocs.map((doc, index) => {
        const words = doc.story_summary?.split(/\s+/).length || 0
        const readTime = Math.max(1, Math.ceil(words / 200)) + " min read"

        return {
          id: index + 1,
          title: doc.title,
          excerpt: doc.story_summary,
          fullContent: doc.story_summary,
          category: "Cricket",
          tags: doc.tags?.map(capitalize) || ["Cricket"],
          date: new Date(doc.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          readTime,
          image: doc.image || "/placeholder.svg?height=400&width=600",
          sources: ["CricBuzz"],
          link: doc.link,
        }
      })

    case "sports/chess":
      const chessDocs = await db
        .collection("chesses")
        .find({ date: { $type: "date" } })
        .sort({ date: -1 })
        .limit(12)
        .toArray()

      return chessDocs.map((doc, index) => {
        const words = doc.story_summary?.split(/\s+/).length || 0
        const readTime = Math.max(1, Math.ceil(words / 200)) + " min read"

        return {
          id: index + 1,
          title: doc.title,
          excerpt: doc.story_summary,
          fullContent: doc.story_summary,
          category: "Chess",
          tags: doc.tags?.map(capitalize) || ["Chess"],
          date: new Date(doc.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          readTime,
          image: doc.image || "/placeholder.svg?height=400&width=600",
          sources: ["CricBuzz"],
          link: doc.link,
        }
      })

    case "education":
      const eduDocs = await db
        .collection("educations")
        .find({ date: { $type: "date" } })
        .sort({ date: -1 })
        .limit(15)
        .toArray()

      return eduDocs.map((doc, index) => {
        const words = doc.story_summary?.split(/\s+/).length || 0
        const readTime = Math.max(1, Math.ceil(words / 150)) + " min read"

        return {
          id: index + 1,
          title: doc.title,
          excerpt: doc.story_summary,
          fullContent: doc.story_summary,
          category: "Education",
          tags: doc.tags?.map(capitalize) || ["Education"],
          date: new Date(doc.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          readTime,
          image: doc.image || "/placeholder.svg?height=400&width=600",
          sources: ["Hindustan Times"],
          link: doc.link,
        }
      })

    case "career and jobs":
      const jobDocs = await db
        .collection("careerjobs")
        .find({ date: { $type: "date" } })
        .sort({ date: -1 })
        .limit(15)
        .toArray()

      return jobDocs.map((doc, index) => {
        const words = doc.story_summary?.split(/\s+/).length || 0
        const readTime = Math.max(1, Math.ceil(words / 150)) + " min read"

        return {
          id: index + 1,
          title: doc.title,
          excerpt: doc.story_summary,
          fullContent: doc.story_summary,
          category: "Career & Jobs",
          tags: doc.tags?.map(capitalize) || ["Career"],
          date: new Date(doc.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          readTime,
          image: doc.image || "/placeholder.svg?height=400&width=600",
          sources: ["Hindustan Times"],
          link: doc.link,
        }
      })

    case "horoscope":
      const horoscopeDocs = await db
        .collection("horoscopes")
        .find({ date: { $type: "date" } })
        .sort({ date: -1 })
        .limit(12)
        .toArray()

      return horoscopeDocs.map((doc, index) => {
        const words = doc.story_summary?.split(/\s+/).length || 0
        const readTime = Math.max(1, Math.ceil(words / 200)) + " min read"

        return {
          id: doc._id?.toString() || index,
          title: doc.title,
          excerpt: doc.story_summary,
          fullContent: doc.story_summary,
          link: doc.link,
          date: new Date(doc.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          readTime,
          tags: doc.tags?.map(capitalize) || [],
          sign: capitalize(doc.sign || "Zodiac"),
          source: "Hindustan Times",
          category: "Horoscope",
        }
      })

    default:
      return []
  }
}

export default async function NewsletterPage() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) redirect("/login")

  const decoded = await verifyToken(accessToken, "access")

  const rows = await sql<any>`
    SELECT preferences, preference_enabled
    FROM users 
    WHERE email = ${decoded.email}
  `

  if (!rows.length) redirect("/login")

  const bitString: string = rows[0].preferences
  const consent: boolean = rows[0].preference_enabled

  if (!consent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Newsletter Preferences Required</h1>
          <p className="mb-4 text-lg">Please enable your newsletter preferences to view your personalized news.</p>
          <Button asChild>
            <Link href="/preferences">Update Preferences</Link>
          </Button>
        </div>
      </div>
    )
  }

  const savedPrefs = CATEGORIES.filter((_, idx) => bitString[idx] === "1")

  if (savedPrefs.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">No Categories Selected</h1>
          <p className="mb-4 text-lg">Please select at least one category to view your personalized newsletter.</p>
          <Button asChild>
            <Link href="/preferences">Select Categories</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Fetch data for all selected categories
  const categoryData: Record<string, any[]> = {}
  for (const category of savedPrefs) {
    categoryData[category] = await fetchCategoryData(category)
  }

  // Get all articles and sort by date for main headlines
  const allArticles = Object.values(categoryData)
    .flat()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const mainHeadline = allArticles[0]
  const secondaryHeadline = allArticles[1]
  const moreStories = allArticles.slice(2, 8)

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Server-side mobile detection
  const isMobile = await isMobileDevice()

  // Mobile View - PDF Download Option
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Mobile Header */}
          <div className="text-center mb-8">
            <div className="bg-black text-white px-4 py-2 rounded-lg mb-4 inline-block">
              <span className="text-sm font-medium">{today}</span>
            </div>
            <h1 className="font-serif text-4xl font-black mb-2 text-gray-900">📰 GESTIFY NEWS</h1>
            <p className="text-sm text-gray-600 mb-4">Your Daily Personalized News Digest</p>
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-6">
              <p className="text-xs text-gray-700">
                📊 {allArticles.length} articles from {savedPrefs.length} categories
              </p>
            </div>
          </div>

          {/* Mobile Optimization Notice */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6 shadow-lg">
            <div className="text-center">
              <Smartphone className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-3">📱 Mobile-Optimized Experience</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our full newspaper layout is optimized for desktop viewing. For the best mobile experience, download
                your personalized newspaper as a beautifully formatted PDF.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">📄 PDF Features:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✅ Professional newspaper layout</li>
                  <li>✅ Proper page breaks (no cut-off articles)</li>
                  <li>✅ High-quality formatting</li>
                  <li>✅ Offline reading capability</li>
                  <li>✅ Easy sharing and printing</li>
                </ul>
              </div>

              <form action="/api/generate-pdf" method="POST">
                <input
                  type="hidden"
                  name="data"
                  value={JSON.stringify({
                    savedPrefs,
                    categoryData,
                    allArticles,
                    today,
                    mainHeadline,
                    secondaryHeadline,
                    moreStories,
                  })}
                />
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Today's Edition
                </Button>
              </form>
            </div>
          </div>

          {/* Quick Preview */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-lg mb-3 text-center">📰 Today's Headlines Preview</h3>
            {mainHeadline && (
              <div className="border-l-4 border-red-500 pl-4 mb-4">
                <h4 className="font-serif text-lg font-bold mb-2">{mainHeadline.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{mainHeadline.fullContent?.substring(0, 150)}...</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded mr-2">{mainHeadline.category}</span>
                  <span>{mainHeadline.date}</span>
                </div>
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">
                + {allArticles.length - 1} more articles in your personalized edition
              </p>
              <form action="/api/generate-pdf" method="POST">
                <input
                  type="hidden"
                  name="data"
                  value={JSON.stringify({
                    savedPrefs,
                    categoryData,
                    allArticles,
                    today,
                    mainHeadline,
                    secondaryHeadline,
                    moreStories,
                  })}
                />
                <Button type="submit" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                  <FileText className="mr-2 h-4 w-4" />
                  Get Full Edition
                </Button>
              </form>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold text-center mb-4">🔗 Quick Actions</h3>
            <div className="space-y-2">
              <Link
                href="/preferences"
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 py-3 px-4 rounded-lg font-medium transition-colors"
              >
                ⚙️ Manage Preferences
              </Link>
              <Link
                href="/"
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 py-3 px-4 rounded-lg font-medium transition-colors"
              >
                🏠 Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Desktop View - Full Newspaper Layout (your existing code)
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-8 py-12 max-w-8xl xl:max-w-9xl 2xl:max-w-none 2xl:w-[95%]">
        <div className="bg-white shadow-sm border border-gray-100 p-8 md:p-12">
          {/* PDF Download Button for Desktop */}
          <div className="fixed top-4 right-4 z-50">
            <form action="/api/generate-pdf" method="POST">
              <input
                type="hidden"
                name="data"
                value={JSON.stringify({
                  savedPrefs,
                  categoryData,
                  allArticles,
                  today,
                  mainHeadline,
                  secondaryHeadline,
                  moreStories,
                })}
              />
              {/* <Button */}
                {/* type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
              > */}
                {/* <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button> */}
            </form>
          </div>

          {/* Enhanced Traditional Newspaper Header */}
          <div className="border-b-4 border-black pb-4 mb-8 bg-gradient-to-b from-gray-50 to-white">
            <div className="flex justify-between items-center text-sm mb-3">
              <span className="font-medium bg-black text-white px-2 py-1">{today}</span>
              <span className="font-medium bg-red-600 text-white px-2 py-1">PERSONALIZED EDITION</span>
            </div>
            <h1 className="font-serif text-8xl md:text-9xl font-black text-center tracking-tight mb-2 bg-gradient-to-b from-black to-gray-700 bg-clip-text text-transparent">
              GESTIFY NEWS
            </h1>
            <div className="border-t-2 border-b-2 border-black py-2">
              <p className="text-center text-sm font-medium tracking-widest uppercase">
                Your Daily Personalized News Digest
              </p>
            </div>
            <div className="text-center text-xs mt-2 text-gray-600 bg-yellow-100 py-1 border border-yellow-300">
              📊 Curated from {savedPrefs.length} selected categories • {allArticles.length} articles today • AI-Powered
              Sentiment Analysis
            </div>
          </div>

          {/* Rest of your existing desktop layout code... */}
          {/* I'll keep the rest of the desktop layout exactly as it was */}

          {/* Main Headlines Section */}
          {mainHeadline && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Main headline - 2/3 width */}
              <div className="md:col-span-2 border-r-2 border-black pr-8">
                <div className="mb-4 flex flex-col gap-3">
                  <span className="inline-block bg-gray-800 text-white px-2 py-1 text-xs font-medium uppercase tracking-wide">
                    {mainHeadline.category} • Breaking News
                  </span>

                  {/* Enhanced Sentiment Display for Main Headline */}
                  {mainHeadline.sentiment && (
                    <div
                      className={`${getSentimentStyling(mainHeadline.sentiment).bgClass} ${getSentimentStyling(mainHeadline.sentiment).borderClass} p-4 rounded-lg shadow-lg`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{getSentimentStyling(mainHeadline.sentiment).icon}</span>
                          <div>
                            <div
                              className={`${getSentimentStyling(mainHeadline.sentiment).textClass} font-bold text-lg`}
                            >
                              {getSentimentStyling(mainHeadline.sentiment).label}
                            </div>
                            <div className="text-sm text-gray-600">Market Sentiment Analysis</div>
                          </div>
                        </div>
                        <div className="text-4xl">{getSentimentStyling(mainHeadline.sentiment).emoji}</div>
                      </div>
                    </div>
                  )}
                </div>

                <h2 className="font-serif text-5xl font-bold leading-tight mb-6">{mainHeadline.title}</h2>

                <div className="relative h-64 w-full mb-6 border-4 border-black shadow-lg">
                  <Image
                    src={mainHeadline.image || "/placeholder.svg"}
                    alt={mainHeadline.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Full Content Display */}
                <div className="bg-gray-50 border-l-4 border-black p-4 mb-6">
                  <h4 className="font-bold text-lg mb-2">📰 COMPLETE STORY</h4>
                  <p className="text-lg leading-relaxed font-medium">{mainHeadline.fullContent}</p>
                </div>

                <p className="text-base leading-relaxed mb-6 italic">
                  This developing story continues to unfold as experts analyze the implications and stakeholders respond
                  to the latest developments. Our newsroom is monitoring the situation closely and will provide updates
                  as they become available.
                </p>

                <div className="border-t-2 border-gray-300 pt-4 mb-6">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div>
                      <span className="font-semibold">📅 Published:</span> {mainHeadline.date} •
                      <span className="font-semibold ml-2">⏱️ Reading Time:</span> {mainHeadline.readTime}
                    </div>
                  </div>
                  {mainHeadline.sources && (
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">📰 Sources:</span>{" "}
                      {Array.isArray(mainHeadline.sources) ? mainHeadline.sources.join(", ") : mainHeadline.sources}
                    </div>
                  )}
                </div>

                {/* Enhanced Complete Story Button */}
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-4 border-black p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xl mb-2">🔗 READ COMPLETE COVERAGE</h4>
                      <p className="text-sm text-gray-700 mb-2">
                        Get the full story with detailed analysis, expert opinions, and latest updates from our trusted
                        sources.
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>✅ Verified Sources</span>
                        <span>•</span>
                        <span>🔄 Live Updates</span>
                        <span>•</span>
                        <span>📊 Data Analysis</span>
                      </div>
                    </div>
                    {mainHeadline.link && (
                      <Link
                        href={mainHeadline.link}
                        target="_blank"
                        className="bg-black text-white px-6 py-4 text-lg font-bold uppercase tracking-wide hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        READ FULL STORY ➤
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Secondary headline - 1/3 width */}
              {secondaryHeadline && (
                <div className="md:col-span-1">
                  <div className="mb-4 flex flex-col gap-2">
                    <span className="inline-block bg-gray-600 text-white px-2 py-1 text-xs font-medium uppercase">
                      {secondaryHeadline.category}
                    </span>

                    {/* Enhanced Sentiment for Secondary */}
                    {secondaryHeadline.sentiment && (
                      <div
                        className={`${getSentimentStyling(secondaryHeadline.sentiment).bgClass} ${getSentimentStyling(secondaryHeadline.sentiment).borderClass} p-3 rounded`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getSentimentStyling(secondaryHeadline.sentiment).icon}</span>
                          <div
                            className={`${getSentimentStyling(secondaryHeadline.sentiment).textClass} font-bold text-sm`}
                          >
                            {getSentimentStyling(secondaryHeadline.sentiment).label}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl font-bold mb-4">{secondaryHeadline.title}</h3>

                  <div className="relative h-40 w-full mb-4 border-2 border-black">
                    <Image
                      src={secondaryHeadline.image || "/placeholder.svg"}
                      alt={secondaryHeadline.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Full Content for Secondary */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4">
                    <p className="text-base leading-relaxed">{secondaryHeadline.fullContent}</p>
                  </div>

                  <div className="border-t border-gray-300 pt-3 mb-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">📅 Date:</span> {secondaryHeadline.date}
                    </div>
                  </div>

                  {/* Complete Story Button for Secondary */}
                  <div className="bg-blue-100 border-2 border-blue-400 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm">📖 Full Coverage</span>
                        <p className="text-xs text-gray-600">Complete story available</p>
                      </div>
                      {secondaryHeadline.link && (
                        <Link
                          href={secondaryHeadline.link}
                          target="_blank"
                          className="bg-blue-600 text-white px-4 py-2 text-sm font-bold uppercase tracking-wide hover:bg-blue-700 transition-colors"
                        >
                          READ MORE ➤
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Continue with the rest of your existing desktop layout... */}
          {/* I'll include all the remaining sections exactly as they were */}

          {/* More Stories Section */}
          {moreStories.length > 0 && (
            <div className="border-t-4 border-black pt-6 mb-12">
              <h3 className="font-serif text-4xl font-bold mb-6 text-center">
                <span className="bg-black text-white px-4 py-2">MORE HEADLINES</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {moreStories.map((story, index) => (
                  <div key={index} className="border-t-2 border-gray-400 pt-4 bg-gray-50 p-4">
                    <div className="mb-3 flex flex-col gap-2">
                      <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 text-xs font-medium uppercase mb-1 border border-gray-300">
                        {story.category}
                      </span>

                      {/* Enhanced Sentiment for More Stories */}
                      {story.sentiment && (
                        <div
                          className={`${getSentimentStyling(story.sentiment).bgClass} ${getSentimentStyling(story.sentiment).borderClass} p-2 rounded`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{getSentimentStyling(story.sentiment).icon}</span>
                            <div className={`${getSentimentStyling(story.sentiment).textClass} font-bold text-xs`}>
                              {getSentimentStyling(story.sentiment).label}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <h4 className="font-serif text-xl font-bold mb-3 leading-tight">{story.title}</h4>

                    {/* Full Content Display */}
                    <div className="bg-white border border-gray-300 p-3 mb-3">
                      <p className="text-base leading-relaxed">{story.fullContent}</p>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                      📅 {story.date} • ⏱️ {story.readTime}
                    </div>

                    {/* Complete Story Button for More Stories */}
                    <div className="bg-yellow-100 border-2 border-yellow-400 p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-sm">🔗 Complete Article</span>
                          <p className="text-xs text-gray-600">Full story with details</p>
                        </div>
                        {story.link && (
                          <Link
                            href={story.link}
                            target="_blank"
                            className="bg-yellow-600 text-white px-3 py-2 text-xs font-bold uppercase tracking-wide hover:bg-yellow-700 transition-colors"
                          >
                            READ FULL ➤
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Sections */}
          {savedPrefs.map((category) => {
            const articles = categoryData[category]
            if (!articles || articles.length === 0) return null

            const categoryDisplayName = category.replace(/\//g, " & ").toUpperCase()

            return (
              <div key={category} className="border-t-4 border-black pt-8 mb-16">
                {category === "horoscope" ? (
                  // Enhanced Horoscope Section
                  <div>
                    <div className="text-center mb-8">
                      <h3 className="font-serif text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ✦ DAILY HOROSCOPE ✦
                      </h3>
                      <div className="border-t-2 border-b-2 border-black py-2 mx-auto max-w-md bg-purple-50">
                        <p className="text-sm font-medium tracking-widest">🌟 CELESTIAL GUIDANCE FOR TODAY 🌟</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-b from-purple-50 to-indigo-50 border-4 border-black p-8 mb-8">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {ZODIAC_SIGNS.map((zodiacSign) => {
                          const horoscopeData = articles.find(
                            (article) => article.sign.toLowerCase() === zodiacSign.sign,
                          )

                          return (
                            <div
                              key={zodiacSign.sign}
                              className="bg-white border-2 border-black p-4 text-center hover:bg-purple-50 transition-colors shadow-lg"
                            >
                              <div className="text-4xl mb-2">{zodiacSign.symbol}</div>
                              <h4 className="font-serif text-lg font-bold mb-1 uppercase">{zodiacSign.sign}</h4>
                              <p className="text-xs text-gray-600 mb-2">{zodiacSign.dates}</p>
                              <div className="text-xs bg-purple-100 px-2 py-1 mb-3 border border-purple-300">
                                {zodiacSign.element}
                              </div>

                              {horoscopeData ? (
                                <div>
                                  <h5 className="font-bold text-sm mb-2">{horoscopeData.title}</h5>

                                  {/* Full Horoscope Content */}
                                  <div className="bg-purple-50 border border-purple-300 p-3 mb-3 text-left">
                                    <p className="text-sm leading-relaxed">{horoscopeData.fullContent}</p>
                                  </div>

                                  {/* Complete Story Button for Horoscope */}
                                  <div className="bg-purple-100 border border-purple-400 p-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-bold text-purple-800">🔮 Extended Reading</span>
                                      {horoscopeData.link && (
                                        <Link
                                          href={horoscopeData.link}
                                          target="_blank"
                                          className="bg-purple-600 text-white px-2 py-1 text-xs font-bold uppercase hover:bg-purple-700 transition-colors"
                                        >
                                          FULL ➤
                                        </Link>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <p className="text-sm text-gray-500 italic mb-3">
                                    Your stars are aligning. Check back tomorrow for guidance.
                                  </p>
                                  <div className="bg-gray-100 border border-gray-300 p-2">
                                    <span className="text-xs text-gray-600">No reading available today</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Additional Horoscope Articles */}
                    {articles.length > 0 && (
                      <div className="border-t-2 border-gray-400 pt-6">
                        <h4 className="font-serif text-3xl font-bold mb-6 text-center">🌙 ASTROLOGICAL INSIGHTS 🌙</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {articles.slice(0, 4).map((article, index) => (
                            <div key={index} className="border-l-4 border-purple-600 pl-6 bg-purple-50 p-4">
                              <h5 className="font-serif text-xl font-bold mb-3">{article.title}</h5>

                              {/* Full Content for Horoscope Articles */}
                              <div className="bg-white border border-purple-300 p-4 mb-4">
                                <p className="text-base leading-relaxed">{article.fullContent}</p>
                              </div>

                              <div className="text-sm text-gray-600 mb-4">
                                📅 {article.date} • ⏱️ {article.readTime}
                              </div>

                              {/* Complete Story Button */}
                              <div className="bg-purple-100 border-2 border-purple-400 p-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="font-bold text-sm text-purple-800">🌟 Complete Analysis</span>
                                    <p className="text-xs text-purple-600">Full astrological reading</p>
                                  </div>
                                  {article.link && (
                                    <Link
                                      href={article.link}
                                      target="_blank"
                                      className="bg-purple-600 text-white px-4 py-2 text-sm font-bold uppercase tracking-wide hover:bg-purple-700 transition-colors"
                                    >
                                      READ FULL ➤
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Enhanced Regular Category Sections
                  <div>
                    <h3 className="font-serif text-4xl font-bold mb-6 text-center">
                      <span className="bg-black text-white px-6 py-2">{categoryDisplayName}</span>
                    </h3>

                    {/* Featured Article for Category */}
                    {articles[0] && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 border-b-2 border-gray-400 pb-8 bg-gray-50 p-6">
                        <div>
                          <div className="mb-4 flex flex-col gap-3">
                            <span className="inline-block bg-red-500 text-white px-2 py-1 text-xs font-medium uppercase w-fit">
                              🔥 FEATURED STORY
                            </span>

                            {/* Enhanced Sentiment for Featured */}
                            {articles[0].sentiment && (
                              <div
                                className={`${getSentimentStyling(articles[0].sentiment).bgClass} ${getSentimentStyling(articles[0].sentiment).borderClass} p-4 rounded-lg`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{getSentimentStyling(articles[0].sentiment).icon}</span>
                                  <div>
                                    <div
                                      className={`${getSentimentStyling(articles[0].sentiment).textClass} font-bold`}
                                    >
                                      {getSentimentStyling(articles[0].sentiment).label}
                                    </div>
                                    <div className="text-xs text-gray-600">Sentiment Analysis</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <h4 className="font-serif text-3xl font-bold mb-4 leading-tight">{articles[0].title}</h4>

                          {/* Full Content Display */}
                          <div className="bg-white border-l-4 border-blue-500 p-4 mb-4">
                            <h6 className="font-bold text-sm mb-2">📰 COMPLETE STORY</h6>
                            <p className="text-lg leading-relaxed">{articles[0].fullContent}</p>
                          </div>

                          <div className="text-sm text-gray-600 mb-6">
                            <span className="font-semibold">📅 Published:</span> {articles[0].date} •
                            <span className="font-semibold ml-2">⏱️ Reading Time:</span> {articles[0].readTime}
                          </div>

                          {/* Enhanced Complete Story Button */}
                          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border-4 border-black p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h6 className="font-bold text-lg mb-1">🔗 COMPLETE COVERAGE</h6>
                                <p className="text-sm text-gray-700 mb-1">Read the full story with detailed analysis</p>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                  <span>✅ Verified</span>
                                  <span>•</span>
                                  <span>📊 Analysis</span>
                                  <span>•</span>
                                  <span>🔄 Updates</span>
                                </div>
                              </div>
                              {articles[0].link && (
                                <Link
                                  href={articles[0].link}
                                  target="_blank"
                                  className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-wide hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                                >
                                  READ FULL STORY ➤
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="relative h-64 md:h-full border-4 border-black">
                          <Image
                            src={articles[0].image || "/placeholder.svg"}
                            alt={articles[0].title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* Other Articles in Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {articles.slice(1, 10).map((article, index) => (
                        <div key={index} className="border-t-2 border-gray-300 pt-4 bg-gray-50 p-4">
                          <div className="mb-3 flex flex-col gap-2">
                            {article.tags &&
                              article.tags.slice(0, 2).map((tag: string, tagIndex: number) => (
                                <span
                                  key={tagIndex}
                                  className="inline-block bg-gray-50 text-gray-600 px-2 py-1 text-xs font-normal uppercase w-fit border border-gray-200"
                                >
                                  {tag}
                                </span>
                              ))}

                            {/* Enhanced Sentiment for Regular Articles */}
                            {article.sentiment && (
                              <div
                                className={`${getSentimentStyling(article.sentiment).bgClass} ${getSentimentStyling(article.sentiment).borderClass} p-2 rounded`}
                              >
                                <div className="flex items-center gap-2">
                                  <span>{getSentimentStyling(article.sentiment).icon}</span>
                                  <div
                                    className={`${getSentimentStyling(article.sentiment).textClass} font-bold text-xs`}
                                  >
                                    {getSentimentStyling(article.sentiment).label}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <h4 className="font-serif text-xl font-bold mb-3 leading-tight">{article.title}</h4>

                          {article.image && (
                            <div className="relative h-32 w-full mb-3 border-2 border-black">
                              <Image
                                src={article.image || "/placeholder.svg"}
                                alt={article.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}

                          {/* Full Content Display */}
                          <div className="bg-white border border-gray-300 p-3 mb-4">
                            <p className="text-base leading-relaxed">{article.fullContent}</p>
                          </div>

                          <div className="text-sm text-gray-600 mb-4">
                            📅 {article.date} • ⏱️ {article.readTime}
                          </div>

                          {/* Complete Story Button for Regular Articles */}
                          <div className="bg-green-100 border-2 border-green-400 p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-bold text-sm text-green-800">📖 Full Article</span>
                                <p className="text-xs text-green-600">Complete coverage available</p>
                              </div>
                              {article.link && (
                                <Link
                                  href={article.link}
                                  target="_blank"
                                  className="bg-green-600 text-white px-3 py-2 text-xs font-bold uppercase tracking-wide hover:bg-green-700 transition-colors"
                                >
                                  READ MORE ➤
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {/* Enhanced Subscription CTA */}
          <div className="border-4 border-black bg-gradient-to-r from-gray-100 to-gray-200 p-8 mb-12 shadow-lg">
            <div className="text-center">
              <h3 className="font-serif text-3xl font-bold mb-4">📰 STAY INFORMED</h3>
              <div className="border-t-2 border-b-2 border-black py-2 mb-4 bg-yellow-100">
                <p className="text-sm font-medium tracking-widest uppercase">Customize Your Daily News Experience</p>
              </div>
              <p className="text-lg mb-6">
                Update your preferences to receive more relevant news tailored to your interests.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-black hover:bg-gray-800 text-white font-bold uppercase tracking-wide transform hover:scale-105 transition-all"
                >
                  <Link href="/preferences">⚙️ MANAGE PREFERENCES</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-black text-black hover:bg-black hover:text-white font-bold uppercase tracking-wide transform hover:scale-105 transition-all"
                >
                  <Link href="/dashboard">🏠 BACK TO DASHBOARD</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Traditional Newspaper Footer */}
          <footer className="border-t-4 border-black pt-6 text-center bg-gray-50">
            <div className="mb-6">
              <h4 className="font-serif text-2xl font-bold mb-2">GESTIFY TIMES</h4>
              <div className="border-t border-b border-black py-1 mb-4 bg-yellow-100">
                <p className="text-sm font-medium tracking-widest uppercase">
                  📰 Established 2024 • Your Trusted News Source • AI-Powered
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-sm">
              <div>
                <h5 className="font-bold uppercase tracking-wide mb-3">📋 Your Subscriptions</h5>
                <div className="space-y-1">
                  {savedPrefs.map((pref, index) => (
                    <div key={index} className="text-gray-600 bg-gray-50 px-2 py-1 text-sm border border-gray-200">
                      {pref.replace(/\//g, " & ").toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-bold uppercase tracking-wide mb-3">📊 Today's Edition</h5>
                <div className="bg-white border border-gray-300 p-4">
                  <p className="text-gray-700">
                    <span className="font-bold text-2xl text-blue-600">{allArticles.length}</span> articles published
                    <br />
                    <span className="font-bold text-2xl text-green-600">{savedPrefs.length}</span> categories active
                    <br />
                    <span className="text-sm">🕒 Updated: {today}</span>
                  </p>
                </div>
              </div>

              <div>
                <h5 className="font-bold uppercase tracking-wide mb-3">🔗 Quick Links</h5>
                <div className="space-y-2">
                  <Link
                    href="/preferences"
                    className="block text-gray-700 hover:text-black font-medium bg-white px-2 py-1 border border-gray-300 hover:bg-gray-100"
                  >
                    ⚙️ Update Preferences
                  </Link>
                  <Link
                    href="/archive"
                    className="block text-gray-700 hover:text-black font-medium bg-white px-2 py-1 border border-gray-300 hover:bg-gray-100"
                  >
                    📚 News Archive
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-gray-700 hover:text-black font-medium bg-white px-2 py-1 border border-gray-300 hover:bg-gray-100"
                  >
                    📞 Contact Newsroom
                  </Link>
                  <Link
                    href="/unsubscribe"
                    className="block text-gray-700 hover:text-black font-medium bg-white px-2 py-1 border border-gray-300 hover:bg-gray-100"
                  >
                    ❌ Unsubscribe
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-black pt-4 text-sm text-gray-600 bg-white p-4">
              <p>© {new Date().getFullYear()} Gestify Times. All rights reserved.</p>
              <p className="mt-2">
                📰 This personalized edition is curated based on your selected preferences.
                <br />🔍 All articles are sourced from verified news outlets and enhanced with AI-powered sentiment
                analysis.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
