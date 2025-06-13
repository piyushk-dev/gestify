import Link from "next/link";
export function TopBar() {
  return (
    <div className="bg-black text-white text-xs py-2">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
        <div className="mb-1 sm:mb-0">
          <span className="font-serif">Friday, May 3, 2025</span>
          <span className="mx-2 hidden sm:inline">|</span>
          <span className="hidden sm:inline">Today's Paper</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/subscribe" className="hover:underline">
            Subscribe for $1/week
          </Link>
          <Link
            href="/newsletter"
            className="hover:underline flex items-center"
          >
            <span className="hidden sm:inline">Daily Briefing</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
