"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const SKILLS_HEADING = "SKILLS";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SkillsHeading() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const heading = headingRef.current;

      if (!heading) {
        return;
      }

      const letters = heading.querySelectorAll<HTMLElement>("[data-letter]");

      if (!letters.length) {
        return;
      }

      if (prefersReducedMotion) {
        gsap.set(letters, { autoAlpha: 1, x: 0 });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          once: true,
        },
      });

      timeline.set(letters, {
        autoAlpha: 0,
        x: () => window.innerWidth * 0.6,
      });

      timeline.to(letters, {
        autoAlpha: 1,
        x: 0,
        duration: 0.45,
        ease: "power3.out",
        stagger: 0.13,
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { scope: headingRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <div className="relative mx-auto flex w-full max-w-6xl justify-center px-4 py-10 sm:py-16 lg:py-20">
      <h2
        ref={headingRef}
        data-testid="SkillsHeading"
        className="flex w-full items-center justify-center gap-[0.08em] text-[clamp(4rem,16vw,12rem)] font-black uppercase leading-[0.85] tracking-[0.22em] text-white/70"
      >
        {Array.from(SKILLS_HEADING).map((letter, index) => (
          <span key={`${letter}-${index}`} data-letter className="inline-block text-white drop-shadow-[0_10px_35px_rgba(2,6,23,0.65)]">
            {letter}
          </span>
        ))}
      </h2>
    </div>
  );
}
