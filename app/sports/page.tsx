import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock sports news data
const sportsNews = [
  {
    id: 1,
    title: "International Soccer League Announces Major Expansion into Asian Markets",
    excerpt:
      "The world's premier soccer league will add three new teams in major Asian cities, marking the biggest expansion in the league's history.",
    category: "Soccer",
    date: "May 3, 2025",
    readTime: "4 min read",
    image: "/placeholder.svg?height=400&width=600",
    sources: ["ESPN", "Sports Illustrated", "BBC Sport"],
  },
  {
    id: 2,
    title: "Olympic Committee Unveils New Sports for 2028 Summer Games",
    excerpt:
      "The International Olympic Committee has approved the addition of three new sports to the program for the 2028 Summer Olympics.",
    category: "Olympics",
    date: "May 3, 2025",
    readTime: "3 min read",
    image: "/placeholder.svg?height=300&width=400",
    sources: ["Olympic Channel", "NBC Sports", "Reuters"],
  },
  {
    id: 3,
    title: "Basketball Superstar Signs Record-Breaking Contract Extension",
    excerpt:
      "The five-time MVP has agreed to a historic contract extension that will make him the highest-paid athlete in team sports history.",
    category: "Basketball",
    date: "May 2, 2025",
    readTime: "5 min read",
    image: "/placeholder.svg?height=300&width=400",
    sources: ["NBA.com", "The Athletic", "Sports Center"],
  },
  {
    id: 4,
    title: "Tennis Grand Slam Introduces Innovative Technology for Line Calls",
    excerpt:
      "The prestigious tournament will implement advanced AI-powered technology to replace human line judges, promising 99.9% accuracy.",
    category: "Tennis",
    date: "May 2, 2025",
    readTime: "4 min read",
    image: "/placeholder.svg?height=300&width=400",
    sources: ["Tennis Magazine", "ATP Tour", "Sports Illustrated"],
  },
  {
    id: 5,
    title: "Formula 1 Team Unveils Revolutionary Car Design for Next Season",
    excerpt:
      "Engineers claim the radical new aerodynamic concept could change the future of motorsport if it proves successful on the track.",
    category: "Motorsport",
    date: "May 1, 2025",
    readTime: "6 min read",
    image: "/placeholder.svg?height=300&width=400",
    sources: ["Formula1.com", "Autosport", "Motorsport Magazine"],
  },
  {
    id: 6,
    title: "Golf's Youngest Champion Attributes Success to Unique Training Method",
    excerpt:
      "The 19-year-old sensation reveals the unconventional training regimen that helped him secure his first major championship.",
    category: "Golf",
    date: "May 1, 2025",
    readTime: "3 min read",
    image: "/placeholder.svg?height=300&width=400",
    sources: ["Golf Digest", "PGA Tour", "Sky Sports"],
  },
]

export default function SportsPage() {
  return (
<div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Sports News</h1>

        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all">All Sports</TabsTrigger>
              <TabsTrigger value="soccer">Soccer</TabsTrigger>
              <TabsTrigger value="basketball">Basketball</TabsTrigger>
              <TabsTrigger value="tennis">Tennis</TabsTrigger>
              <TabsTrigger value="golf">Golf</TabsTrigger>
              <TabsTrigger value="motorsport">Motorsport</TabsTrigger>
            </TabsList>
            <div className="text-sm text-gray-500">
              Updated: {new Date(
).toLocaleTimeString()} • Refreshes every 15 minutes
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Featured sports article */}
              <div className="col-span-1 md:col-span-2">
                <Card className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-[250px] md:h-auto">
                      <Image
                        src={sportsNews[0].image || "/placeholder.svg"}
                        alt={sportsNews[0].title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 text-sm font-bold">
                        Featured
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-gray-200 px-2 py-1 text-xs font-medium">{sportsNews[0].category}</span>
                      </div>
                      <h2 className="font-serif text-2xl font-bold mb-3">{sportsNews[0].title}</h2>
                      <p className="text-gray-700 mb-4">{sportsNews[0].excerpt}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <span>{sportsNews[0].date}</span>
                        <span className="mx-2">•</span>
                        <span>{sportsNews[0].readTime}</span>
                      </div>
                      <div className="mb-4 text-sm">
                        <span className="font-medium">Sources:</span> {sportsNews[0].sources.join(", ")}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button className="bg-black hover:bg-gray-800 text-white">Read Full Article</Button>
                        <Button variant="outline">Save for Later</Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>

              {/* Rest of sports articles */}
              {sportsNews.slice(1).map((article) => (
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
                Load More Sports Stories
              </Button>
            </div>
          </TabsContent>

          {/* Other tabs would have similar content filtered by category */}
          <TabsContent value="soccer">
            <div className="p-8 text-center">
              <p className="text-gray-500">Showing Soccer news</p>
            </div>
          </TabsContent>
          <TabsContent value="basketball">
            <div className="p-8 text-center">
              <p className="text-gray-500">Showing Basketball news</p>
            </div>
          </TabsContent>
          <TabsContent value="tennis">
            <div className="p-8 text-center">
              <p className="text-gray-500">Showing Tennis news</p>
            </div>
          </TabsContent>
          <TabsContent value="golf">
            <div className="p-8 text-center">
              <p className="text-gray-500">Showing Golf news</p>
            </div>
          </TabsContent>
          <TabsContent value="motorsport">
            <div className="p-8 text-center">
              <p className="text-gray-500">Showing Motorsport news</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
