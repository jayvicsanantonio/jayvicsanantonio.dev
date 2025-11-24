"use client";

import { useMemo, useRef, type MutableRefObject } from "react";

import MarqueeRow from "./MarqueeRow";

const SKILLS_HEADING = "SKILLS";

export type MarqueeRowConfig = {
  items: string[];
  duration?: number;
  direction?: "left" | "right";
};

const SKILLS: string[] = [
  "JavaScript",
  "TypeScript",
  "React",
  "NextJS",
  "Tailwind CSS",
  "Shadcn UI",
  "Framer Motion",
  "React Native",
  "Expo",
  "EmberJS",
  "HTML",
  "CSS",
  "Sass",
  "SVG",
  "Accessibility",
  "VS Code Extensions",
  "Zed Extensions",
  "NodeJS",
  "Hono",
  "Express",
  "Cloudflare Workers",
  "Vercel Edge",
  "REST APIs",
  "SailsJS",
  "Socket.IO",
  "Rate Limiting",
  "Caching",
  "Session Management",
  "Authentication",
  "Authorization",
  "Prisma",
  "PostgreSQL",
  "MySQL",
  "SQLite",
  "MongoDB",
  "Redis",
  "Zod",
  "Vitest",
  "React Testing Library",
  "Jest",
  "Playwright",
  "Cypress",
  "GitHub Actions",
  "Jenkins",
  "CI/CD",
  "Amazon Web Services",
  "Vercel",
  "Google Cloud",
  "Cloudflare",
  "Netlify",
  "Git",
  "Cursor",
  "Warp.dev",
  "Claude Code",
  "Gemini CLI",
  "Windsurf",
  "GitHub Copilot",
  "OpenRouter",
  "Cline",
  "VS Code",
  "Zed",
  "AI SDK",
  "OpenAI SDK",
  "ChatGPT",
  "Perplexity",
  "Comet",
  "LangChain",
  "Amazon Bedrock",
  "Amazon Rekognition",
  "Google AI Studio",
  "Chrome Builti-in AI API",
  "Groq API",
  "AI Agents",
  "Multi-Agent Orchestration",
  "Google GenAI SDK",
];

type SkillsRefs = {
  sectionRef?: MutableRefObject<HTMLElement | null> | null;
  rowsAboveRefs?: MutableRefObject<Array<HTMLDivElement | null>> | null;
  rowsBelowRefs?: MutableRefObject<Array<HTMLDivElement | null>> | null;
  headingRef?: MutableRefObject<HTMLHeadingElement | null> | null;
};

export default function Skills(props: SkillsRefs = {}) {
  const { sectionRef, rowsAboveRefs, rowsBelowRefs, headingRef } = props;
  const fallbackSectionRef = useRef<HTMLElement>(null);
  const fallbackRowsAboveRefs = useRef<Array<HTMLDivElement | null>>([]);
  const fallbackRowsBelowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const fallbackHeadingRef = useRef<HTMLHeadingElement>(null);
  const sectionElementRef = sectionRef ?? fallbackSectionRef;
  const rowsAboveStore = rowsAboveRefs ?? fallbackRowsAboveRefs;
  const rowsBelowStore = rowsBelowRefs ?? fallbackRowsBelowRefs;
  const headingElementRef = headingRef ?? fallbackHeadingRef;
  const row0 = useMemo(() => SKILLS.filter((_, index) => index % 6 === 0), []);
  const row1 = useMemo(() => SKILLS.filter((_, index) => index % 6 === 1), []);
  const row2 = useMemo(() => SKILLS.filter((_, index) => index % 6 === 2), []);
  const row3 = useMemo(() => SKILLS.filter((_, index) => index % 6 === 3), []);
  const row4 = useMemo(() => SKILLS.filter((_, index) => index % 6 === 4), []);
  const row5 = useMemo(() => SKILLS.filter((_, index) => index % 6 === 5), []);

  const rowsAbove = useMemo<MarqueeRowConfig[]>(
    () => [
      { items: row0, duration: 56, direction: "left" },
      { items: row1, duration: 62, direction: "right" },
      { items: row2, duration: 68, direction: "left" },
    ],
    [row0, row1, row2],
  );

  const rowsBelow = useMemo<MarqueeRowConfig[]>(
    () => [
      { items: row3, duration: 74, direction: "right" },
      { items: row4, duration: 80, direction: "left" },
      { items: row5, duration: 86, direction: "right" },
    ],
    [row3, row4, row5],
  );

  return (
    <section
      ref={sectionElementRef}
      className="flex w-full min-h-[150vh] flex-col gap-6 py-12 sm:gap-8 sm:py-16 lg:py-20"
      aria-labelledby="skills-heading"
    >
      <div className="space-y-2 sm:space-y-3">
        {rowsAbove.map((config, index) => (
          <MarqueeRow
            items={config.items}
            duration={config.duration ?? 56}
            direction={config.direction as "left" | "right"}
            key={`skills-top-${index}`}
            ref={(el) => {
              rowsAboveStore.current[index] = el;
            }}
          />
        ))}
      </div>
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center overflow-hidden ">
        <h2
          ref={headingElementRef}
          id="skills-heading"
          data-testid="SkillsHeading"
          className="whitespace-nowrap text-center text-[clamp(4rem,18vw,18rem)] font-black uppercase leading-[0.85] tracking-[0.15em] text-white/80"
        >
          {SKILLS_HEADING}
        </h2>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {rowsBelow.map((config, index) => (
          <MarqueeRow
            items={config.items}
            duration={config.duration ?? 56}
            direction={config.direction as "left" | "right"}
            key={`skills-bottom-${index}`}
            ref={(el) => {
              rowsBelowStore.current[index] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}
