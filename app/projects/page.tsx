import React from 'react';
import ProjectsGrid from '@/components/pages/projects/ProjectsGrid';

export default function Page() {
  return (
    <section className="w-full  dark:bg-gray-950 dark:text-gray-200 content-visibility-auto">
      <div className="space-y-4">
        <div className="font-oswald uppercase inline-block rounded-lg bg-gray-800 px-3 py-1">
          Featured Projects
        </div>
        <h2 className="font-oswald text-2xl font-bold tracking-tighter text-gray-950 dark:text-gray-200 md:text-3xl/tight lg:text-4xl">
          Work Showcase
        </h2>
        <p className="max-w-[600px] text-gray-950/70 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Here's a showcase of some of the projects I've worked on.
          Each one represents a unique challenge and learning
          experience.
        </p>
      </div>
      <div className="mt-8">
        <ProjectsGrid />
      </div>
    </section>
  );
}
