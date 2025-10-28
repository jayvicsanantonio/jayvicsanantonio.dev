type ProjectsGridSkeletonProps = {
  cards?: number;
};

export default function ProjectsGridSkeleton({ cards = 6 }: ProjectsGridSkeletonProps) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: cards }).map((_, idx) => (
        <article
          key={idx}
          className="flex min-h-[320px] flex-col overflow-hidden rounded-3xl border border-white/5 bg-slate-900/70 shadow-[0_10px_40px_rgba(15,23,42,0.45)] backdrop-blur-md"
        >
          <div className="h-40 animate-pulse bg-slate-800/70 md:h-48" aria-hidden />
          <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
            <span className="h-5 w-36 animate-pulse rounded-full bg-white/20" aria-hidden />
            <span className="h-3 w-full animate-pulse rounded-full bg-white/10" aria-hidden />
            <span className="h-3 w-5/6 animate-pulse rounded-full bg-white/10" aria-hidden />
            <span className="mt-auto flex gap-3">
              <span className="h-9 w-24 animate-pulse rounded-full bg-white/15" aria-hidden />
              <span className="h-9 w-24 animate-pulse rounded-full bg-white/15" aria-hidden />
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
