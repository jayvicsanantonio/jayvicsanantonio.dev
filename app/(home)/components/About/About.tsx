"use client";

import type { RefObject } from "react";

export default function About({ aboutRef }: { aboutRef: RefObject<HTMLDivElement> }) {
  return (
    <section
      ref={aboutRef}
      className="relative isolate z-[70] flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#022b37] px-20 py-16 text-white sm:py-20"
      aria-label="About Jayvic San Antonio"
    >
      <div className="relative z-[80] flex w-full  flex-col items-center gap-12 md:flex-row md:items-center">
        <div className="flex w-full flex-shrink-0 items-center justify-center md:w-2/5">
          <span className="inline-block -rotate-90 whitespace-nowrap text-center text-[clamp(8rem,32vw,40rem)] font-black uppercase leading-[0.75] tracking-widest text-white/80">
            About
          </span>
        </div>
        <div className="w-full space-y-28 text-4xl leading-relaxed text-white/80 md:w-3/5 md:pl-12">
          <p>
            I&apos;m Jayvic San Antonio, a Filipino full-stack software engineer building in the San
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
