"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export default function ProjectsHeaderBubble({
  prefersReducedMotion,
  label = "PROJECTS",
}: {
  prefersReducedMotion: boolean;
  label?: string;
}) {
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
      2000,
    );
    const timer2: ReturnType<typeof setTimeout> = setTimeout(
      () => setShowText(true),
      3200,
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
      {/* Main Icon Button - Always visible, on top */}
      <div className="relative z-10 w-20 h-16 rounded-full isolate overflow-hidden pointer-events-auto border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.12))] backdrop-blur-[16px] backdrop-saturate-[160%] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_30px_rgba(0,0,0,0.22)] before:content-[''] before:absolute before:inset-0 before:rounded-full before:pointer-events-none before:opacity-[0.85] before:bg-[radial-gradient(60%_40%_at_50%_18%,rgba(255,255,255,0.55),rgba(255,255,255,0)_70%)] hover:border-white/50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_10px_36px_rgba(0,0,0,0.26)] vt-tag-projects flex items-center justify-center">
        <span className="relative z-10">
          <Icon
            icon="mdi:application-brackets"
            width={28}
            height={28}
            className="text-white/90"
            aria-hidden="true"
          />
        </span>
      </div>

      {/* Text Bubble - Left aligned with icon container */}
      <div
        className="absolute isolate overflow-hidden pointer-events-auto border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.12))] backdrop-blur-[16px] backdrop-saturate-[160%] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_30px_rgba(0,0,0,0.22)] before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:opacity-[0.85] before:bg-[radial-gradient(60%_40%_at_50%_18%,rgba(255,255,255,0.55),rgba(255,255,255,0)_70%)] before:rounded-[inherit] flex items-center justify-start"
        style={{
          left: "0px",
          top: "0px",
          width: showBubble ? "200px" : "80px",
          height: "64px",
          borderRadius: "32px",
          opacity: 1,
          transition: "width 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          willChange: "width",
          zIndex: 5,
        }}
      >
        <span className="relative z-10 flex items-center w-full">
          <div className="w-20 flex-shrink-0"></div>{" "}
          {/* Space for icon */}
          <span className="font-oswald uppercase tracking-wide text-white/90 font-semibold text-sm whitespace-nowrap pl-4">
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
                      filter: index < visibleLetters ? "blur(0px)" : "blur(3px)",
                      transitionDelay: `${index * 80}ms`,
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
