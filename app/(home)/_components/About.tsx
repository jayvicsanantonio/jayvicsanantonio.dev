"use client";

import type { FC, Ref } from "react";

export const HERO_ABOUT_SECTION_ID = "hero-about-section";

export type AboutProps = {
  sectionRef?: Ref<HTMLDivElement>;
  labelRef?: Ref<HTMLDivElement>;
  bodyRef?: Ref<HTMLDivElement>;
};

type AboutComponent = FC<AboutProps> & {
  heroSectionId: string;
};

const About: AboutComponent = ({ sectionRef, labelRef, bodyRef }) => {
  return (
    <section
      ref={sectionRef}
      className="relative isolate z-[70] flex min-h-screen w-full items-center justify-center overflow-hidden bg-transparent px-6 py-16 text-white sm:py-20"
      aria-label="About Jayvic San Antonio"
    >
      <div className="relative z-[80] mx-auto flex w-full max-w-6xl flex-col items-center gap-10 md:flex-row md:items-stretch">
        <div
          ref={labelRef}
          className="flex w-full shrink-0 flex-col items-center justify-center text-center md:w-auto md:items-end md:justify-between md:pr-10"
        >
          <span className="font-black uppercase leading-none text-white/15 [letter-spacing:-0.06em] [text-shadow:0_18px_40px_rgba(2,6,23,0.75)] sm:text-[clamp(7rem,18vw,18rem)] md:[writing-mode:vertical-rl] md:text-[clamp(10rem,20vw,24rem)] md:[letter-spacing:-0.02em] md:rotate-180">
            about
          </span>
        </div>
        <div ref={bodyRef} className="flex w-full max-w-2xl flex-col gap-8 text-left text-white">
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
      </div>
    </section>
  );
};

About.heroSectionId = HERO_ABOUT_SECTION_ID;

export default About;
