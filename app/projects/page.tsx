import React from 'react';

import AnimatedHeader from './_components/AnimatedHeader.client';
import SkillsAndCases from './_components/SkillsAndCases';

export default function ProjectsPage() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[40vh] bg-[radial-gradient(40%_30%_at_50%_0%,rgba(59,130,246,0.20),transparent)] opacity-40" />
        <div className="motion-safe-only scroll-element animate-spin-slow absolute top-1/2 left-1/2 h-[120vw] w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-3xl [animation-duration:18s] [background:conic-gradient(from_180deg_at_50%_50%,rgba(59,130,246,0.45),rgba(168,85,247,0.35),rgba(34,211,238,0.30),rgba(59,130,246,0.45))]" />
      </div>
      <div className="cq container pt-40 pb-16 sm:pt-52">
        {/* Header */}
        <div className="animate-fade-in-up space-y-5">
          <AnimatedHeader />

          <p className="max-w-[720px] text-base text-gray-300/85 sm:text-lg">
            A curated collection of platforms, tools, and experiments—built with care, tuned for
            performance, and shaped by design.
          </p>
        </div>

        {/* Projects only */}
        <React.Suspense fallback={null}>
          <div className="animate-fade-in-up" style={{ animationDelay: '160ms' }}>
            <SkillsAndCases />
          </div>
        </React.Suspense>
      </div>
    </section>
  );
}
