'use client';

import React from 'react';

import AnimatedText from '@/components/ui/AnimatedText';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

import SkillsAndCases from './_components/SkillsAndCases';

export default function ProjectsPage() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative w-full">
      <div className="container pt-52 pb-16">
        {/* Header */}
        <div className="space-y-5">
          <h1 className="font-oswald text-3xl font-bold tracking-tight text-cyan-300/90 sm:text-4xl lg:text-6xl">
            <span className="sr-only">Projects</span>
            <AnimatedText
              text="Crafted Artifacts"
              start={!prefersReducedMotion}
              perCharDelay={45}
            />
          </h1>

          <p className="max-w-[720px] text-base text-gray-300/85 sm:text-lg">
            A curated collection of platforms, tools, and experiments—built with care, tuned for
            performance, and shaped by design.
          </p>
        </div>

        {/* Projects only */}
        <React.Suspense fallback={null}>
          <SkillsAndCases prefersReducedMotion={prefersReducedMotion} />
        </React.Suspense>
      </div>
    </section>
  );
}
