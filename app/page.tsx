import type { Metadata } from "next";

import Hero from "@/app/(home)/_components";
import SkillsHeading, { SkillsMarqueeRowConfig } from "@/app/(home)/_components/SkillsHeading";
import { useMemo } from "react";

const PAGE_TITLE = "Jayvic San Antonio | Senior Software Engineer";
const PAGE_DESCRIPTION =
  "Bay Area-based full-stack engineer building high-performance web experiences and reliable systems.";
const SR_HEADING = "Jayvic San Antonio — Full-Stack Software Engineer";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
};

const SKILLS: string[] = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Hono",
  "Cloudflare Workers",
  "Vercel Edge",
  "Tailwind CSS",
  "Framer Motion",
  "Zod",
  "Prisma",
  "PostgreSQL",
  "Redis",
  "MySQL",
  "SQLite",
  "REST APIs",
  "Playwright",
  "Vitest",
  "Cypress",
  "GitHub Actions",
  "Amazon Web Services",
  "Google Cloud Platform",
  "Vercel",
  "Docker",
];

export default function Page() {
  const row0 = useMemo(() => SKILLS.filter((_, index) => index % 4 === 0), []);
  const row1 = useMemo(() => SKILLS.filter((_, index) => index % 4 === 1), []);
  const row2 = useMemo(() => SKILLS.filter((_, index) => index % 4 === 2), []);
  const row3 = useMemo(() => SKILLS.filter((_, index) => index % 4 === 3), []);
  const marqueeRowsAbove = useMemo<SkillsMarqueeRowConfig[]>(
    () => [
      { items: row0, duration: 32, direction: "left" },
      { items: row1, duration: 38, direction: "right" },
      { items: row2, duration: 44, direction: "left" },
      { items: row3, duration: 50, direction: "right" },
    ],
    [row0, row1, row2, row3],
  );
  const marqueeRowsBelow = useMemo<SkillsMarqueeRowConfig[]>(
    () => [
      { items: row0, duration: 56, direction: "left" },
      { items: row1, duration: 62, direction: "right" },
      { items: row2, direction: "left", duration: 68 },
      { items: row3, direction: "right", duration: 74 },
    ],
    [row0, row1, row2, row3],
  );

  return (
    <main>
      <h1 className="sr-only">{SR_HEADING}</h1>
      <Hero>
        <SkillsHeading rowsAbove={marqueeRowsAbove} rowsBelow={marqueeRowsBelow} />
      </Hero>
    </main>
  );
}
