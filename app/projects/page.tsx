import React from 'react';

import AnimatedHeader from './_components/AnimatedHeader.client';
import SkillsAndCases from './_components/SkillsAndCases';

export default function ProjectsPage() {
  return (
    <section className="relative w-full">
      <div className="container pt-52 pb-16">
        {/* Header */}
        <div className="space-y-5">
          <AnimatedHeader />

          <p className="max-w-[720px] text-base text-gray-300/85 sm:text-lg">
            A curated collection of platforms, tools, and experiments—built with care, tuned for
            performance, and shaped by design.
          </p>
        </div>

        {/* Projects only */}
        <React.Suspense fallback={null}>
          <SkillsAndCases />
        </React.Suspense>
      </div>
    </section>
  );
}
