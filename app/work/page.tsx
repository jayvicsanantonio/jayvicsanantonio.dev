"use cache";

import type { Metadata } from "next";
import { Suspense } from "react";

import { WorkTimelineSkeleton } from "@/components/fallbacks";

import WorkTimelineSection from "./_components/WorkTimelineSection";

export const metadata: Metadata = {
  title: "Experience | Jayvic San Antonio",
  description:
    "Timeline of enterprise adtech, platform, and product engineering roles showcasing leadership, system scale, and measurable impact.",
  alternates: {
    canonical: "/work",
  },
};

export const experimental_ppr = true;

export default function WorkPage() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="motion-safe:block hidden absolute top-1/2 left-1/2 h-[120vw] w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-5 blur-3xl [animation:spin_22s_linear_infinite] [background:conic-gradient(from_0deg_at_50%_50%,rgba(168,85,247,0.35),rgba(59,130,246,0.28),rgba(34,211,238,0.24),rgba(168,85,247,0.35))]" />
      </div>
      <div className="cq container pt-48 pb-16 sm:pt-52">
        {/* Intro */}
        <div className="space-y-5 motion-safe:animate-fade-in-up">
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
        <div className="motion-safe:animate-fade-in-up" style={{ animationDelay: "140ms" }}>
          <Suspense fallback={<WorkTimelineSkeleton />}>
            <WorkTimelineSection />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
