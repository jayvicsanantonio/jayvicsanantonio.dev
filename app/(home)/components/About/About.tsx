"use client";

import { useRef } from "react";
import { useAboutAnimation } from "../../hooks/use-about-animation";
import { useHeroContext } from "../../context/HeroContext";

export default function About() {
  const { aboutSectionRef: sectionRef } = useHeroContext();
  const labelRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const paragraph1Ref = useRef<HTMLParagraphElement>(null);
  const paragraph2Ref = useRef<HTMLParagraphElement>(null);

  useAboutAnimation({
    sectionRef,
    labelRef,
    letterRefs,
    paragraph1Ref,
    paragraph2Ref,
  });

  const addToLetterRefs = (el: HTMLSpanElement | null) => {
    if (el && !letterRefs.current.includes(el)) {
      letterRefs.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate z-[2000] flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#022b37] px-20 text-white"
      aria-label="About Jayvic San Antonio"
    >
      <div className="relative z-[80] mx-auto flex w-full max-w-[92rem] flex-col items-center gap-12 md:flex-row md:items-center">
        <div className="flex w-full flex-shrink-0 justify-center md:w-2/5">
          <div className="relative flex h-full min-h-[200vh] w-full items-center justify-center overflow-visible">
            <span
              ref={labelRef}
              className="absolute top-0 left-1/2 flex -translate-x-1/2 -rotate-90 whitespace-nowrap text-center text-[clamp(8rem,32vw,40rem)] font-black uppercase leading-[0.75] tracking-widest text-white/80 will-change-transform"
            >
              {"ABOUT".split("").map((letter, i) => (
                <span key={i} ref={addToLetterRefs} className="inline-block">
                  {letter}
                </span>
              ))}
            </span>
          </div>
        </div>
        <div className="mt-[28rem] w-full space-y-28 text-4xl leading-relaxed text-white/80 md:mt-0 md:w-3/5 md:pl-12">
          <p className="">
            I&apos;m Jayvic San Antonio, a Filipino Full-Stack Software Engineer building in the San
            Francisco Bay Area, and I care deeply about craft, clarity, and shipping work people
            actually enjoy using.
          </p>
          <p ref={paragraph1Ref} className="will-change-transform">
            I&apos;ve worn many hats, from co-founding a scrappy startup and winning hackathons to
            rebuilding revenue-critical systems at scale, and I stay grounded in reliability,
            accessibility, and thoughtful design.
          </p>
          <p ref={paragraph2Ref} className="text-white will-change-transform">
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
