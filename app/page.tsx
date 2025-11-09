import type { Metadata } from "next";

import Hero from "@/app/(home)/_components";
import { MarqueeRow } from "@/app/(home)/_components/MarqueeRow";
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

  return (
    <main>
      <h1 className="sr-only">{SR_HEADING}</h1>
      <Hero>
        <section aria-hidden className="h-[52vh] mx-auto mt-4 w-full max-w-6xl space-y-2">
          <MarqueeRow items={row0} duration={36} direction="left" />
          <MarqueeRow items={row1} duration={42} direction="right" />
          <MarqueeRow items={row2} duration={48} direction="left" />
          <MarqueeRow items={row3} duration={54} direction="right" />
        </section>
      </Hero>
    </main>
  );
}
