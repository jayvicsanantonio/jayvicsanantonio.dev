"use client";

import AnimatedText from "@/components/ui/AnimatedText";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function AnimatedHeader() {
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    <h1 className="font-oswald text-3xl font-bold tracking-tight text-cyan-300/90 sm:text-4xl lg:text-6xl">
      <span className="sr-only">Projects</span>
      <AnimatedText text="Engineering Portfolio" start={!prefersReducedMotion} perCharDelay={45} />
    </h1>
  );
}
