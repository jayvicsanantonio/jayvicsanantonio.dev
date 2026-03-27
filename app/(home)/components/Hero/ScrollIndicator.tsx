"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { AppIcon } from "@/components/primitives/AppIcon";
import { useHeroContext } from "../../context/HeroContext";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ScrollIndicator() {
  const { isConstrainedExperience, prefersReducedMotion } = useHeroContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const arrow = arrowRef.current;

      if (!container || !arrow) {
        return;
      }

      if (prefersReducedMotion) {
        gsap.set(container, { autoAlpha: 0, xPercent: -50 });
        return;
      }

      gsap.set(container, { autoAlpha: 0, y: 20, xPercent: -50 });

      const entranceTween = gsap.to(container, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        delay: 2.5,
        ease: "power2.out",
      });

      const bounceTween = isConstrainedExperience
        ? null
        : gsap.to(arrow, {
            y: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          });

      const setOpacity = gsap.quickSetter(container, "opacity");
      const fadeTrigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "100px top",
        scrub: true,
        onUpdate: (self) => {
          setOpacity(1 - self.progress);
        },
      });

      return () => {
        entranceTween.kill();
        bounceTween?.kill();
        fadeTrigger.kill();
      };
    },
    { dependencies: [isConstrainedExperience, prefersReducedMotion], scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 left-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none mix-blend-difference"
    >
      <div ref={arrowRef} className="text-white/80">
        <AppIcon name="chevron-down" width={48} height={48} />
      </div>
    </div>
  );
}
