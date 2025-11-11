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
const REVEAL_SCROLL_DISTANCE_FACTOR = 0.45;

export type MarqueeRowConfig = {
  items: string[];
  duration?: number;
  direction?: "left" | "right";
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

  const row0 = useMemo(() => SKILLS.filter((_, index) => index % 4 === 0), []);
  const row1 = useMemo(() => SKILLS.filter((_, index) => index % 4 === 1), []);
  const row2 = useMemo(() => SKILLS.filter((_, index) => index % 4 === 2), []);
  const row3 = useMemo(() => SKILLS.filter((_, index) => index % 4 === 3), []);

  const rowsBelow = useMemo<MarqueeRowConfig[]>(
    () => [
      { items: row0, duration: 56, direction: "left" },
      { items: row1, duration: 62, direction: "right" },
      { items: row2, direction: "left", duration: 68 },
      { items: row3, direction: "right", duration: 74 },
    ],
    [row0, row1, row2, row3],
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
          start: "center 65%",
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
      className="w-full py-12 sm:py-16 lg:py-20 h-[120vh]"
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
