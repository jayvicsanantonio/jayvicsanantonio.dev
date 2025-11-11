"use client";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { RefObject } from "react";
type MarqueeRowProps = {
  marqueeRowRef: RefObject<HTMLDivElement>;
  items: string[];
  direction?: "left" | "right";
  duration?: number; // seconds
  pauseOnHover?: boolean;
};

export default function MarqueeRow({
  marqueeRowRef,
  items,
  direction = "left",
  duration = 45,
  pauseOnHover = true,
}: MarqueeRowProps) {
  const reducedMotion = usePrefersReducedMotion();

  const playStateClass = pauseOnHover ? "group-hover:[animation-play-state:paused]" : "";
  const dirClass = direction === "right" ? "[animation-direction:reverse]" : "";

  return (
    <div ref={marqueeRowRef} className="relative overflow-hidden">
      <div className="group relative block select-none text-white/80 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
          className={`marquee-runner flex w-max items-center ${playStateClass} ${dirClass}`}
          style={{
            animationDuration: `${duration}s`,
            animationPlayState: reducedMotion ? "paused" : "running",
          }}
        >
          <div className="marquee-track flex w-max flex-none items-center gap-4 pr-4 h-13">
            {items.map((label, index) => (
              <span
                key={`${label}-${index}`}
                className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[15px] leading-7 text-white/90 shadow-[0_1px_8px_rgba(0,0,0,0.15)] transition-colors hover:border-white/20 hover:text-white sm:text-[16px]"
              >
                {label}
              </span>
            ))}
          </div>
          <div aria-hidden className="marquee-track flex w-max flex-none items-center gap-4 pr-4">
            {items.map((label, index) => (
              <span
                key={`clone-${label}-${index}`}
                className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[15px] leading-7 text-white/90 shadow-[0_1px_8px_rgba(0,0,0,0.15)] transition-colors hover:border-white/20 hover:text-white sm:text-[16px]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .marquee-runner {
          animation-name: marquee-left;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
