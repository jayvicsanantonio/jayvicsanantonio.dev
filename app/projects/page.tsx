import React from 'react';

import AnimatedHeader from './_components/AnimatedHeader.client';
import SkillsAndCases from './_components/SkillsAndCases';

export default function ProjectsPage() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="cq mx-auto max-w-7xl px-4 pt-48 pb-16 sm:px-6 sm:pt-52 lg:px-8">
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
