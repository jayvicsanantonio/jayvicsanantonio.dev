"use client";

import type { MutableRefObject } from "react";

type AboutProps = {
  sectionRef?: MutableRefObject<HTMLElement | null> | null;
};

export default function About({ sectionRef }: AboutProps) {
  return (
    <section
      ref={sectionRef ?? undefined}
      className="relative isolate z-[70] flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#022b37] px-20 text-white"
      aria-label="About Jayvic San Antonio"
    >
      <div className="relative z-[80] mx-auto flex w-full max-w-[92rem] flex-col items-center gap-12 md:flex-row md:items-center">
        <div className="flex w-full flex-shrink-0 justify-center md:w-2/5">
          <div className="relative flex h-full min-h-[200vh] w-full items-center justify-center overflow-hidden">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -rotate-90 whitespace-nowrap text-center text-[clamp(8rem,32vw,40rem)] font-black uppercase leading-[0.75] tracking-widest text-white/80">
              About
            </span>
          </div>
        </div>
        <div className="mt-[28rem] w-full space-y-28 text-4xl leading-relaxed text-white/80 md:mt-0 md:w-3/5 md:pl-12">
          <p>
            I&apos;m Jayvic San Antonio, a Filipino Full-Stack Software Engineer building in the San
            Francisco Bay Area, and I care deeply about craft, clarity, and shipping work people
            actually enjoy using.
          </p>
          <p>
            I&apos;ve worn many hats, from co-founding a scrappy startup and winning hackathons to
            rebuilding revenue-critical systems at scale, and I stay grounded in reliability,
            accessibility, and thoughtful design.
          </p>
          <p className="text-white">
            These days I&apos;m sharpening my web and AI toolkit while sneaking in Pokemon Go walks,
            Star Wars collecting, and early coffee. If you&apos;re building something ambitious and
            care about the details, reach me at{" "}
            <a
              href="mailto:hi@jayvicsanantonio.dev"
              className="text-cyan-200 underline-offset-4 transition-colors hover:text-cyan-100"
            >
              hi@jayvicsanantonio.dev
            </a>
            , on{" "}
            <a
              href="https://www.linkedin.com/in/jayvicsanantonio/"
              className="text-cyan-200 underline-offset-4 transition-colors hover:text-cyan-100"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            , or through my{" "}
            <a
              href="/projects"
              className="text-cyan-200 underline-offset-4 transition-colors hover:text-cyan-100"
            >
              projects
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
