import Link from "next/link";
export function TopBar() {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div className="bg-black text-white text-xs py-2">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
        <div className="mb-1 sm:mb-0">
          <span className="font-serif">{formattedDate}</span>
          {/* <span className="mx-2 hidden sm:inline">|</span> */}
          {/* <span className="hidden sm:inline">Today's Paper</span> */}
        </div>
        <div className="flex items-center space-x-4">
          {/* <Link href="/subscribe" className="hover:underline">
            Subscribe for $1/week
          </Link> */}
          <Link
            href="/newsletter"
            className="hover:underline flex items-center"
          >
            <span className="sm:inline">Daily Briefing</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
