"use client";

import { Suspense, lazy, useRef } from "react";

import InitialPillOverlay from "@/app/(home)/_components/hero/InitialPillOverlay.client";
import MorphingVideo from "@/app/(home)/_components/hero/MorphingVideo.client";
import ProfileImage from "@/app/(home)/_components/hero/ProfileImage.client";
import { useIntroSequence } from "@/app/(home)/_hooks/useIntroSequence";
import { useScrollCssVariables } from "@/app/(home)/_hooks/useScrollCssVariables";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import type { HeroConfig } from "@/lib/content/types";

const PrimaryNavOverlay = lazy(
  () => import("@/app/(home)/_components/hero/PrimaryNavOverlay.client"),
);
const MobileNavRow = lazy(() => import("@/app/(home)/_components/hero/MobileNavRow.client"));
const FooterBrandCTA = lazy(() => import("@/app/(home)/_components/hero/FooterBrandCTA.client"));
const AboutSection = lazy(() => import("@/app/(home)/_components/AboutSection.client"));
const BlackTransitionOverlay = lazy(
  () => import("@/app/(home)/_components/BlackTransitionOverlay.client"),
);

type HeroMorphIslandProps = {
  config: HeroConfig;
};

export default function HeroMorphIsland({ config }: HeroMorphIslandProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const reduceMotion = usePrefersReducedMotion();
  const { initialPill, showTitleGroup, showDesc, showName, isExpanding, shouldPlayVideo } =
    useIntroSequence(config, reduceMotion);

  useScrollCssVariables(
    containerRef,
    {
      scroll: config.scroll,
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
        centerTop={config.nav.centerTop}
        isIntro={isIntro}
        initialPill={initialPill}
        isExpanding={isExpanding}
        showTitleGroup={showTitleGroup}
        showDesc={showDesc}
        shouldPlayVideo={shouldPlayVideo}
        containerRadius={containerRadius}
        video={config.video}
      />

      {initialPill && <InitialPillOverlay />}

      <ProfileImage initialPill={initialPill} />

      <div className="pointer-events-none fixed inset-0 z-50">
        <Suspense fallback={null}>
          <PrimaryNavOverlay
            centerTop={config.nav.centerTop}
            leftOffsetsPx={config.nav.leftOffsetsPx}
            rightOffsetsPx={config.nav.rightOffsetsPx}
            buttonSize={config.nav.buttonSize}
          />
          <MobileNavRow />
          <FooterBrandCTA showName={showName} overlayUpDampen={config.overlayUpDampen} />
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <BlackTransitionOverlay />
      </Suspense>

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

        <section className="flex min-h-[220svh] flex-col items-center justify-center px-4 py-20 md:min-h-[180svh] lg:min-h-[154rem]"></section>
      </div>
      <Suspense fallback={null}>
        <AboutSection />
      </Suspense>
    </div>
  );
}
