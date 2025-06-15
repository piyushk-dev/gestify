import { Button } from "@/components/ui/button";
import AIExplainer from "../components/ui/ai-explainer";
import Featured from "@/components/ui/featured";
import { Suspense } from "react";
import FeaturedLoading from "@/components/ui/featuredloading";
import LatestHome from "@/components/ui/latesthome";
import LatestLoading from "@/components/ui/latestloading";
import InternationalHome from "@/components/ui/internationalhome";
import InternationalLoading from "@/components/ui/internationalloading";
import CustomLink from "./components/customlink";

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        {/* Featured article */}
        <Suspense fallback={<FeaturedLoading />}>
          <Featured />
        </Suspense>

        {/* AI Explanation Section */}
        <AIExplainer />

        {/* Latest News Section */}
        {/* <section className="mb-12">
          <div className="border-b-2 border-black mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold inline-block border-b-4 border-black pb-2 -mb-[2px]">
              Latest News
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {latestNews.map((article) => (
              <div key={article.id} className="border-b pb-6">
                <div className="relative h-[180px] w-full mb-4">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="inline-block bg-gray-200 px-2 py-1 text-xs font-medium mb-2">
                  {article.category}
                </span>
                <h3 className="font-serif text-lg md:text-xl font-bold mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-700 mb-3 text-xs md:text-sm">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
                <div className="mt-2 text-xs">
                  <span className="font-medium">Sources:</span> NYT, Guardian,
                  WSJ
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              className="border-black text-black hover:bg-gray-100"
            >
              View More Articles
            </Button>
          </div>
        </section> */}
        <Suspense fallback={<LatestLoading />}>
          <LatestHome />
          {/* <Featured /> */}
        </Suspense>
        <Suspense fallback={<InternationalLoading />}>
          {/* <LatestHome /> */}
          <InternationalHome />
          {/* <Featured /> */}
        </Suspense>

        {/* Trending Section */}
        {/* <section className="mb-12">
          <div className="border-b-2 border-black mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold inline-block border-b-4 border-black pb-2 -mb-[2px]">
              Trending Now
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {trendingNews.map((article) => (
              <div key={article.id} className="flex border-b pb-4">
                <div className="mr-4 text-3xl font-serif font-bold text-gray-300">
                  {article.id}
                </div>
                <div>
                  <span className="inline-block bg-gray-200 px-2 py-1 text-xs font-medium mb-2">
                    {article.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 mb-2 text-sm">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* Newsletter Subscription */}
<section className="bg-gray-100 p-8 border border-gray-300 mb-12 rounded-md shadow-sm transition hover:shadow-md">
  <div className="max-w-2xl mx-auto text-center">
    <CustomLink href="/preferences" className="group block">
      <h2 className="font-serif text-2xl font-bold mb-3 group-hover:underline transition duration-150">
        Get Your Personalized Daily Briefing
      </h2>
      <p className="text-gray-700 mb-4 group-hover:underline transition duration-150">
        Subscribe to receive a daily email with news tailored to your
        interests, summarized by AI from multiple trusted sources.
      </p>
      <Button className="bg-black hover:bg-gray-800 text-white mt-2">
        Subscribe
      </Button>
    </CustomLink>
    <p className="text-xs text-gray-500 mt-4">
      By subscribing, you agree to our Terms of Service and Privacy Policy.
      You can unsubscribe at any time.
    </p>
  </div>
</section>

      </main>
      {/* Footer Section */}

    </div>
  );
}
