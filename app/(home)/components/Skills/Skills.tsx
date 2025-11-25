"use client";

import { useMemo, useRef, type MutableRefObject } from "react";

import MarqueeRow from "./MarqueeRow";

import { SKILLS, SKILLS_HEADING } from "../../data/skills-data";

export type MarqueeRowConfig = {
  items: string[];
  duration?: number;
  direction?: "left" | "right";
};

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
      className="relative z-0 flex w-full min-h-screen flex-col gap-6 py-12 sm:gap-8 sm:py-16 lg:py-20"
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
