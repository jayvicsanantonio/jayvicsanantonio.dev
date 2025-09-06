"use client";

import { NavPill } from "@/components/ui/NavPill";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
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
  const pathname = usePathname();

  const isProjects = pathname?.startsWith("/projects");
  const isWork = pathname?.startsWith("/work");

  // Only keep vtTag on the expanded nav button for current route.
  // If the parent passes vt-tag-... to this header bubble, suppress it
  // when that tag matches the current route to avoid duplicate VT elements.

  // Delay the active pill expansion slightly to echo the main bubble

  return (
    <div className="relative inline-flex items-center">
      {/* Inline nav buttons - order: LinkedIn, Projects, Home, Work, GitHub */}
      <nav
        aria-label="Header navigation"
        className="flex items-center gap-1 sm:gap-2 flex-wrap"
      >
        {/* LinkedIn (left) */}
        <NavPill
          href="https://www.linkedin.com/in/jayvicsanantonio/"
          ariaLabel="LinkedIn"
          icon={
            <Icon
              icon="mdi:linkedin"
              className="w-[clamp(24px,6vw,36px)] h-[clamp(24px,6vw,36px)]"
              aria-hidden="true"
            />
          }
          external
          tooltip="LinkedIn"
          tooltipPlacement="below"
          collapsedPx={"clamp(56px,11vw,84px)"}
          heightPx={"clamp(48px,9.5vw,72px)"}
        />

        {/* Projects (left) */}
        <NavPill
          href="/projects"
          ariaLabel="Projects"
          icon={
            <Icon
              icon="mdi:application-brackets"
              className="w-[clamp(24px,6vw,36px)] h-[clamp(24px,6vw,36px)] font-bold"
              aria-hidden="true"
            />
          }
          label="Projects"
          active={isProjects}
          {...(isProjects ? { vtTagName: "projects" } : {})}
          {...(!isProjects ? { tooltip: "Projects", tooltipPlacement: "below" as const } : {})}
          prefersReducedMotion={prefersReducedMotion}
          collapsedPx={"clamp(56px,11vw,84px)"}
          expandedPx={"clamp(120px,40vw,180px)"}
          heightPx={"clamp(48px,9.5vw,72px)"}
        />

        {/* Home (middle): greeting pill (solid) */}
        <Link
          href="/"
          aria-label="Home"
          className="pointer-events-auto inline-flex items-center justify-center rounded-full h-[clamp(48px,9.5vw,72px)] px-5 sm:px-6 md:px-20 bg-cyan-900 text-white font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.25)] hover:bg-cyan-800 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            // Force a full reload to ensure the homepage remounts and animations restart
            if (typeof window !== "undefined") window.location.assign("/");
          }}
        >
          <span className="text-[clamp(14px,2.2vw,22px)]">
            Hi, I'm Jayvic 👋
          </span>
        </Link>

        {/* Work (right) */}
        <NavPill
          href="/work"
          ariaLabel="Work"
          icon={
            <Icon
              icon="mdi:timeline-text"
              className="w-[clamp(24px,6vw,36px)] h-[clamp(24px,6vw,36px)]"
              aria-hidden="true"
            />
          }
          label="Work"
          active={isWork}
          {...(isWork ? { vtTagName: "work" } : {})}
          {...(!isWork ? { tooltip: "Work", tooltipPlacement: "below" as const } : {})}
          prefersReducedMotion={prefersReducedMotion}
          collapsedPx={"clamp(56px,11vw,84px)"}
          expandedPx={"clamp(104px,34vw,160px)"}
          heightPx={"clamp(48px,9.5vw,72px)"}
        />

        {/* GitHub (right) */}
        <NavPill
          href="https://github.com/jayvicsanantonio"
          ariaLabel="GitHub"
          icon={
            <Icon
              icon="mdi:github"
              className="w-[clamp(24px,6vw,36px)] h-[clamp(24px,6vw,36px)]"
              aria-hidden="true"
            />
          }
          external
          tooltip="GitHub"
          tooltipPlacement="below"
          collapsedPx={"clamp(56px,11vw,84px)"}
          heightPx={"clamp(48px,9.5vw,72px)"}
        />
      </nav>
    </div>
  );
}
