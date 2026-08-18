"use client";


import MarqueeRow from "./MarqueeRow";

const SKILLS_HEADING = "SKILLS";

import { MarqueeRowConfig } from "../../types";

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

const ROW_COUNT = 6;
const skillsInRow = (row: number) => SKILLS.filter((_, index) => index % ROW_COUNT === row);

const ROWS_ABOVE: MarqueeRowConfig[] = [
  { items: skillsInRow(0), duration: 56, direction: "left" },
  { items: skillsInRow(1), duration: 62, direction: "right" },
  { items: skillsInRow(2), duration: 68, direction: "left" },
];

const ROWS_BELOW: MarqueeRowConfig[] = [
  { items: skillsInRow(3), duration: 74, direction: "right" },
  { items: skillsInRow(4), duration: 80, direction: "left" },
  { items: skillsInRow(5), duration: 86, direction: "right" },
];

import { useHeroContext } from "../../context/HeroContext";

export default function Skills() {
  const {
    skillsSectionRef: sectionRef,
    skillsRowsAboveRefs: rowsAboveRefs,
    skillsRowsBelowRefs: rowsBelowRefs,
    skillsHeadingRef: headingRef,
  } = useHeroContext();


  return (
    <section
      ref={sectionRef}
      className="relative z-0 flex w-full min-h-screen flex-col gap-6 py-12 sm:gap-8 sm:py-16 lg:py-20"
      aria-labelledby="skills-heading"
    >
      <div className="space-y-2 sm:space-y-3">
        {ROWS_ABOVE.map((config, index) => (
          <MarqueeRow
            key={`skills-top-${index}`}
            {...config}
            ref={(el) => {
              if (rowsAboveRefs.current) {
                rowsAboveRefs.current[index] = el;
              }
            }}
          />
        ))}
      </div>
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center overflow-hidden ">
        <h2
          ref={headingRef}
          id="skills-heading"
          data-testid="SkillsHeading"
          className="whitespace-nowrap text-center text-[clamp(4rem,18vw,18rem)] font-black uppercase leading-[0.85] tracking-[0.15em] text-white/80"
        >
          {SKILLS_HEADING}
        </h2>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {ROWS_BELOW.map((config, index) => (
          <MarqueeRow
            key={`skills-bottom-${index}`}
            {...config}
            ref={(el) => {
              if (rowsBelowRefs.current) {
                rowsBelowRefs.current[index] = el;
              }
            }}
          />
        ))}
      </div>
    </section>
  );
}
