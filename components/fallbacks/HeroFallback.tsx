export default function HeroFallback() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(0,139,139,0.25),_transparent_70%),linear-gradient(180deg,_#020617,_#0f172a)] px-6 py-24 text-center shadow-[0_40px_120px_rgba(2,6,23,0.6)]">
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_center,_rgba(255,255,255,0.06)_0%,_transparent_60%),linear-gradient(120deg,rgba(34,211,238,0.18),rgba(168,85,247,0.14))]" />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6">
        <span className="inline-flex h-6 w-32 animate-pulse rounded-full bg-white/15" aria-hidden />
        <span
          className="inline-flex h-12 w-full max-w-xl animate-pulse rounded-full bg-white/20"
          aria-hidden
        />
        <span
          className="inline-flex h-3 w-full max-w-2xl animate-pulse rounded-full bg-white/10"
          aria-hidden
        />
        <span
          className="inline-flex h-3 w-full max-w-2xl animate-pulse rounded-full bg-white/10"
          aria-hidden
        />
        <span
          className="inline-flex h-3 w-3/4 max-w-xl animate-pulse rounded-full bg-white/10"
          aria-hidden
        />
      </div>
    </section>
  );
}
