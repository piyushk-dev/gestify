export const revalidate = 21600;
import Link from "next/link";
import { connectToMongo } from "@/lib/mongodb";

// Capitalize helper
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function EducationPage() {
  const client = await connectToMongo();
  const db = client.db();

  const docs = await db
    .collection("educations")
    .find({ date: { $type: "date" } })
    .sort({ date: -1 })
    .limit(10)
    .toArray();

  const techArticles = docs.map((doc, index) => {
    const words = doc.story_summary?.split(/\s+/).length || 0;
    const readTime = Math.max(1, Math.ceil(words / 150)) + " min read";

    return {
      id: index + 1,
      title: doc.title,
      excerpt: doc.story_summary,
      category: doc.tags?.[0] || "General",
      tags: doc.tags?.map(capitalize) || ["General"],
      date: new Date(doc.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      readTime,
      image: doc.image || "/placeholder.svg?height=240&width=400",
      sources: ["Hindustan Times"],
      link: doc.link,
    };
  });


  //sleep(1000); // Simulate delay for loading effect
  // const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  // await sleep(9000); // Simulate delay for loading effect

  return (
    <section className="mb-16 px-4 sm:px-8 lg:px-16 mt-1">
      <div className="border-b-2 border-black mb-8">
        <h2 className="font-serif text-3xl font-bold inline-block border-b-4 border-black pb-2 -mb-[2px]">
          Latest in Education
        </h2>
      </div>

      <div className="space-y-14">
        {techArticles.map((article) => (
          <article
            key={article.id}
            className="flex flex-col md:flex-row gap-6 md:gap-10 items-start"
          >
            <div className="w-[320px] min-w-[320px] aspect-[16/16] bg-gray-200 rounded-md overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              <div className="flex flex-wrap gap-2 text-xs font-medium text-white">
                {article.tags.map((tag:string) => (
                  <span
                    key={tag}
                    className="bg-black px-2 py-1 rounded-sm tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="font-serif text-xl md:text-2xl font-bold">
                {article.title}
              </h3>

              <p className="text-gray-800 text-sm md:text-base leading-relaxed">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap items-center text-xs text-gray-500 gap-3">
                <span>{"NA"}</span>
                <span>•</span>
                <span>{article.readTime}</span>
                <span>•</span>
                <span>Source: {article.sources.join(", ")}</span>
              </div>

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

      <div className="mt-12 text-center">
        {/* <Button
          variant="outline"
          className="border-black text-black hover:bg-gray-100 px-6 py-2"
        >
          View More Articles
        </Button> */}
      </div>
    </section>
  );
}
