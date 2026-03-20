import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

import AnimatedHeader from "./_components/AnimatedHeader";
import SkillsAndCases from "./_components/SkillsAndCases";
import { PROJECTS } from "./projects.data";

import { createProjectsCollectionSchema, serializeJsonLd } from "@/lib/structured-data";

const siteUrl = new URL("https://jayvicsanantonio.dev");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Projects",
  description:
    "Production-ready applications, case studies, and experiments that highlight modern web engineering, performance tuning, and DX improvements.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Jayvic San Antonio",
    description:
      "Production-ready applications, case studies, and experiments that highlight modern web engineering, performance tuning, and DX improvements.",
    url: "https://jayvicsanantonio.dev/projects",
    siteName: "Jayvic San Antonio",
    type: "website",
    images: [{ url: "/projects/opengraph-image", width: 1200, height: 630, alt: "Projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Jayvic San Antonio",
    description:
      "Production-ready applications, case studies, and experiments that highlight modern web engineering and performance tuning.",
    images: ["/projects/opengraph-image"],
  },
};

export default function ProjectsPage() {
  const projectsSchema = createProjectsCollectionSchema(PROJECTS);

  return (
    <main className="relative w-full overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(projectsSchema) }}
      />
      <div className="cq container pt-48 pb-16 sm:pt-52">
        {/* Header */}
        <div className="space-y-5 motion-safe:animate-fade-in-up">
          <AnimatedHeader />

          <p className="max-w-[720px] text-base text-gray-300/85 sm:text-lg">
            Production-ready applications and systems showcasing full-stack development expertise,
            scalable architecture design, and modern engineering practices. For the broader career
            context behind these builds, explore my{" "}
            <Link
              href="/work"
              className="text-cyan-200 underline underline-offset-4 transition-colors hover:text-cyan-100"
            >
              software engineering experience timeline
            </Link>{" "}
            or return to the{" "}
            <Link
              href="/"
              className="text-cyan-200 underline underline-offset-4 transition-colors hover:text-cyan-100"
            >
              homepage overview of my current focus
            </Link>
            .
          </p>
          <p className="max-w-[720px] text-sm text-gray-400 sm:text-base">
            Each project below now leads to a dedicated internal case study page covering context,
            key decisions, and measurable outcomes before linking out to demos or source code.
          </p>
        </div>

        {/* Projects only */}
        <React.Suspense fallback={null}>
          <div className="motion-safe:animate-fade-in-up" style={{ animationDelay: "160ms" }}>
            <SkillsAndCases />
          </div>
        </React.Suspense>

        <section
          className="mt-16 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-sm text-gray-300/85 shadow-[0_24px_60px_rgba(0,0,0,0.2)] sm:p-8 sm:text-base"
          aria-label="Related site sections"
        >
          <p className="max-w-[68ch]">
            Prefer a narrative view? Visit the{" "}
            <Link
              href="/work"
              className="text-cyan-200 underline underline-offset-4 transition-colors hover:text-cyan-100"
            >
              professional experience timeline
            </Link>{" "}
            to see the enterprise platforms and teams behind these projects, or head back to the{" "}
            <Link
              href="/"
              className="text-cyan-200 underline underline-offset-4 transition-colors hover:text-cyan-100"
            >
              homepage summary
            </Link>{" "}
            for a concise summary of my work, skills, and current focus.
          </p>
        </section>
      </div>
    </main>
  );
}
