import React from 'react';

import WorkTimeline from './_components/WorkTimeline.client';

export default function WorkPage() {
  return (
    <section className="relative w-full">
      <div className="container cq pt-40 sm:pt-52 pb-16">
        {/* Intro */}
        <div className="space-y-5">
          <h1 className="font-oswald text-3xl font-bold tracking-tight text-cyan-300/90 sm:text-4xl lg:text-6xl">
            A Timeline of Crafting Impact
          </h1>
          <p className="max-w-[720px] text-base text-gray-300/85 sm:text-lg">
            A decade of building adtech platforms, real‑time systems, and scalable web
            experiences—shipping performance wins, leading teams, and crafting thoughtful
            interfaces.
          </p>
        </div>

        {/* Timeline */}
        <WorkTimeline />
      </div>
    </section>
  );
}
