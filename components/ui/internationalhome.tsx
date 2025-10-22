import Image from "next/image";
import Link from "next/link";
import { connectToMongo } from "@/lib/mongodb";
import { Button } from "./button";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function InternationalHome() {
  const client = await connectToMongo();
  const db = client.db();

  const docs = await db
    .collection("internationals")
    .find({ date: { $type: "date" } })
    .sort({ date: -1 })
    .limit(6)
    .toArray();

  if (!docs.length) return null;

  // const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  // await sleep(2000); // Simulate delay

  const internationalNews = docs.map((doc: any) => {
    const words = doc.story_summary?.split(/\s+/).length || 0;
    const readTime = Math.max(1, Math.ceil(words / 200)) + " min read";
    return {
      id: doc._id.toString(),
      title: doc.title,
      excerpt:
        doc.story_summary?.split(" ").slice(0, 25).join(" ") + "..." || "",
      category: capitalize(doc.tags?.[0] || "World"),
      date: new Date(doc.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      readTime,
      image: doc.image || "/placeholder.svg?height=500&width=800",
      link: doc.link || "/international",
    };
  });

  return (
    <section className="mb-12">
      <div className="border-b-2 border-black mb-6">
        <h2 className="font-serif text-2xl md:text-3xl font-bold inline-block border-b-4 border-black pb-2 -mb-[2px]">
          World News
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {internationalNews.map((article) => (
          <div key={article.id} className="border-b pb-6">
            <Link href={article.link}>
              <div className="relative h-[180px] w-full mb-4 rounded-md overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>

            <Link href={article.link}>
              <span className="inline-block bg-gray-200 px-2 py-1 text-xs font-medium mb-2 hover:underline">
                {article.category}
              </span>
            </Link>

            <Link href={article.link}>
              <h3 className="font-serif text-lg md:text-xl font-bold mb-2 hover:underline">
                {article.title}
              </h3>
            </Link>

            <Link href={article.link}>
              <p className="text-gray-700 mb-3 text-xs md:text-sm hover:underline">
                {article.excerpt}
              </p>
            </Link>

            <div className="flex items-center text-xs text-gray-500">
              <span>{article.date}</span>
              <span className="mx-2">•</span>
              <span>{article.readTime}</span>
            </div>

            <div className="mt-2 text-xs text-gray-600">
              <span className="font-medium">Source:</span> The Hindu
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link href="/international">
          <Button
            variant="outline"
            className="border-black text-black hover:bg-gray-100"
          >
            View More Articles
          </Button>
        </Link>
      </div>
    </section>
  );
}
