"use client";

import { useMemo, useRef } from "react";
import type { MutableRefObject } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import MarqueeRow from "./MarqueeRow";

const SKILLS_HEADING = "SKILLS";
const ROW_REVEAL_OFFSET = 0.15;
const MARQUEE_ENTRY_OFFSET = 14;
const REVEAL_SCROLL_DISTANCE_FACTOR = 0.6;
const SKILLS_PIN_SCROLL_DISTANCE = 0.95;
const SKILLS_PIN_START = "center center";
const ABOUT_STACK_BELOW_SKILLS = -10;
const ABOUT_STACK_OVERLAY = 80;
const ABOUT_OVERLAY_INITIAL = {
  yPercent: 5,
  scale: 0.82,
  autoAlpha: 0,
  clipPath: "inset(22% 14% 18% 14% round 72px)",
};
const ABOUT_OVERLAY_TARGET = {
  yPercent: -18,
  scale: 1,
  clipPath: "inset(0% 0% 0% 0%)",
};

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
  const rowsAboveRef = useRef<HTMLDivElement>(null);
  const rowsBelowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

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

  useGSAP(
    () => {
      const section = sectionRef.current;
      const heading = headingRef.current;
      const topRows = rowsAboveRef.current;
      const bottomRows = rowsBelowRef.current;
      const aboutSection = aboutSectionRef?.current ?? null;

      if (!heading || !section) {
        return;
      }

      const marqueeGroups = [topRows, bottomRows].filter(Boolean) as HTMLDivElement[];

      if (prefersReducedMotion) {
        gsap.set(section, { autoAlpha: 1 });
        gsap.set(heading, { autoAlpha: 1, yPercent: 0, scale: 1 });
        marqueeGroups.forEach((group) => {
          gsap.set(group, { autoAlpha: 1, xPercent: 0 });
        });
        if (aboutSection) {
          gsap.set(aboutSection, {
            autoAlpha: 1,
            yPercent: 0,
            scale: 1,
            clipPath: "none",
            zIndex: "",
          });
        }
        return;
      }

      gsap.set(section, { autoAlpha: 0 });
      gsap.set(heading, { autoAlpha: 0, yPercent: 12, scale: 0.9 });
      marqueeGroups.forEach((group) => {
        const isTopGroup = group === topRows;
        gsap.set(group, {
          autoAlpha: 0,
          xPercent: isTopGroup ? MARQUEE_ENTRY_OFFSET : -MARQUEE_ENTRY_OFFSET,
        });
      });
      if (aboutSection) {
        gsap.set(aboutSection, {
          ...ABOUT_OVERLAY_INITIAL,
          zIndex: ABOUT_STACK_BELOW_SKILLS,
        });
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
          start: "top 85%",
          end: () => "+=" + window.innerHeight * REVEAL_SCROLL_DISTANCE_FACTOR,
          scrub: true,
          onEnter: revealSection,
          onEnterBack: revealSection,
        },
      });

      let skillsPin: ScrollTrigger | null = null;

      skillsPin = ScrollTrigger.create({
        trigger: section,
        start: SKILLS_PIN_START,
        end: () => "+=" + window.innerHeight * SKILLS_PIN_SCROLL_DISTANCE,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      timeline.to(heading, {
        autoAlpha: 1,
        yPercent: 0,
        scale: 1,
        duration: 0.85,
        ease: "power3.out",
      });

      if (topRows) {
        timeline.to(
          topRows,
          {
            autoAlpha: 1,
            xPercent: 0,
            duration: 0.85,
            ease: "power3.out",
          },
          ROW_REVEAL_OFFSET,
        );
      }

      if (bottomRows) {
        timeline.to(
          bottomRows,
          {
            autoAlpha: 1,
            xPercent: 0,
            duration: 0.85,
            ease: "power3.out",
          },
          ROW_REVEAL_OFFSET + 0.1,
        );
      }

      let aboutReleaseTween: gsap.core.Tween | null = null;

      if (aboutSection) {
        timeline.to(
          aboutSection,
          {
            ...ABOUT_OVERLAY_TARGET,
            autoAlpha: 1,
            duration: 1.15,
            ease: "power4.out",
            boxShadow: "0 35px 120px rgba(0,0,0,0.55)",
            onStart: () => {
              gsap.set(aboutSection, { zIndex: ABOUT_STACK_OVERLAY });
            },
          },
          ">-0.15",
        );

        aboutReleaseTween = gsap.to(aboutSection, {
          yPercent: 0,
          scale: 1,
          clipPath: "none",
          boxShadow: "none",
          ease: "power1.out",
          scrollTrigger: {
            trigger: aboutSection,
            start: "top 80%",
            end: "top top",
            scrub: true,
          },
        });
      }

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        if (aboutSection) {
          gsap.set(aboutSection, {
            autoAlpha: 1,
            yPercent: 0,
            scale: 1,
            clipPath: "none",
            zIndex: "",
          });
        }
        aboutReleaseTween?.scrollTrigger?.kill();
        aboutReleaseTween?.kill();
        skillsPin?.kill();
      };
    },
    {
      scope: sectionRef,
      dependencies: [prefersReducedMotion, aboutSectionRef],
    },
  );

  return (
    <section
      ref={sectionRef}
      className="flex w-full min-h-[110vh] flex-col gap-6 py-12 sm:gap-8 sm:py-16 lg:py-20"
      aria-labelledby="skills-heading"
    >
      <div
        ref={rowsAboveRef}
        className="space-y-2 sm:space-y-3"
        style={{ opacity: prefersReducedMotion ? 1 : 0 }}
      >
        {rowsAbove.map((config, index) => (
          <MarqueeRow
            items={config.items}
            duration={config.duration ?? 56}
            direction={config.direction as "left" | "right"}
            key={`skills-top-${index}`}
          />
        ))}
      </div>
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center overflow-hidden ">
        <h2
          id="skills-heading"
          ref={headingRef}
          data-testid="SkillsHeading"
          className="whitespace-nowrap text-center text-[clamp(4rem,18vw,18rem)] font-black uppercase leading-[0.85] tracking-[0.15em] text-white/80"
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
