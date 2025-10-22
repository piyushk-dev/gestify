export const revalidate = 21600;
import Link from "next/link";
import { connectToMongo } from "@/lib/mongodb";

// Capitalize helper
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Get sentiment color class
function getSentimentClass(label: string) {
  switch (label.toLowerCase()) {
    case "positive":
      return "bg-green-100 text-green-800 border-green-300";
    case "negative":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
}

export default async function PoliticsPage() {
  const sentimentStyles: Record<string, string> = {
  Positive: "bg-green-100 text-green-700 border-green-300",
  Negative: "bg-red-100 text-red-700 border-red-300",
  Neutral: "bg-gray-100 text-gray-700 border-gray-300",
};

  const client = await connectToMongo();
  const db = client.db();

  const docs = await db
    .collection("politics")
    .find({ date: { $type: "date" } })
    .sort({ date: -1 })
    .limit(10)
    .toArray();

  const politicalArticles = docs.map((doc, index) => {
    const words = doc.story_summary?.split(/\s+/).length || 0;
    const readTime = Math.max(1, Math.ceil(words / 150)) + " min read";

    const sentimentLabel = typeof doc.sentiment?.label === "string"
      ? capitalize(doc.sentiment.label)
      : "Neutral";

    return {
      id: doc._id?.toString() || index,
      title: doc.title,
      excerpt: doc.story_summary,
      date: new Date(doc.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      readTime,
      tags: doc.tags?.map(capitalize) || ["Politics"],
      sentiment: sentimentLabel,
      sentimentClass: getSentimentClass(sentimentLabel),
      sources: doc.source_articles?.map((src: any) => ({
        name: src.source_name,
        url: src.url,
      })) || [],
      image: doc.image || "/placeholder.svg?height=240&width=400",
    };
  });

  return (
    <section className="mb-16 px-4 sm:px-8 lg:px-16 mt-1">
      <div className="border-b-2 border-black mb-8">
        <h2 className="font-serif text-3xl font-bold inline-block border-b-4 border-black pb-2 -mb-[2px]">
          Latest in Politics
        </h2>
      </div>

      <div className="space-y-14">
        {politicalArticles.map((article) => (
          <article
            key={article.id}
            className="flex flex-col md:flex-row gap-6 md:gap-10 items-start"
          >
            {/* Image box */}
            <div className="w-[320px] min-w-[320px] aspect-[16/16] bg-gray-200 rounded-md overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Info */}
            <div className="flex flex-col gap-3 md:gap-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 text-xs font-medium text-white">
                {article.tags.map((tag: string) => (
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
                {/* <span
                  className={`border px-2 py-[1px] rounded-sm text-xs ${article.sentimentClass}`}
                >
                  {article.sentiment}
                </span> */}
              </div>
                            <div
                className={`inline-block text-xs px-2 py-1 border rounded ${sentimentStyles[article.sentiment] || sentimentStyles["Neutral"]}`}
              >
                Sentiment: {article.sentiment}
              </div>

              {/* Sources */}
              {article.sources.length > 0 && (
                <div className="text-sm text-gray-700 mt-2 flex flex-col gap-1">
                  {article.sources.map((src:any, i:number) => (
                    <Link
                      key={i}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>Read Full Article</span>
                      <span className="text-xs">→</span>
                      <span className="text-gray-600 italic">({src.name})</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* View More Button Placeholder */}
      <div className="mt-12 text-center">
        {/* 
        <Button
          variant="outline"
          className="border-black text-black hover:bg-gray-100 px-6 py-2"
        >
          View More Articles
        </Button> 
        */}
      </div>
    </section>
  );
}
