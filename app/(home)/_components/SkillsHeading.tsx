"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import { MarqueeRow } from "./MarqueeRow";

const SKILLS_HEADING = "SKILLS";
const ROW_REVEAL_OFFSET = 0.15;

export type SkillsMarqueeRowConfig = {
  items: string[];
  duration?: number;
  direction?: "left" | "right";
};

type SkillsHeadingProps = {
  rowsAbove: SkillsMarqueeRowConfig[];
  rowsBelow: SkillsMarqueeRowConfig[];
};

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SkillsHeading({ rowsAbove, rowsBelow }: SkillsHeadingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rowsAboveRef = useRef<HTMLDivElement>(null);
  const rowsBelowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const heading = headingRef.current;
      const topRows = rowsAboveRef.current;
      const bottomRows = rowsBelowRef.current;

      if (!heading || !section) {
        return;
      }

      const letters = heading.querySelectorAll<HTMLElement>("[data-letter]");
      const marqueeGroups = [topRows, bottomRows].filter(Boolean) as HTMLDivElement[];

      if (!letters.length) {
        if (marqueeGroups.length) {
          gsap.set(marqueeGroups, { autoAlpha: 1, y: 0 });
        }
        return;
      }

      if (prefersReducedMotion) {
        gsap.set(section, { autoAlpha: 1 });
        gsap.set(letters, { autoAlpha: 1, x: 0 });
        if (marqueeGroups.length) {
          gsap.set(marqueeGroups, { autoAlpha: 1, y: 0 });
        }
        return;
      }

      gsap.set(section, { autoAlpha: 0 });

      let hasRevealedSection = false;
      const revealSection = () => {
        if (hasRevealedSection) return;
        hasRevealedSection = true;
        gsap.set(section, { autoAlpha: 1 });
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: "top 70%",
          end: "top 30%",
          scrub: true,
          onEnter: revealSection,
          onEnterBack: revealSection,
        },
      });

      timeline
        .set(letters, {
          autoAlpha: 0,
          x: () => window.innerWidth * 0.6,
        })
        .set(marqueeGroups, { autoAlpha: 0, y: 30 }, 0)
        .to(letters, {
          autoAlpha: 1,
          x: 0,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.13,
        })
        .to(
          marqueeGroups,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.08,
          },
          ROW_REVEAL_OFFSET,
        );

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16 lg:py-20"
      aria-labelledby="skills-heading"
    >
      <div
        ref={rowsAboveRef}
        className="space-y-2 sm:space-y-3"
        style={{ opacity: prefersReducedMotion ? 1 : 0 }}
      >
        {rowsAbove.map((config, index) => (
          <MarqueeRow key={`skills-top-${index}`} {...config} />
        ))}
      </div>
      <div className="relative flex justify-center py-10 sm:py-14">
        <h2
          id="skills-heading"
          ref={headingRef}
          data-testid="SkillsHeading"
          className="flex w-full items-center justify-center gap-[0.08em] text-[clamp(4rem,16vw,12rem)] font-black uppercase leading-[0.85] tracking-[0.22em] text-white/70"
        >
          {Array.from(SKILLS_HEADING).map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              data-letter
              className="inline-block text-white drop-shadow-[0_10px_35px_rgba(2,6,23,0.65)]"
            >
              {letter}
            </span>
          ))}
        </h2>
      </div>
      <div
        ref={rowsBelowRef}
        className="space-y-2 sm:space-y-3"
        style={{ opacity: prefersReducedMotion ? 1 : 0 }}
      >
        {rowsBelow.map((config, index) => (
          <MarqueeRow key={`skills-bottom-${index}`} {...config} />
        ))}
      </div>
    </section>
  );
}
