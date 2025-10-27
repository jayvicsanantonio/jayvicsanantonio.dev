import type { Metadata } from "next";
import React from "react";

import AnimatedHeader from "./_components/AnimatedHeader.client";
import SkillsAndCases from "./_components/SkillsAndCases";

export const metadata: Metadata = {
  title: "Projects | Jayvic San Antonio",
  description:
    "Production-ready applications, case studies, and experiments that highlight modern web engineering, performance tuning, and DX improvements.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="cq container pt-48 pb-16 sm:pt-52">
        {/* Header */}
        <div className="animate-fade-in-up space-y-5">
          <AnimatedHeader />

          <p className="max-w-[720px] text-base text-gray-300/85 sm:text-lg">
            Production-ready applications and systems showcasing full-stack development expertise,
            scalable architecture design, and modern engineering practices.
          </p>
        </div>

        {/* Projects only */}
        <React.Suspense fallback={null}>
          <div className="animate-fade-in-up" style={{ animationDelay: "160ms" }}>
            <SkillsAndCases />
          </div>
        </React.Suspense>
      </div>
    </section>
  );
}
