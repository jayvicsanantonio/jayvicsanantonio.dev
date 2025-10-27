import type { Metadata } from "next";

import WorkTimeline from "./_components/WorkTimeline.client";

export const metadata: Metadata = {
  title: "Experience | Jayvic San Antonio",
  description:
    "Timeline of enterprise adtech, platform, and product engineering roles showcasing leadership, system scale, and measurable impact.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="motion-safe-only scroll-element animate-spin-slow absolute top-1/2 left-1/2 h-[120vw] w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-3xl [animation-duration:22s] [background:conic-gradient(from_0deg_at_50%_50%,rgba(168,85,247,0.45),rgba(59,130,246,0.35),rgba(34,211,238,0.30),rgba(168,85,247,0.45))]" />
      </div>
      <div className="cq container pt-48 pb-16 sm:pt-52">
        {/* Intro */}
        <div className="animate-fade-in-up space-y-5">
          <h1 className="font-oswald text-3xl font-bold tracking-tight text-cyan-300/90 sm:text-4xl lg:text-6xl">
            Professional Experience
          </h1>
          <p className="max-w-[720px] text-base text-gray-300/85 sm:text-lg">
            Ten years architecting and building high-performance adtech platforms, real-time
            systems, and scalable web applications built for enterprise-grade performance. Proven
            track record of delivering mission-critical systems, optimizing performance bottlenecks,
            and shipping solutions that drive measurable business impact.
          </p>
        </div>

        {/* Timeline */}
        <div className="animate-fade-in-up" style={{ animationDelay: "140ms" }}>
          <WorkTimeline />
        </div>
      </div>
    </section>
  );
}
