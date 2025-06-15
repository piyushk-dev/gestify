import Link from "next/link";
import { connectToMongo } from "@/lib/mongodb";

// Capitalize helper
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function HoroscopePage() {
  const client = await connectToMongo();
  const db = client.db();

  const docs = await db
    .collection("horoscopes")
    .find({ date: { $type: "date" } })
    .sort({ date: -1 })
    .limit(12)
    .toArray();

  const horoscopes = docs.map((doc, index) => {
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
      tags: doc.tags?.map(capitalize) || [],
      sign: capitalize(doc.sign || "Zodiac"),
      source: "Hindustan Times",
    };
  });

  return (
    <section className="mb-16 px-4 sm:px-8 lg:px-16 mt-1">
      <div className="border-b-2 border-black mb-8">
        <h2 className="font-serif text-3xl font-bold inline-block border-b-4 border-black pb-2 -mb-[2px]">
          Daily Horoscope & Love Forecasts
        </h2>
      </div>

      <div className="space-y-14">
        {horoscopes.map((article) => (
          <article
            key={article.id}
            className="flex flex-col md:flex-row gap-6 md:gap-10 items-start"
          >
            {/* Placeholder Image Box */}
            <div className="w-[320px] min-w-[320px] h-[320px] bg-gradient-to-br from-indigo-100 to-purple-200 rounded-md flex items-center justify-center text-indigo-700 font-bold text-3xl uppercase tracking-wider">
              {article.sign}
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

              {/* Meta Info */}
              <div className="flex flex-wrap items-center text-xs text-gray-500 gap-3">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
                <span>•</span>
                <span>Source: {article.source}</span>
              </div>

              {/* Read More */}
              <Link
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 hover:underline mt-2"
              >
                Read Full Horoscope →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
