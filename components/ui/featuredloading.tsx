export default function FeaturedLoading() {
  return (
    <section className="mb-10 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          {/* Category tag */}
          <div className="bg-red-300 h-4 w-20 rounded mb-2" />
          
          {/* Title */}
          <div className="bg-gray-300 h-6 w-3/4 rounded mb-3" />

          {/* Excerpt lines */}
          <div className="bg-gray-200 h-4 w-full rounded mb-2" />
          <div className="bg-gray-200 h-4 w-5/6 rounded mb-2" />
          <div className="bg-gray-200 h-4 w-2/3 rounded mb-3" />

          {/* Date & Read time */}
          <div className="bg-gray-100 h-3 w-1/2 rounded mb-3" />

          {/* Button */}
          <div className="bg-gray-300 h-7 w-28 rounded mb-3" />

          {/* Source */}
          <div className="bg-gray-100 h-3 w-36 rounded" />
        </div>

        {/* Image placeholder */}
        <div className="relative h-[200px] md:h-[280px] w-full bg-gray-300 rounded-md" />
      </div>
    </section>
  );
}
