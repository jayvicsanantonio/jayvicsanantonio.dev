export default function NavRowSkeleton() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {Array.from({ length: 5 }).map((_, idx) => (
        <span
          key={idx}
          className="h-12 w-24 animate-pulse rounded-full border border-white/10 bg-white/10 backdrop-blur-xl"
          aria-hidden
        />
      ))}
    </div>
  );
}
