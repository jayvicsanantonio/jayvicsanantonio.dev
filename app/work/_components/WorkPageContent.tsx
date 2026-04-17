import WorkTimeline from "./WorkTimeline";

export default function WorkPageContent() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div className="relative">
        <main className="relative w-full overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div
              className="absolute top-1/2 left-1/2 hidden h-[120vw] w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-5 blur-3xl motion-safe:animate-spin-slow lg:block"
              style={{
                background:
                  "conic-gradient(from_0deg_at_50%_50%,rgba(168,85,247,0.35),rgba(59,130,246,0.28),rgba(34,211,238,0.24),rgba(168,85,247,0.35))",
              }}
            />
          </div>
          <div className="cq container relative pt-48 pb-16 sm:pt-52" data-speed="0.98">
            <div className="space-y-5 motion-safe:animate-fade-in-up" data-lag="0.12">
              <h1 className="font-oswald text-3xl font-bold tracking-tight text-cyan-300/90 sm:text-4xl lg:text-6xl">
                Professional Experience
              </h1>
              <p className="max-w-[720px] text-base text-gray-300/85 sm:text-lg">
                Ten years architecting and building high-performance adtech platforms, real-time
                systems, and scalable web applications built for enterprise-grade performance.
                Proven track record of delivering mission-critical systems, optimizing performance
                bottlenecks, and shipping solutions that drive measurable business impact.
              </p>
            </div>

            <div className="relative mt-12" data-speed="1.04" data-lag="0.05">
              <WorkTimeline />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
