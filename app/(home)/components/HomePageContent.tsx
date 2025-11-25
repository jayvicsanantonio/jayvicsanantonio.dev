"use client";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import Profile from "./Hero/Profile";
import Hero from "./Hero";
import Skills from "./Skills";
import About from "./About";
import { HeroProvider, useHeroContext } from "../context/HeroContext";

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
  return (
    <HeroProvider>
      <HomePageInner>{children}</HomePageInner>
    </HeroProvider>
  );
}
