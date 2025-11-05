"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";

import { CFG } from "@/app/(home)/_components/hero/config";
import InitialPillOverlay from "@/app/(home)/_components/hero/InitialPillOverlay.client";
import MorphingVideo from "@/app/(home)/_components/hero/MorphingVideo.client";
import ProfileImage from "@/app/(home)/_components/hero/ProfileImage.client";
import { useIntroSequence } from "@/app/(home)/_hooks/useIntroSequence";
import { useScrollCssVariables } from "@/app/(home)/_hooks/useScrollCssVariables";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import AnimatedSection from "./AnimatedSection.client";

// Lazy-load non-critical UI islands to reduce initial JS
const PrimaryNavOverlay = dynamic(
  () => import("@/app/(home)/_components/hero/PrimaryNavOverlay.client"),
  {
    ssr: false,
  },
);
const MobileNavRow = dynamic(() => import("@/app/(home)/_components/hero/MobileNavRow.client"), {
  ssr: false,
});
const FooterBrandCTA = dynamic(
  () => import("@/app/(home)/_components/hero/FooterBrandCTA.client"),
  {
    ssr: false,
  },
);
const BlackTransitionOverlay = dynamic(
  () => import("@/app/(home)/_components/BlackTransitionOverlay.client"),
  {
    ssr: false,
  },
);
export default function HeroMorph() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { initialPill, showTitleGroup, showDesc, showName, isExpanding, shouldPlayVideo } =
    useIntroSequence(CFG);
  const reduceMotion = usePrefersReducedMotion();

  useScrollCssVariables(
    containerRef,
    {
      scroll: CFG.scroll,
      closeMaxX: "calc((96vw - var(--nav-row-w, 20vw)) / 2)",
      closeMaxY: "calc((min(86svh, 86vh) - var(--pill-h, 8vh)) / 2)",
    },
    reduceMotion,
  );

  const isIntro = initialPill || isExpanding;
  const containerRadius = initialPill ? "9999px" : "calc(16px + 160px * var(--sh, 0))";

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden  bg-black [--nav-row-w:calc(3.5rem*4+0.75rem*3)] [--pill-h:54px] sm:[--nav-row-w:20vw] sm:[--pill-h:8vh] md:[--nav-row-w:24vw]"
    >
      <MorphingVideo
        centerTop={CFG.nav.centerTop}
        isIntro={isIntro}
        initialPill={initialPill}
        isExpanding={isExpanding}
        showTitleGroup={showTitleGroup}
        showDesc={showDesc}
        shouldPlayVideo={shouldPlayVideo}
        containerRadius={containerRadius}
        video={CFG.video}
      />

      {initialPill && <InitialPillOverlay />}

      <ProfileImage initialPill={initialPill} />

      <div className="pointer-events-none fixed inset-0 z-50">
        <PrimaryNavOverlay
          centerTop={CFG.nav.centerTop}
          leftOffsetsPx={CFG.nav.leftOffsetsPx}
          rightOffsetsPx={CFG.nav.rightOffsetsPx}
          buttonSize={CFG.nav.buttonSize}
        />

        <MobileNavRow />

        <FooterBrandCTA showName={showName} overlayUpDampen={CFG.overlayUpDampen} />
      </div>

      <BlackTransitionOverlay />

      <div className="relative z-10 w-full">
        <div className="absolute inset-0 h-[220svh] bg-gradient-to-b from-black via-gray-800 to-gray-200 will-change-transform md:h-[180svh] lg:h-[154rem]"></div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80vw 60vh at 50% 100%, rgba(0,139,139,0.2) 0%, rgba(0,139,139,0.1) 40%, transparent 70%)",
            opacity: "min(calc(var(--p, 0) * 2), 1)",
          }}
        />

        <section className="flex min-h-[220svh] flex-col items-center justify-center px-4 py-20 md:min-h-[180svh] lg:min-h-[250svh]"></section>
        <AnimatedSection largeText="ABOUT">
          <div className="space-y-4 text-lg text-gray-300">
            <p>
              I&apos;m Jayvic San Antonio, a full‑stack software engineer from the Philippines, now
              building in the San Francisco Bay Area. I&apos;ve spent more than a decade turning ideas
              into products people can actually use. I care about craft and about people. I write
              code that is easy to read, I obsess over how things feel, and I treat reliability like a
              feature. Clear contracts, thoughtful design, and automated checks help me ship with
              confidence and keep things fast and accessible for everyone.
            </p>
            <p>
              My path has been a mix of startup scrappiness and big‑company scale. I co‑founded a
              company back home, won a few hackathons, and learned how to rally a team around a rough
              idea. In the Bay Area I helped rebuild revenue‑critical features in a large advertising
              platform, scaled systems that needed to work under pressure, mentored newer engineers,
              and built tools that made everyone a little faster.
            </p>
            <p>
              Lately, I&apos;ve been building web applications with modern approaches to sharpen my
              craft and stay current. I&apos;ve also been learning more about AI, especially
              generative AI, context engineering, large language models, and MCPs, and I&apos;m using
              AI coding tools thoughtfully to become even more productive as an engineer. I&apos;m
              actively mastering these capabilities so I can move faster, make better decisions, and
              keep a real competitive edge.
            </p>
            <p>
              When I&apos;m not coding, I&apos;m getting my steps in Pokemon Go, collecting Star Wars
              Black Series figures, catching up on MCU movies and shows, and listening to Ed Sheeran.
              I like early-morning coffee, long walks with good podcasts, and shipping work I&apos;m
              proud to sign my name on.
            </p>
            <p>
              If you&apos;re working on something ambitious and care about the details, I&apos;d love
              to build with you. You can reach me at my{" "}
              <Link
                href="mailto:hi@jayvicsanantonio.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
              >
                email
              </Link>
              , find me on{" "}
              <Link
                href="https://www.linkedin.com/in/jayvicsanantonio"
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
              >
                LinkedIn
              </Link>
              , and see more of my work{" "}
              <Link
                href="/projects"
                rel="noopener noreferrer"
                className="relative text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
              >
                here
              </Link>
              .
            </p>
          </div>
        </AnimatedSection>
        <AnimatedSection largeText="CONTACT">
          <div className="space-y-4 text-lg text-gray-300">
            <p>Feel free to say hello:</p>
            <p>
              <Link
                href="mailto:hi@jayvicsanantonio.dev"
                className="relative text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
              >
                hi@jayvicsanantonio.dev
              </Link>
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="https://www.linkedin.com/in/jayvicsanantonio"
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
