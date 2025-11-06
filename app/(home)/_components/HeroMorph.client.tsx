"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Scrollbar as SmoothScrollbar } from "smooth-scrollbar/interfaces/scrollbar";
import type { Application } from "pixi.js";

import { CFG } from "@/app/(home)/_components/hero/config";
import InitialPillOverlay from "@/app/(home)/_components/hero/InitialPillOverlay.client";
import MorphingVideo from "@/app/(home)/_components/hero/MorphingVideo.client";
import ProfileImage from "@/app/(home)/_components/hero/ProfileImage.client";
import { useIntroSequence } from "@/app/(home)/_hooks/useIntroSequence";
import { useScrollCssVariables } from "@/app/(home)/_hooks/useScrollCssVariables";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import SmoothScrollbarViewport from "@/app/(home)/_components/hero/SmoothScrollbarViewport.client";

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
const AboutSection = dynamic(() => import("@/app/(home)/_components/AboutSection.client"), {
  ssr: false,
});
const BlackTransitionOverlay = dynamic(
  () => import("@/app/(home)/_components/BlackTransitionOverlay.client"),
  {
    ssr: false,
  },
);
export default function HeroMorph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pixiRootRef = useRef<HTMLDivElement>(null);
  const [scrollbar, setScrollbar] = useState<SmoothScrollbar | null>(null);
  const pixiAppRef = useRef<Application | null>(null);

  const { initialPill, showTitleGroup, showDesc, showName, isExpanding, shouldPlayVideo } =
    useIntroSequence(CFG);
  const reduceMotion = usePrefersReducedMotion();

  const scrollBridge = useMemo(
    () => ({
      scrollbar,
    }),
    [scrollbar],
  );

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.dataset.scrollbarReady = scrollbar ? "true" : "false";
    }
    if (process.env.NODE_ENV !== "production") {
      console.debug("[HeroMorph] scrollbar state updated", scrollbar);
    }
  }, [scrollbar]);

  useScrollCssVariables(
    containerRef,
    {
      scroll: CFG.scroll,
      closeMaxX: CFG.closeMaxX,
      closeMaxY: CFG.closeMaxY,
    },
    reduceMotion,
    scrollBridge,
  );

  const isIntro = initialPill || isExpanding;
  const containerRadius = initialPill ? "9999px" : "calc(16px + 160px * var(--sh, 0))";

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const WebFont = require("webfontloader") as typeof import("webfontloader");

    WebFont.load({
      google: {
        families: ["Work Sans:300,400,600"],
      },
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !pixiRootRef.current || pixiAppRef.current) {
      return;
    }

    const Pixi = require("pixi.js") as typeof import("pixi.js");

    const app = new Pixi.Application({
      backgroundAlpha: 0,
      antialias: true,
      resizeTo: window,
    });

    pixiAppRef.current = app;
    const canvas = app.view as HTMLCanvasElement;
    pixiRootRef.current.appendChild(canvas);

    const gradient = new Pixi.Graphics()
      .beginFill(0x000000, 0)
      .drawRect(0, 0, app.renderer.width, app.renderer.height)
      .endFill();

    const accent = new Pixi.Graphics()
      .beginFill(0x14b8a6, 0.04)
      .drawEllipse(app.renderer.width / 2, app.renderer.height * 0.8, app.renderer.width * 0.4, app.renderer.height * 0.35)
      .endFill();

    const blur = new Pixi.filters.BlurFilter(12);
    accent.filters = [blur];

    app.stage.addChild(gradient, accent);

    const handleResize = () => {
      gradient.clear()
        .beginFill(0x000000, 0)
        .drawRect(0, 0, app.renderer.width, app.renderer.height)
        .endFill();
      accent.clear()
        .beginFill(0x14b8a6, 0.04)
        .drawEllipse(app.renderer.width / 2, app.renderer.height * 0.8, app.renderer.width * 0.4, app.renderer.height * 0.35)
        .endFill();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      app.destroy(false);
      pixiAppRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden  bg-black [--nav-row-w:calc(3.5rem*4+0.75rem*3)] [--pill-h:54px] sm:[--nav-row-w:20vw] sm:[--pill-h:8vh] md:[--nav-row-w:24vw]"
    >
      <div ref={pixiRootRef} className="pointer-events-none fixed inset-0 -z-10" aria-hidden />
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

      <SmoothScrollbarViewport
        className="relative z-10 h-[100svh] w-full"
        damping={reduceMotion ? 0.2 : 0.08}
        onInstance={setScrollbar}
      >
        <div className="relative">
          <div className="absolute inset-0 h-[220svh] bg-gradient-to-b from-black via-gray-800 to-gray-200 will-change-transform md:h-[180svh] lg:h-[154rem]" />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80vw 60vh at 50% 100%, rgba(0,139,139,0.2) 0%, rgba(0,139,139,0.1) 40%, transparent 70%)",
              opacity: "min(calc(var(--p, 0) * 2), 1)",
            }}
          />

          <section className="flex min-h-[220svh] flex-col items-center justify-center px-4 py-20 md:min-h-[180svh] lg:min-h-[250svh]" />
        </div>

        <AboutSection />
      </SmoothScrollbarViewport>
    </div>
  );
}
