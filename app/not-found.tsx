import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-9xl font-bold text-black">404</h1>
        <h2 className="font-serif text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved. Let&rsquo;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-black hover:bg-gray-800">
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/trending">Browse Trending News</Link>
          </Button>
        </div>
      </div>
    </div>
)
}
