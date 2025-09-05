"use client";

import { PROJECTS } from "@/app/projects/project-data";
import AmbientBackground from "@/components/pages/AmbientBackground";

import usePrefersReducedMotion from "@/hooks/use-prefers-reduced-motion";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import type { MotionProps, Transition } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

// PROJECTS now sourced from project-data.ts

// Filters and ordering constants
const SKILL_FILTERS = [
  "All",
  "Enterprise",
  "Startup",
  "Hobby",
  "Client",
  "Open Source",
  "Sandboxes",
];

const PRIORITY_ORDER = [
  "yahoo-dsp",
  "webdevhub",
  "sync-flow",
  "tracknstick",
  "barbenheimer-vscode-theme",
  "barbenheimer-zed-theme",
  "ember-upgrade-guide",
];

function LinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 transition-colors focus-ring"
    >
      {children}
    </a>
  );
}

export default function ProjectsPage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showBubble, setShowBubble] = useState(false);
  const [showText, setShowText] = useState(false);
  const [visibleLetters, setVisibleLetters] = useState(0);

  // Bubble animation sequence
  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip animations if user prefers reduced motion
      setShowBubble(true);
      setShowText(true);
      return;
    }

    const timer1 = setTimeout(() => setShowBubble(true), 2000); // Bubble starts expanding after 2s
    const timer2 = setTimeout(() => setShowText(true), 3200); // Text appears after expansion completes

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
      setVisibleLetters(8); // Show all letters immediately
      return;
    }

    const projectsText = "PROJECTS";
    let currentLetter = 0;

    let letterTimer: ReturnType<typeof setInterval> | undefined;

    // Start letter animation after a brief delay
    const initialDelay: ReturnType<typeof setTimeout> = setTimeout(() => {
      letterTimer = setInterval(() => {
        currentLetter++;
        setVisibleLetters(currentLetter);

        if (currentLetter >= projectsText.length) {
          if (letterTimer !== undefined) clearInterval(letterTimer);
        }
      }, 200); // 200ms between each letter for more dramatic effect
    }, 300); // Wait 300ms after showText becomes true

    return () => {
      clearTimeout(initialDelay);
      if (letterTimer !== undefined) clearInterval(letterTimer);
    };
  }, [showText, prefersReducedMotion]);


  return (
    <section className="relative w-full">
      <AmbientBackground />

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full opacity-20 blur-3xl bg-[radial-gradient(closest-side,rgba(59,130,246,0.25),transparent)]" />
        <div className="absolute bottom-0 right-0 h-[26rem] w-[26rem] rounded-full opacity-15 blur-3xl bg-[radial-gradient(closest-side,rgba(168,85,247,0.25),transparent)]" />
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="space-y-5 max-w-3xl">
          {/* Glass Bubble Animation - Icon + Text Bubble */}
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
              className="absolute isolate overflow-hidden pointer-events-auto border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.12))] backdrop-blur-[16px] backdrop-saturate-[160%] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_30px_rgba(0,0,0,0.22)] before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:opacity-[0.85] before:bg-[radial-gradient(60%_40%_at_50%_18%,rgba(255,255,255,0.55),rgba(255,255,255,0)_70%)] flex items-center justify-start"
              style={{
                left: "0px", // Same left position as icon container
                top: "0px", // Same top position as icon
                width: showBubble ? "200px" : "64px", // Starts same size as icon, expands wider
                height: "64px", // Same height as icon container
                borderRadius: "32px", // Half of height for pill shape
                opacity: 1, // Always visible, no fade animation
                transition: "width 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)", // Slow, smooth rightward expansion only
                zIndex: 5, // Behind the icon container
              }}
            >
              <span className="relative z-10 flex items-center w-full">
                <div className="w-20 flex-shrink-0"></div>{" "}
                {/* Space for icon */}
                <span className="font-oswald uppercase tracking-wide text-white/90 font-semibold text-sm whitespace-nowrap pl-4">
                  {prefersReducedMotion ? (
                    "PROJECTS"
                  ) : showText ? (
                    <span className="inline-flex">
                      {"PROJECTS".split("").map((letter, index) => (
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
                              index < visibleLetters
                                ? "blur(0px)"
                                : "blur(3px)",
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
                    <span className="opacity-0">PROJECTS</span>
                  )}
                </span>
              </span>
            </div>
          </div>

          <h1 className="font-oswald text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-cyan-300/90">
            Crafted Artifacts
          </h1>

          <p className="text-gray-300/85 text-base sm:text-lg max-w-[720px]">
            A curated collection of platforms, tools, and experiments—built with
            care, tuned for performance, and shaped by design.
          </p>
        </div>

        {/* Projects only */}
        <Suspense fallback={null}>
          <SkillsAndCases prefersReducedMotion={prefersReducedMotion} />
        </Suspense>
      </div>
    </section>
  );
}

function SkillsAndCases({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const searchParams = useSearchParams();
  const initialFromQuery =
    (searchParams?.get("skill") || searchParams?.get("filter")) ?? undefined;

  const [active, setActive] = React.useState<string>(() =>
    initialFromQuery && SKILL_FILTERS.includes(initialFromQuery)
      ? initialFromQuery
      : "All",
  );

  const cardReveal: MotionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
      };

  const cardTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] };


  const visible = React.useMemo(() => {
    const filtered = PROJECTS.filter(
      (c) => active === "All" || c.skills.includes(active),
    );
    return filtered.slice().sort((a, b) => {
      const ai = PRIORITY_ORDER.indexOf(a.slug);
      const bi = PRIORITY_ORDER.indexOf(b.slug);
      if (ai !== -1 || bi !== -1) {
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      }
      return 0;
    });
  }, [active]);

  return (
    <div className="mt-12">
      {/* Matrix */}
      <div className="flex flex-wrap gap-2">
        {SKILL_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={`rounded-full px-3 py-1.5 text-xs sm:text-sm border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-blue-400/60 ${
              active === s
                ? "bg-purple-600/70 text-white border-purple-500/70"
                : "bg-white/5 text-white/90 border-white/10"
            }`}
            aria-pressed={active === s}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Projects rail */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {visible.map((c, i) => (
          <motion.article
            key={c.slug}
            {...cardReveal}
            transition={{
              ...cardTransition,
              delay: prefersReducedMotion ? 0 : 0.01 * i,
            }}
            className="group relative rounded-2xl p-[1px] min-h-[430px] bg-[linear-gradient(135deg,rgba(59,130,246,0.35),rgba(168,85,247,0.22),rgba(34,211,238,0.2))] shadow-[0_8px_28px_rgba(0,0,0,0.35)] ring-1 ring-white/5"
          >
            <div className="flex h-full flex-col rounded-2xl border border-white/5 bg-gray-950/70 backdrop-blur-md overflow-hidden">
              <Image
                src={c.image.src}
                alt={c.image.alt}
                width={c.image.width}
                height={c.image.height}
                style={{
                  aspectRatio: c.image.ratio,
                }}
                className="w-full h-40 md:h-44 object-cover"
              />
              <div className="p-5 flex-1 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-oswald text-xl text-white">{c.title}</h3>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] font-medium text-gray-300 whitespace-nowrap">
                    {c.period}
                  </span>
                </div>
                <p className="text-gray-300/90 text-[0.98rem]/relaxed flex-1 overflow-hidden">
                  {c.blurb}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                  {c.links.map((l) => (
                    <LinkButton key={`${c.slug}-${l.label}`} href={l.href}>
                      {l.icon}
                      {l.icon ? <>&nbsp;</> : null}
                      {l.label}
                    </LinkButton>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
