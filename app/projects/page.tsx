"use cache";

import type { Metadata } from "next";
import { Suspense } from "react";

import { ProjectsGridSkeleton } from "@/components/fallbacks";

import AnimatedHeader from "./_components/AnimatedHeader.client";
import ProjectsGrid from "./_components/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects | Jayvic San Antonio",
  description:
    "Production-ready applications, case studies, and experiments that highlight modern web engineering, performance tuning, and DX improvements.",
  alternates: {
    canonical: "/projects",
  },
};

export const experimental_ppr = true;

export default function ProjectsPage() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="cq container pt-48 pb-16 sm:pt-52">
        {/* Header */}
        <div className="space-y-5 motion-safe:animate-fade-in-up">
          <AnimatedHeader />

          <p className="max-w-[720px] text-base text-gray-300/85 sm:text-lg">
            Production-ready applications and systems showcasing full-stack development expertise,
            scalable architecture design, and modern engineering practices.
          </p>
        </div>

        {/* Projects only */}
        <Suspense fallback={<ProjectsGridSkeleton />}>
          <div className="motion-safe:animate-fade-in-up" style={{ animationDelay: "160ms" }}>
            <ProjectsGrid />
          </div>
        </Suspense>
      </div>
    </section>
  );
}
