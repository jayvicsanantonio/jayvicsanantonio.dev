"use client";

import { Icon } from "@iconify/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollIndicator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const arrow = arrowRef.current;

    if (!container || !arrow) return;

    // Initial state: hidden and centered
    gsap.set(container, { opacity: 0, y: 20, xPercent: -50 });

    // Entrance animation
    const tl = gsap.timeline({
      delay: 2.5, // Wait for other hero animations
    });

    tl.to(container, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Continuous bounce animation
    gsap.to(arrow, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Exit on scroll
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "100px top",
      scrub: true,
      onUpdate: (self) => {
        gsap.to(container, {
          opacity: 1 - self.progress,
          overwrite: "auto",
        });
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 left-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none mix-blend-difference"
    >
      <div ref={arrowRef} className="text-white/80">
        <Icon icon="mdi:chevron-down" width={48} height={48} />
      </div>
    </div>
  );
}
