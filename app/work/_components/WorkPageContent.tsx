"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import WorkTimeline from "./WorkTimeline";

gsap.registerPlugin(ScrollTrigger);

export default function WorkPageContent() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Smooth Scrollbar lifecycle is managed globally by ScrollProvider.
  // Keep wrapper/content refs to preserve DOM structure, but no smoother init here.

  useGSAP(
    () => {
      if (prefersReducedMotion || !heroRef.current) {
        return;
      }

      const heroEls = Array.from(
        heroRef.current.querySelectorAll<HTMLElement>("[data-hero-animate]")
      );

      if (!heroEls.length) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });

      tl.from(heroEls, {
        y: 44,
        opacity: 0,
        stagger: 0.12,
      });

      return () => tl.kill();
    },
    { scope: heroRef, dependencies: [prefersReducedMotion] }
  );

  useGSAP(
    () => {
      if (prefersReducedMotion || !backgroundRef.current) {
        return;
      }

      const tween = gsap.to(backgroundRef.current, {
        rotate: 360,
        duration: 120,
        ease: "none",
        repeat: -1,
      });

      return () => tween.kill();
    },
    { scope: backgroundRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <div ref={wrapperRef} className="relative isolate min-h-screen overflow-hidden">
      <div ref={contentRef} className="relative">
        <section className="relative w-full overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div
              ref={backgroundRef}
              className="absolute top-1/2 left-1/2 hidden h-[120vw] w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-5 blur-3xl lg:block"
              style={{
                background:
                  "conic-gradient(from_0deg_at_50%_50%,rgba(168,85,247,0.35),rgba(59,130,246,0.28),rgba(34,211,238,0.24),rgba(168,85,247,0.35))",
              }}
            />
          </div>
          <div className="cq container relative pt-48 pb-16 sm:pt-52" data-speed="0.98">
            <div ref={heroRef} className="space-y-5" data-lag="0.12">
              <h1
                data-hero-animate
                className="font-oswald text-3xl font-bold tracking-tight text-cyan-300/90 sm:text-4xl lg:text-6xl"
              >
                Professional Experience
              </h1>
              <p className="max-w-[720px] text-base text-gray-300/85 sm:text-lg" data-hero-animate>
                Ten years architecting and building high-performance adtech platforms, real-time
                systems, and scalable web applications built for enterprise-grade performance. Proven
                track record of delivering mission-critical systems, optimizing performance bottlenecks,
                and shipping solutions that drive measurable business impact.
              </p>
            </div>

            <div className="relative mt-12" data-speed="1.04" data-lag="0.05">
              <WorkTimeline />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
