"use client";

import { useLayoutEffect } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import Profile from "./Hero/Profile";
import Hero from "./Hero";
import Skills from "./Skills";
import About from "./About";
import { HeroProvider, useHeroContext } from "../context/HeroContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function HomePageInner({ children }: { children: React.ReactNode }) {
  const { smoothContentRef } = useHeroContext();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <>
      {children}
      <div ref={smoothContentRef} id="smooth-content" className="w-full z-10">
        <Hero />
        <Skills />
        <About />
      </div>
      <Profile prefersReducedMotion={prefersReducedMotion} />
    </>
  );
}

export default function HomePageContent({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    // 1. Disable browser's default scroll restoration
    if (window.history && window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    // 2. Clear GSAP scroll memory
    ScrollTrigger.clearScrollMemory();

    // 3. NUCLEAR OPTION: Force scroll to top for a few frames
    // This beats the browser's async scroll restoration
    let frames = 0;
    const forceScroll = () => {
      if (frames < 30) {
        // Run for ~500ms (30 frames at 60fps) to be absolutely sure
        window.scrollTo(0, 0);
        frames++;
        requestAnimationFrame(forceScroll);
      }
    };
    forceScroll();

    // 4. Ensure we scroll to top when leaving the page (for back button reliability)
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
      // Try to clear history state scroll position
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", window.location.href);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <HeroProvider>
      <HomePageInner>{children}</HomePageInner>
    </HeroProvider>
  );
}
