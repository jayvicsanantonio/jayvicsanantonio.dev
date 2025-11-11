"use client";

import { useMemo, useRef } from "react";
import type { MutableRefObject, RefObject } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import MarqueeRow from "./MarqueeRow";

const SKILLS_HEADING = "SKILLS";
const ROW_REVEAL_OFFSET = 0.15;
const REVEAL_SCROLL_DISTANCE_FACTOR = 0.75;

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

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SkillsProps = {
  sectionRef?: MutableRefObject<HTMLElement | null>;
  aboutSectionRef?: MutableRefObject<HTMLDivElement | null>;
};

export default function Skills({
  sectionRef: externalSectionRef,
  aboutSectionRef,
}: SkillsProps = {}) {
  const fallbackSectionRef = useRef<HTMLElement>(null);
  const sectionRef = externalSectionRef ?? fallbackSectionRef;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rowsBelowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const row0 = useMemo(() => SKILLS.filter((_, index) => index % 6 === 0), []);
  const row1 = useMemo(() => SKILLS.filter((_, index) => index % 6 === 1), []);
  const row2 = useMemo(() => SKILLS.filter((_, index) => index % 6 === 2), []);
  const row3 = useMemo(() => SKILLS.filter((_, index) => index % 6 === 3), []);
  const row4 = useMemo(() => SKILLS.filter((_, index) => index % 6 === 4), []);
  const row5 = useMemo(() => SKILLS.filter((_, index) => index % 6 === 5), []);

  const rowsBelow = useMemo<MarqueeRowConfig[]>(
    () => [
      { items: row0, duration: 56, direction: "left" },
      { items: row1, duration: 62, direction: "right" },
      { items: row2, direction: "left", duration: 68 },
      { items: row3, direction: "right", duration: 74 },
      { items: row4, direction: "left", duration: 80 },
      { items: row5, direction: "right", duration: 86 },
    ],
    [row0, row1, row2, row3, row4, row5],
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      const heading = headingRef.current;
      const bottomRows = rowsBelowRef.current;
      const aboutSection = aboutSectionRef?.current ?? null;

      if (!heading || !section) {
        return;
      }

      const marqueeGroups = [bottomRows].filter(Boolean) as HTMLDivElement[];

      if (prefersReducedMotion) {
        gsap.set(section, { autoAlpha: 1 });
        gsap.set(heading, { autoAlpha: 1, xPercent: 0 });
        if (aboutSection) {
          gsap.set(aboutSection, { autoAlpha: 1 });
        }
        return;
      }

      gsap.set(section, { autoAlpha: 0 });
      gsap.set(heading, { xPercent: 100, autoAlpha: 1 });
      if (aboutSection) {
        gsap.set(aboutSection, { autoAlpha: 0 });
      }

      let hasRevealedSection = false;
      const revealSection = () => {
        if (hasRevealedSection) return;
        hasRevealedSection = true;
        gsap.set(section, { autoAlpha: 1 });
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: "center 90%",
          end: () => "+=" + window.innerHeight * REVEAL_SCROLL_DISTANCE_FACTOR,
          scrub: true,
          onEnter: revealSection,
          onEnterBack: revealSection,
        },
      });

      timeline
        .to(heading, {
          xPercent: -100,
          duration: 1,
          ease: "none",
        })
        .to(marqueeGroups, { autoAlpha: 1, duration: 0.55, ease: "power3.out" }, ROW_REVEAL_OFFSET);

      if (aboutSection) {
        timeline.to(
          aboutSection,
          {
            autoAlpha: 1,
            duration: 0.65,
            ease: "power2.out",
          },
          ">-0.15",
        );
      }

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        if (aboutSection) {
          gsap.set(aboutSection, { autoAlpha: 1 });
        }
      };
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 sm:py-16 lg:py-20 h-[140vh]"
      aria-labelledby="skills-heading"
    >
      <div className="relative flex overflow-hidden py-10 sm:py-14">
        <h2
          id="skills-heading"
          ref={headingRef}
          data-testid="SkillsHeading"
          className="whitespace-nowrap text-center text-[clamp(8rem,32vw,40rem)] font-black uppercase leading-[0.75] tracking-widest text-white/80 "
          style={{ willChange: prefersReducedMotion ? undefined : "transform" }}
        >
          {SKILLS_HEADING}
        </h2>
      </div>
      <div
        ref={rowsBelowRef}
        className="space-y-2 sm:space-y-3"
        style={{ opacity: prefersReducedMotion ? 1 : 0 }}
      >
        {rowsBelow.map((config, index) => (
          <MarqueeRow
            marqueeRowRef={rowsBelowRef as unknown as RefObject<HTMLDivElement>}
            items={config.items}
            duration={config.duration ?? 56}
            direction={config.direction as "left" | "right"}
            key={`skills-bottom-${index}`}
          />
        ))}
      </div>
    </section>
  );
}
