
function ShimmerArticle() {
  return (
    <article className="flex flex-col md:flex-row gap-6 md:gap-10 animate-pulse items-start">
      {/* Image placeholder */}
      <div className="w-full md:w-[320px] h-[320px] bg-gray-200 rounded-md" />

      {/* Text content placeholder */}
      <div className="flex flex-col gap-3 md:gap-4 flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-5 w-16 bg-gray-300 rounded-sm" />
          ))}
        </div>

        {/* Title */}
        <div className="h-6 w-5/6 bg-gray-300 rounded-md" />

        {/* Excerpt lines */}
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-11/12 bg-gray-200 rounded" />
        <div className="h-4 w-10/12 bg-gray-200 rounded" />
        <div className="h-4 w-10/12 bg-gray-200 rounded" />
        <div className="h-4 w-11/12 bg-gray-200 rounded" />

        {/* Meta info: date, read time, source */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="w-20 h-3 bg-gray-300 rounded" />
          <div className="w-3 h-3 bg-gray-300 rounded-full" />
          <div className="w-24 h-3 bg-gray-300 rounded" />
          <div className="w-3 h-3 bg-gray-300 rounded-full" />
          <div className="w-32 h-3 bg-gray-300 rounded" />
        </div>

        {/* Read More link */}
        <div className="mt-2 h-4 w-[140px] bg-gray-300 rounded" />
      </div>
    </article>
  );
}


export default function TLoading() {
  return (
    <section className="mb-16 px-4 sm:px-8 lg:px-16 mt-1">
      <div className="border-b-2 border-black mb-8">
        <h2 className="font-serif text-3xl font-bold inline-block border-b-4 border-black pb-2 -mb-[2px]">
          Trending Now
        </h2>
      </div>

      <div className="space-y-14">
        {Array.from({ length: 4 }).map((_, index) => (
          <ShimmerArticle key={index} />
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
