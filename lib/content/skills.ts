import { cacheLife } from "next/cache";

import type { SkillSection } from "./types";

const SKILL_SECTIONS_DATA: readonly SkillSection[] = [
  {
    title: "Frontend",
    accentClass: "text-cyan-300",
    items: [
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
    ],
  },
  {
    title: "Backend and Edge",
    accentClass: "text-purple-300",
    items: [
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
    ],
  },
  {
    title: "Data",
    accentClass: "text-emerald-300",
    items: ["Prisma", "Drizzle", "PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "Firebase"],
  },
  {
    title: "Quality and Testing",
    accentClass: "text-orange-300",
    items: [
      "Zod",
      "Vitest",
      "React Testing Library",
      "Jest",
      "Playwright",
      "Cypress",
      "GitHub Actions",
      "Jenkins",
      "CI/CD",
    ],
  },
  {
    title: "DevOps and Tooling",
    accentClass: "text-rose-300",
    items: ["Amazon Web Services", "Vercel", "Cloudflare", "Netlify", "Docker", "Git"],
  },
  {
    title: "AI and Productivity",
    accentClass: "text-indigo-300",
    items: [
      "Cursor",
      "Warp.dev",
      "Claude Code",
      "Gemini CLI",
      "GitHub Copilot",
      "OpenRouter",
      "Windsurf",
      "Cline",
      "VS Code",
      "Zed",
      "Gemini",
      "ChatGPT",
      "Perplexity",
      "Comet",
      "LangChain",
      "v0",
      "Bolt.new",
      "Lovable",
      "Google AI Studio",
      "Google Workspace",
      "Linear",
      "Jira",
    ],
  },
] satisfies readonly SkillSection[];

export const SKILL_SECTIONS = SKILL_SECTIONS_DATA;

export async function getSkillSections(): Promise<readonly SkillSection[]> {
  "use cache";
  cacheLife("days");
  return SKILL_SECTIONS_DATA;
}
