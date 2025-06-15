// app/components/LatestHomeSkeleton.tsx
import clsx from "clsx";

const shimmerClasses = "bg-gray-200 animate-pulse rounded";

export default function LatestLoading() {
  return (
    <section className="mb-12">
      <div className="border-b-2 border-black mb-6">
        <h2 className="font-serif text-2xl md:text-3xl font-bold inline-block border-b-4 border-black pb-2 -mb-[2px]">
          Latest News
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className="border-b pb-6">
            <div
              className={clsx(
                "relative w-full mb-4 h-[180px]",
                shimmerClasses
              )}
            />
            <div
              className={clsx("w-24 h-5 mb-2", shimmerClasses)}
            />
            <div
              className={clsx("h-6 w-3/4 mb-2", shimmerClasses)}
            />
            <div
              className={clsx("h-4 w-full mb-3", shimmerClasses)}
            />
            <div className="flex space-x-2 text-xs text-gray-500 mb-2">
              <div className={clsx("w-20 h-4", shimmerClasses)} />
              <div className={clsx("w-12 h-4", shimmerClasses)} />
            </div>
            <div className={clsx("w-28 h-4", shimmerClasses)} />
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <div className={clsx("h-10 w-40 mx-auto", shimmerClasses)} />
      </div>
    </section>
  );
}
