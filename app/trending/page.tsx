import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock trending news data
const trendingNews = [
  {
    id: 1,
    title: "Global Climate Summit Reaches Historic Agreement on Emissions",
    excerpt:
      "World leaders have agreed on unprecedented measures to combat climate change in what experts are calling a turning point for environmental policy.",
    category: "World",
    date: "May 3, 2025",
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=600",
    sources: ["Reuters", "AP News", "Bloomberg"],
    trending: 98,
  },
  {
    id: 2,
    title: "Tech Giants Announce Collaboration on AI Safety Standards",
    excerpt:
      "Major technology companies have formed an alliance to establish industry-wide safety protocols for artificial intelligence development.",
    category: "Technology",
    date: "May 3, 2025",
    readTime: "4 min read",
    image: "/placeholder.svg?height=300&width=400",
    sources: ["TechCrunch", "Wired", "The Verge"],
    trending: 95,
  },
  {
    id: 3,
    title: "Healthcare Reform Bill Passes with Bipartisan Support",
    excerpt:
      "After months of negotiation, the comprehensive healthcare reform package has been approved by lawmakers from both parties.",
    category: "Politics",
    date: "May 3, 2025",
    readTime: "4 min read",
    image: "/placeholder.svg?height=300&width=400",
    sources: ["Washington Post", "Politico", "CNN"],
    trending: 92,
  },
  {
    id: 4,
    title: "Global Markets React to Central Bank Policy Shifts",
    excerpt:
      "Stock markets worldwide showed volatility as multiple central banks signaled changes to interest rate policies.",
    category: "Economy",
    date: "May 3, 2025",
    readTime: "3 min read",
    image: "/placeholder.svg?height=300&width=400",
    sources: ["Financial Times", "Wall Street Journal", "Bloomberg"],
    trending: 89,
  },
  {
    id: 5,
    title: "New Study Reveals Breakthrough in Renewable Energy Storage",
    excerpt:
      "Researchers have developed a novel battery technology that could solve long-standing energy storage challenges.",
    category: "Science",
    date: "May 2, 2025",
    readTime: "6 min read",
    image: "/placeholder.svg?height=300&width=400",
    sources: ["Nature", "Scientific American", "New Scientist"],
    trending: 87,
  },
  {
    id: 6,
    title: "Film Festival Announces Surprising Award Winners",
    excerpt:
      "The international film community was stunned by several unexpected choices for this year's prestigious cinema awards.",
    category: "Entertainment",
    date: "May 2, 2025",
    readTime: "3 min read",
    image: "/placeholder.svg?height=300&width=400",
    sources: ["Variety", "Hollywood Reporter", "IndieWire"],
    trending: 84,
  },
  {
    id: 7,
    title: "Major Sports League Expands to New International Markets",
    excerpt:
      "In a historic move, the league has announced plans to establish teams in three new countries starting next season.",
    category: "Sports",
    date: "May 2, 2025",
    readTime: "5 min read",
    image: "/placeholder.svg?height=300&width=400",
    sources: ["ESPN", "Sports Illustrated", "The Athletic"],
    trending: 82,
  },
  {
    id: 8,
    title: "Archaeologists Uncover Ancient City in Unexpected Location",
    excerpt:
      "The discovery challenges previous understanding of historical trade routes and cultural exchanges in the region.",
    category: "Science",
    date: "May 1, 2025",
    readTime: "7 min read",
    image: "/placeholder.svg?height=300&width=400",
    sources: ["National Geographic", "Archaeology Magazine", "BBC"],
    trending: 79,
  },
]

export default function TrendingPage() {
  return (
<div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Trending News</h1>

        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="world">World</TabsTrigger>
              <TabsTrigger value="politics">Politics</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="science">Science</TabsTrigger>
            </TabsList>
            <div className="text-sm text-gray-500">
              Updated: {new Date(
).toLocaleTimeString()} • Refreshes every 15 minutes
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Featured trending article */}
              <div className="col-span-1 md:col-span-2">
                <Card className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-[250px] md:h-auto">
                      <Image
                        src={trendingNews[0].image || "/placeholder.svg"}
                        alt={trendingNews[0].title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-bold">
                        #1 Trending
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-gray-200 px-2 py-1 text-xs font-medium">{trendingNews[0].category}</span>
                        <div className="flex items-center text-sm">
                          <span className="text-red-600 font-bold mr-1">+{trendingNews[0].trending}%</span>
                          <span className="text-gray-500">trending</span>
                        </div>
                      </div>
                      <h2 className="font-serif text-2xl font-bold mb-3">{trendingNews[0].title}</h2>
                      <p className="text-gray-700 mb-4">{trendingNews[0].excerpt}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <span>{trendingNews[0].date}</span>
                        <span className="mx-2">•</span>
                        <span>{trendingNews[0].readTime}</span>
                      </div>
                      <div className="mb-4 text-sm">
                        <span className="font-medium">Sources:</span> {trendingNews[0].sources.join(", ")}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button className="bg-black hover:bg-gray-800 text-white">Read Full Article</Button>
                        <Button variant="outline">Save for Later</Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>

              {/* Rest of trending articles */}
              {trendingNews.slice(1).map((article, index) => (
                <Card key={article.id} className="overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-3">
                    <div className="relative h-[180px] sm:h-full">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4 sm:col-span-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="bg-gray-200 px-2 py-1 text-xs font-medium">{article.category}</span>
                        <div className="flex items-center text-xs">
                          <span className="text-red-600 font-bold mr-1">+{article.trending}%</span>
                          <span className="text-gray-500">trending</span>
                        </div>
                      </div>
                      <h3 className="font-serif text-lg font-bold mb-2">{article.title}</h3>
                      <p className="text-gray-700 mb-3 text-sm line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <span>{article.date}</span>
                        <span className="mx-2">•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <div className="text-xs mb-3">
                        <span className="font-medium">Sources:</span> {article.sources.join(", ")}
                      </div>
                      <Link href={`/article/${article.id}`} className="text-sm font-medium text-black hover:underline">
                        Read more →
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" className="border-black text-black hover:bg-gray-100">
                Load More Trending Stories
              </Button>
            </div>
          </TabsContent>

          {/* Other tabs would have similar content filtered by category */}
          <TabsContent value="world">
            <div className="p-8 text-center">
              <p className="text-gray-500">Showing trending World news</p>
            </div>
          </TabsContent>
          <TabsContent value="politics">
            <div className="p-8 text-center">
              <p className="text-gray-500">Showing trending Politics news</p>
            </div>
          </TabsContent>
          <TabsContent value="technology">
            <div className="p-8 text-center">
              <p className="text-gray-500">Showing trending Technology news</p>
            </div>
          </TabsContent>
          <TabsContent value="business">
            <div className="p-8 text-center">
              <p className="text-gray-500">Showing trending Business news</p>
            </div>
          </TabsContent>
          <TabsContent value="science">
            <div className="p-8 text-center">
              <p className="text-gray-500">Showing trending Science news</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
