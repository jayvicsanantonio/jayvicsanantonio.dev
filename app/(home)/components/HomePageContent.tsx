"use client";

import { useLayoutEffect } from "react";
import Profile from "./Hero/Profile";
import Hero from "./Hero";
import Skills from "./Skills";
import About from "./About";
import ScrollIndicator from "./Hero/ScrollIndicator";
import { HeroProvider, useHeroContext } from "../context/HeroContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function HomePageInner({ children }: { children?: React.ReactNode }) {
  const { smoothContentRef } = useHeroContext();

  return (
    <>
      {children}
      <div ref={smoothContentRef} id="smooth-content" className="w-full z-10">
        <Hero />
        <Skills />
        <About />
      </div>
      <Profile />
      <ScrollIndicator />
    </>
  );
}

export default function HomePageContent({ children }: { children?: React.ReactNode }) {
  useLayoutEffect(() => {
    if (window.history && window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    ScrollTrigger.clearScrollMemory();
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <HeroProvider>
      <HomePageInner>{children}</HomePageInner>
    </HeroProvider>
  );
}
