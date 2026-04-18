import type { Metadata } from "next";
import React from "react";

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
  const projectListItems = PROJECTS.map(({ slug, title, period, blurb, image, skills, links }) => ({
    slug,
    title,
    period,
    blurb,
    image,
    skills,
    links,
  }));

  return (
    <main className="relative w-full overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(projectsSchema) }}
      />
      <div className="cq container pt-48 pb-16 sm:pt-52">
        {/* Header */}
        <div className="space-y-5 motion-safe:animate-fade-in-up">
          <h1 className="font-oswald text-3xl font-bold tracking-tight text-cyan-300/90 sm:text-4xl lg:text-6xl">
            Engineering Portfolio
          </h1>

          <p className="max-w-[720px] text-base text-gray-300/85 sm:text-lg">
            Production-ready applications and systems showcasing full-stack development expertise,
            scalable architecture design, and modern engineering practices.
          </p>
        </div>

        {/* Projects only */}
        <React.Suspense fallback={null}>
          <div className="motion-safe:animate-fade-in-up" style={{ animationDelay: "160ms" }}>
            <SkillsAndCases projects={projectListItems} />
          </div>
        </React.Suspense>
      </div>
    </main>
  );
}
