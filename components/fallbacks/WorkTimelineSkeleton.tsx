type WorkTimelineSkeletonProps = {
  items?: number;
};

export default function WorkTimelineSkeleton({ items = 5 }: WorkTimelineSkeletonProps) {
  return (
    <div className="relative mt-8 sm:mt-12 lg:mt-16">
      <div className="lg:relative lg:left-1/2 lg:w-[100vw] lg:-translate-x-1/2">
        <div
          aria-hidden
          className="hidden h-full w-px bg-white/5 lg:absolute lg:top-0 lg:left-1/2 lg:block lg:-translate-x-1/2"
        />
        <div className="space-y-8">
          {Array.from({ length: items }).map((_, idx) => (
            <div
              key={idx}
              className="grid gap-6 rounded-3xl border border-white/5 bg-slate-900/70 p-6 shadow-[0_12px_38px_rgba(15,23,42,0.45)] backdrop-blur-lg md:grid-cols-[minmax(0,0.8fr),1fr] md:p-8"
            >
              <div className="space-y-3">
                <span
                  className="block h-4 w-28 animate-pulse rounded-full bg-white/25"
                  aria-hidden
                />
                <span
                  className="block h-3 w-24 animate-pulse rounded-full bg-white/15"
                  aria-hidden
                />
                <span
                  className="block h-3 w-20 animate-pulse rounded-full bg-white/10"
                  aria-hidden
                />
              </div>
              <div className="space-y-2">
                <span
                  className="block h-3 w-full animate-pulse rounded-full bg-white/10"
                  aria-hidden
                />
                <span
                  className="block h-3 w-11/12 animate-pulse rounded-full bg-white/10"
                  aria-hidden
                />
                <span
                  className="block h-3 w-10/12 animate-pulse rounded-full bg-white/10"
                  aria-hidden
                />
                <span
                  className="block h-3 w-8/12 animate-pulse rounded-full bg-white/10"
                  aria-hidden
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
