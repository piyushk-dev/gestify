// app/components/Featured.tsx
import Image from "next/image";
import Link from "next/link";
import { connectToMongo } from "@/lib/mongodb";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function Featured() {
  const client = await connectToMongo();
  const db = client.db();

  const docs = await db
    .collection("trendings")
    .find({ date: { $type: "date" } })
    .sort({ date: -1 })
    .limit(1)
    .toArray();

  if (!docs.length) return null;

  const doc = docs[0];
  const words = doc.story_summary?.split(/\s+/).length || 0;
  const readTime = Math.max(1, Math.ceil(words / 200)) + " min read";

  const featuredNews = {
    title: doc.title,
    excerpt:
      doc.story_summary?.split(" ").slice(0, 25).join(" ") + "..." || "", // shorter preview
    category: capitalize(doc.sentiment?.label || doc.sentiment || "Trending"),
    date: new Date(doc.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    readTime,
    image: doc.image || "/placeholder.svg?height=500&width=800",
    link: doc.link || "/trending",
    source: "Livemint",
  };

//   const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
//   await sleep(2000); // simulate delay

  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <span className="inline-block bg-red-700 text-white px-2 py-1 text-xs font-bold mb-2">
            {featuredNews.category}
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold leading-snug mb-3">
            {featuredNews.title}
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-3">
            {featuredNews.excerpt}
          </p>
          <div className="flex items-center text-xs text-gray-500 mb-3">
            <span>{featuredNews.date}</span>
            <span className="mx-2">•</span>
            <span>{featuredNews.readTime}</span>
          </div>
          <Link
            href={"/trending"}
            className="inline-block bg-black hover:bg-gray-800 text-white px-3 py-1.5 rounded-md text-xs font-medium"
          >
            Read Full Article
          </Link>
          <div className="mt-3 text-xs text-gray-600">
            <span className="font-medium">Source:</span> {featuredNews.source}
          </div>
        </div>
        <div className="relative h-[200px] md:h-[280px] w-full rounded-md overflow-hidden">
          <Image
            src={featuredNews.image}
            alt={featuredNews.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
