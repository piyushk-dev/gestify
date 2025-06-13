import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Categories from the main site
const categories = [
  "World",
  "Business",
  "Technology",
  "Science",
  "Health",
  "Politics",
  "Sports",
  "Entertainment",
  "Arts",
  "Books",
  "Food",
  "Travel",
]

// Mock data for newsletter
const mainHeadline = {
  title: "Global Climate Summit Reaches Historic Agreement",
  excerpt:
    "World leaders have agreed on unprecedented measures to combat climate change in what experts are calling a turning point for environmental policy. The agreement, which took two weeks of intense negotiations, sets ambitious targets for carbon reduction and provides financial support for developing nations.",
  category: "World",
}

const secondaryHeadline = {
  title: "Tech Giants Announce AI Safety Coalition",
  excerpt:
    "Major technology companies have formed an alliance to establish industry-wide safety protocols for artificial intelligence development. The coalition aims to address concerns about AI risks while promoting innovation.",
  category: "Technology",
}

const moreStories = [
  {
    title: "Markets React to Central Bank Policy Shifts",
    excerpt:
      "Stock markets worldwide showed volatility as multiple central banks signaled changes to interest rate policies.",
    category: "Business",
  },
  {
    title: "New Study Reveals Breakthrough in Renewable Energy",
    excerpt:
      "Researchers have developed a novel battery technology that could solve long-standing energy storage challenges.",
    category: "Science",
  },
  {
    title: "Healthcare Reform Bill Passes with Bipartisan Support",
    excerpt:
      "After months of negotiation, the comprehensive healthcare reform package has been approved by lawmakers from both parties.",
    category: "Politics",
  },
]

export default function NewsletterPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Newsletter header */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="border-b-2 border-black pb-2 mb-4">
          <div className="flex justify-between items-center text-xs mb-2">
            <span>{today}</span>
            <span>ISSUE 265</span>
          </div>
          <h1 className="font-serif text-7xl md:text-8xl font-bold text-center tracking-tight">DAILY NEWS</h1>
          <div className="border-t-2 border-b border-black py-1 mt-2">
            <p className="text-xs text-center uppercase tracking-widest">Your personalized news digest from Gestify</p>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main headline - 2/3 width */}
          <div className="md:col-span-2 border-r border-gray-200 pr-6">
            <h2 className="font-serif text-4xl font-bold leading-tight mb-4">{mainHeadline.title}</h2>
            <p className="text-sm leading-relaxed mb-4">{mainHeadline.excerpt}</p>
            <p className="text-sm leading-relaxed mb-4">
              The agreement marks a significant shift in global climate policy, with nations agreeing to more stringent
              emissions targets than ever before. Experts say this could be the breakthrough needed to limit global
              warming to 1.5 degrees Celsius above pre-industrial levels.
            </p>
            <p className="text-sm leading-relaxed mb-4">
              "This is a historic moment," said UN Secretary-General António Guterres. "For the first time, we have a
              truly global commitment to address the climate crisis with the urgency it demands."
            </p>
            <div className="text-xs text-gray-500 mb-6">
              <span className="font-medium">Sources:</span> Reuters, AP News, Bloomberg
            </div>
          </div>

          {/* Secondary headline - 1/3 width */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl font-bold mb-3">{secondaryHeadline.title}</h3>
            <p className="text-sm leading-relaxed mb-3">{secondaryHeadline.excerpt}</p>
            <div className="relative h-[150px] w-full mb-3">
              <Image
                src="/placeholder.svg?height=150&width=250"
                alt="AI technology illustration"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm leading-relaxed mb-3">
              The initiative comes amid growing concerns about the potential risks of advanced AI systems and calls for
              greater oversight of the rapidly evolving technology.
            </p>
            <div className="text-xs text-gray-500 mb-6">
              <span className="font-medium">Sources:</span> TechCrunch, Wired, The Verge
            </div>
          </div>
        </div>

        {/* More stories section */}
        <div className="mt-8 border-t-2 border-black pt-4">
          <h3 className="font-serif text-3xl font-bold mb-4">More Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moreStories.map((story, index) => (
              <div key={index} className="border-t border-gray-200 pt-3">
                <span className="inline-block bg-gray-200 px-2 py-1 text-xs font-medium mb-2">{story.category}</span>
                <h4 className="font-serif text-xl font-bold mb-2">{story.title}</h4>
                <p className="text-sm leading-relaxed">{story.excerpt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Categories section */}
        <div className="mt-12 border-t-2 border-black pt-6">
          <h3 className="font-serif text-2xl font-bold mb-4">Browse by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm rounded-md transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Subscription CTA */}
        <div className="mt-12 bg-gray-100 p-6 rounded-lg">
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold mb-3">Get Your Daily News Delivered</h3>
            <p className="text-gray-700 mb-4">
              Customize your newsletter preferences to receive news that matters to you.
            </p>
            <Button className="bg-black hover:bg-gray-800 text-white">Manage Preferences</Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Gestify Daily News. All rights reserved.</p>
          <p className="mt-2">
            This newsletter is personalized based on your preferences.
            <br />
            You can{" "}
            <Link href="/preferences" className="underline">
              update your preferences
            </Link>{" "}
            or
            <Link href="/unsubscribe" className="underline ml-1">
              unsubscribe
            </Link>{" "}
            at any time.
          </p>
        </footer>
      </div>
    </div>
  )
}
