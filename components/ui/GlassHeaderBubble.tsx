"use client";

import { GlassButton } from "@/components/ui/GlassButton";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

// Local hook to reveal letters one by one, mirroring the main text bubble behavior
function useLetterReveal(
  enabled: boolean,
  label: string,
  prefersReducedMotion: boolean,
  startDelayMs = 300,
  stepMs = 200,
) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setVisible(0);
      return;
    }

    if (prefersReducedMotion) {
      setVisible(label.length);
      return;
    }

    let current = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const initial: ReturnType<typeof setTimeout> = setTimeout(() => {
      interval = setInterval(() => {
        current++;
        setVisible(current);
        if (current >= label.length) {
          if (interval) clearInterval(interval);
        }
      }, stepMs);
    }, startDelayMs);

    return () => {
      clearTimeout(initial);
      if (interval) clearInterval(interval);
    };
  }, [enabled, label, prefersReducedMotion, startDelayMs, stepMs]);

  return visible;
}

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
  const pathname = usePathname();

  const isProjects = pathname?.startsWith("/projects");
  const isWork = pathname?.startsWith("/work");
  const isHome = pathname === "/";

  // Only keep vtTag on the expanded nav button for current route.
  // If the parent passes vt-tag-... to this header bubble, suppress it
  // when that tag matches the current route to avoid duplicate VT elements.
  const vtClassForIcon = (() => {
    if (!vtClassName) return "";
    if (isProjects && vtClassName.includes("vt-tag-projects")) return "";
    if (isWork && vtClassName.includes("vt-tag-work")) return "";
    return vtClassName;
  })();

  // Letter-by-letter for expanded nav buttons
  // Expanded active nav width timing, similar to main bubble
  const [expandActiveNav, setExpandActiveNav] = useState(false);
  useEffect(() => {
    setExpandActiveNav(false);
    if (isProjects || isWork) {
      if (prefersReducedMotion) {
        setExpandActiveNav(true);
        return;
      }
      const t = setTimeout(() => setExpandActiveNav(true), 500); // match bubble's first stage
      return () => clearTimeout(t);
    }
  }, [isProjects, isWork, prefersReducedMotion]);

  const projectsVisibleLetters = useLetterReveal(
    Boolean(expandActiveNav && isProjects),
    "Projects",
    prefersReducedMotion,
    500, // begin letters ~500ms after width starts (i.e., ~1000ms total like main bubble)
    200,
  );
  const workVisibleLetters = useLetterReveal(
    Boolean(expandActiveNav && isWork),
    "Work",
    prefersReducedMotion,
    500,
    200,
  );

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
      {/* Inline nav buttons - order: LinkedIn, Projects, Home, Work, GitHub */}
      <nav
        aria-label="Header navigation"
        className="flex items-center gap-2 flex-wrap"
      >
        {/* LinkedIn (left) */}
        <GlassButton
          href="https://www.linkedin.com/in/jayvicsanantonio/"
          aria-label="LinkedIn"
          className="w-20 h-17 rounded-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="mdi:linkedin" width={36} height={36} aria-hidden="true" />
        </GlassButton>

        {/* Projects (left). Show text when on /projects */}
        <GlassButton
          href="/projects"
          aria-label="Projects"
          className={["rounded-full", isProjects ? "vt-tag-projects" : ""].join(
            " ",
          )}
          style={{
            width: isProjects ? (expandActiveNav ? 140 : 80) : 80,
            height: 68,
            transition: "width 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: "width",
          }}
        >
          <span className="inline-flex items-center gap-2">
            <Icon
              icon="mdi:application-brackets"
              width={32}
              height={32}
              aria-hidden="true"
            />
            {isProjects ? (
              <span className="inline-flex text-sm text-white/90">
                {"Projects".split("").map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block transition-all duration-300 ease-out"
                    style={{
                      opacity: index < projectsVisibleLetters ? 1 : 0,
                      transform:
                        index < projectsVisibleLetters
                          ? "translateY(0px) scale(1) rotateX(0deg)"
                          : "translateY(12px) scale(0.7) rotateX(-30deg)",
                      filter:
                        index < projectsVisibleLetters
                          ? "blur(0px)"
                          : "blur(3px)",
                      transitionDelay: `${index * 1}ms`,
                      textShadow:
                        index < projectsVisibleLetters
                          ? "0 0 12px rgba(59, 130, 246, 0.4), 0 0 4px rgba(255, 255, 255, 0.1)"
                          : "none",
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ) : null}
          </span>
        </GlassButton>

        {/* Home (middle) with cyan accent */}
        <GlassButton
          href="/"
          aria-label="Home"
          className={[
            "rounded-full",
            // tint border cyan to echo homepage cyan styling
            "border-cyan-400/50 hover:border-cyan-300/60",
            "w-20 h-17",
          ].join(" ")}
        >
          <Icon
            icon="mdi:home"
            width={36}
            height={36}
            aria-hidden="true"
            className="text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.45)]"
          />
        </GlassButton>

        {/* Work (right). Show text when on /work */}
        <GlassButton
          href="/work"
          aria-label="Work"
          className={["rounded-full", isWork ? "vt-tag-work" : ""].join(" ")}
          style={{
            width: isWork ? (expandActiveNav ? 140 : 80) : 80,
            height: 68,
            transition: "width 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: "width",
          }}
        >
          <span className="inline-flex items-center gap-2">
            <Icon
              icon="mdi:timeline-text"
              width={32}
              height={32}
              aria-hidden="true"
            />
            {isWork ? (
              <span className="inline-flex text-sm text-white/90">
                {"Work".split("").map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block transition-all duration-300 ease-out"
                    style={{
                      opacity: index < workVisibleLetters ? 1 : 0,
                      transform:
                        index < workVisibleLetters
                          ? "translateY(0px) scale(1) rotateX(0deg)"
                          : "translateY(12px) scale(0.7) rotateX(-30deg)",
                      filter:
                        index < workVisibleLetters ? "blur(0px)" : "blur(3px)",
                      transitionDelay: `${index * 1}ms`,
                      textShadow:
                        index < workVisibleLetters
                          ? "0 0 12px rgba(59, 130, 246, 0.4), 0 0 4px rgba(255, 255, 255, 0.1)"
                          : "none",
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ) : null}
          </span>
        </GlassButton>

        {/* GitHub (right) */}
        <GlassButton
          href="https://github.com/jayvicsanantonio"
          aria-label="GitHub"
          className="w-20 h-17 rounded-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="mdi:github" width={36} height={36} aria-hidden="true" />
        </GlassButton>
      </nav>
    </div>
  );
}
