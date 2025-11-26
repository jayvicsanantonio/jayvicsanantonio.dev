"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useScrollReset } from "@/hooks/useScrollReset";
import ScrollProgressBar from "./ScrollProgressBar";

gsap.registerPlugin(ScrollTrigger);

type Props = { children: React.ReactNode };

/**
 * Provides scroll-related functionality for the application.
 *
 * This component:
 * - Tracks scroll progress and displays a visual progress bar
 * - Manages scroll position reset on navigation
 * - Registers GSAP ScrollTrigger plugin for scroll-driven animations
 *
 * Should wrap the main application content to enable scroll features.
 *
 * @param props - Component props
 * @param props.children - Child components to render
 *
 * @example
 * ```tsx
 * <ScrollProvider>
 *   <YourAppContent />
 * </ScrollProvider>
 * ```
 */
export default function ScrollProvider({ children }: Props) {
  const progress = useScrollProgress();
  useScrollReset();

  return (
    <>
      {children}
      <ScrollProgressBar progress={progress} />
    </>
  );
}
