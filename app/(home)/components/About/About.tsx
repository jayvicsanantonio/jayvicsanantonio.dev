"use client";

import type { RefObject } from "react";

export default function About({ aboutRef }: { aboutRef: RefObject<HTMLDivElement> }) {
  return (
    <section
      ref={aboutRef}
      className="relative isolate z-[70] flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#022b37] px-6 py-16 text-white sm:py-20"
      aria-label="About Jayvic San Antonio"
    >
      <div className="relative z-[80] mx-auto flex w-full max-w-6xl flex-col items-center gap-10 md:flex-row md:items-stretch">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-cyan-200">Profile</p>
          <h3 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Hi, I&apos;m Jayvic — an engineer obsessed with expressive interfaces, performant
            systems, and principled collaboration.
          </h3>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-white/80">
          <p>
            I&apos;ve spent the last decade translating ambitious ideas into dependable products:
            building scrappy MVPs, scaling revenue-critical features, and guiding teams through
            complex launches.
          </p>
          <p>
            Today I pair design instincts with systems thinking to craft web experiences that feel
            alive, stay accessible, and remain fast under pressure.
          </p>
        </div>
        <div className="space-y-4 border-t border-white/15 pt-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200">
              Currently
            </p>
            <p className="mt-2 text-xl font-semibold leading-tight text-white">
              Shipping high-touch experiences from the San Francisco Bay Area.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-base text-white/80 sm:flex-row sm:items-center sm:justify-between">
            <span>Open to collaborations & leadership roles.</span>
            <a
              href="mailto:hi@jayvicsanantonio.dev"
              className="text-cyan-200 underline-offset-4 transition-colors hover:text-cyan-100"
            >
              hi@jayvicsanantonio.dev
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
