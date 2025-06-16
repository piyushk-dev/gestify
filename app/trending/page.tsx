export const revalidate = 43200;
import Link from "next/link";
import { connectToMongo } from "@/lib/mongodb";

// Capitalize helper
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Color map for sentiment
const sentimentStyles: Record<string, string> = {
  Positive: "bg-green-100 text-green-700 border-green-300",
  Negative: "bg-red-100 text-red-700 border-red-300",
  Neutral: "bg-gray-100 text-gray-700 border-gray-300",
};

export default async function TrendingPage() {
  const client = await connectToMongo();
  const db = client.db();

  const docs = await db
    .collection("trendings")
    .find({ date: { $type: "date" } })
    .sort({ date: -1 })
    .limit(10)
    .toArray();

  const trendingArticles = docs.map((doc, index) => {
    const words = doc.story_summary?.split(/\s+/).length || 0;
    const readTime = Math.max(1, Math.ceil(words / 200)) + " min read";
    return {
      id: doc._id?.toString() || index,
      title: doc.title,
      excerpt: doc.story_summary,
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
      image: doc.image || "/placeholder.svg?height=700&width=700",
      source: "Livemint",
    };
  });
  // console.log(trendingArticles.length);

  return (
    <section className="mb-16 px-4 sm:px-8 lg:px-16 mt-1">
      <div className="border-b-2 border-black mb-8">
        <h2 className="font-serif text-3xl font-bold inline-block border-b-4 border-black pb-2 -mb-[2px]">
          Trending Now
        </h2>
      </div>

      <div className="space-y-14">
        {trendingArticles.map((article) => (
          <article
            key={article.id}
            className="flex flex-col md:flex-row gap-6 md:gap-10 items-start"
          >
            {/* Image */}
            <div className="w-[320px] min-w-[320px] aspect-[16/16] bg-gray-200 rounded-md overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 md:gap-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 text-xs font-medium text-white">
                {article.tags.map((tag:number) => (
                  <span
                    key={tag}
                    className="bg-black px-2 py-1 rounded-sm tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl md:text-2xl font-bold">
                {article.title}
              </h3>

              {/* Summary */}
              <p className="text-gray-800 text-sm md:text-base leading-relaxed">
                {article.excerpt}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center text-xs text-gray-500 gap-3">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
                <span>•</span>
                <span>Source: {article.source}</span>
              </div>

              {/* Sentiment badge */}
              <div
                className={`inline-block text-xs px-2 py-1 border rounded ${sentimentStyles[article.sentiment] || sentimentStyles["Neutral"]}`}
              >
                Sentiment: {article.sentiment}
              </div>

              {/* Read More */}
              <Link
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 hover:underline mt-2"
              >
                Read Full Article →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination or View More */}
      <div className="mt-12 text-center">
        {/* Optional "View More" button placeholder */}
      </div>
    </section>
  );
}
