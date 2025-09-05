"use client";

import React, { useEffect, useState } from "react";

export type GlassHeaderBubbleProps = {
  prefersReducedMotion: boolean;
  label: string;
  icon: React.ReactNode;
  vtClassName?: string; // e.g., vt-tag-projects, vt-tag-work
  collapsedWidthPx?: number; // defaults to 80 (w-20)
  expandedWidthPx?: number; // defaults to 200
};

export default function GlassHeaderBubble({
  prefersReducedMotion,
  label,
  icon,
  vtClassName,
  collapsedWidthPx = 80,
  expandedWidthPx = 200,
}: GlassHeaderBubbleProps) {
  const [showBubble, setShowBubble] = useState(false);
  const [showText, setShowText] = useState(false);
  const [visibleLetters, setVisibleLetters] = useState(0);

  // Bubble animation sequence
  useEffect(() => {
    if (prefersReducedMotion) {
      setShowBubble(true);
      setShowText(true);
      return;
    }

    const timer1: ReturnType<typeof setTimeout> = setTimeout(
      () => setShowBubble(true),
      500,
    );
    const timer2: ReturnType<typeof setTimeout> = setTimeout(
      () => setShowText(true),
      1000,
    );

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [prefersReducedMotion]);

  // Custom letter-by-letter animation
  useEffect(() => {
    if (!showText) {
      setVisibleLetters(0);
      return;
    }

    if (prefersReducedMotion) {
      setVisibleLetters(label.length);
      return;
    }

    let currentLetter = 0;
    let letterTimer: ReturnType<typeof setInterval> | undefined;

    const initialDelay: ReturnType<typeof setTimeout> = setTimeout(() => {
      letterTimer = setInterval(() => {
        currentLetter++;
        setVisibleLetters(currentLetter);
        if (currentLetter >= label.length) {
          if (letterTimer !== undefined) clearInterval(letterTimer);
        }
      }, 200);
    }, 300);

    return () => {
      clearTimeout(initialDelay);
      if (letterTimer !== undefined) clearInterval(letterTimer);
    };
  }, [showText, prefersReducedMotion, label]);

  return (
    <div className="relative inline-flex items-center">
      {/* Main Icon Button */}
      <div
        className={[
          "relative z-10 w-20 h-16 rounded-full flex items-center justify-center",
          vtClassName ?? "",
        ].join(" ")}
      >
        <span className="relative z-10">{icon}</span>
      </div>

      {/* Text Bubble */}
      <div
        className="absolute isolate overflow-hidden pointer-events-auto border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.12))] backdrop-blur-[16px] backdrop-saturate-[160%] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_30px_rgba(0,0,0,0.22)] before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:opacity-[0.85] before:bg-[radial-gradient(60%_40%_at_50%_18%,rgba(255,255,255,0.55),rgba(255,255,255,0)_70%)] before:rounded-[inherit] flex items-center justify-start"
        style={{
          left: "0px",
          top: "0px",
          width: showBubble ? `${expandedWidthPx}px` : `${collapsedWidthPx}px`,
          height: "64px",
          borderRadius: "32px",
          opacity: 1,
          transition: "width 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          willChange: "width",
          zIndex: 5,
        }}
      >
        <span className="relative z-10 flex items-center w-full">
          {/* Space for icon width */}
          <div
            style={{ width: `${collapsedWidthPx}px` }}
            className="flex-shrink-0"
          />
          <span className="font-oswald uppercase tracking-wide text-white/90 font-semibold text-sm md:text-lg whitespace-nowrap">
            {prefersReducedMotion ? (
              label
            ) : showText ? (
              <span className="inline-flex">
                {label.split("").map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block transition-all duration-300 ease-out"
                    style={{
                      opacity: index < visibleLetters ? 1 : 0,
                      transform:
                        index < visibleLetters
                          ? "translateY(0px) scale(1) rotateX(0deg)"
                          : "translateY(12px) scale(0.7) rotateX(-30deg)",
                      filter:
                        index < visibleLetters ? "blur(0px)" : "blur(3px)",
                      transitionDelay: `${index * 1}ms`,
                      textShadow:
                        index < visibleLetters
                          ? "0 0 12px rgba(59, 130, 246, 0.4), 0 0 4px rgba(255, 255, 255, 0.1)"
                          : "none",
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ) : (
              <span className="opacity-0">{label}</span>
            )}
          </span>
        </span>
      </div>
    </div>
  );
}
