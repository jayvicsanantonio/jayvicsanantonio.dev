"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavPill } from "@/components/navigation/NavPill";
export type GlassHeaderBubbleProps = {
  label: string;
  vtClassName?: string; // e.g., vt-tag-projects, vt-tag-work
  collapsedWidthPx?: number; // defaults to 80 (w-20)
  expandedWidthPx?: number; // defaults to 200
};

export default function GlassHeaderBubble({
  label: _label,
  vtClassName: _vtClassName,
  collapsedWidthPx: _collapsedWidthPx = 80,
  expandedWidthPx: _expandedWidthPx = 200,
}: GlassHeaderBubbleProps) {
  const pathname = usePathname();

  const isProjects = pathname?.startsWith("/projects");
  const isWork = pathname?.startsWith("/work");
  const projectsTooltipProps = isProjects
    ? {}
    : { tooltip: "Projects", tooltipPlacement: "below" as const };
  const workTooltipProps = isWork ? {} : { tooltip: "Work", tooltipPlacement: "below" as const };

  // Only keep vtTag on the expanded nav button for current route.
  // If the parent passes vt-tag-... to this header bubble, suppress it
  // when that tag matches the current route to avoid duplicate VT elements.

  // Delay the active pill expansion slightly to echo the main bubble

  return (
    <div className={`relative inline-flex items-center ${_vtClassName ?? ""}`}>
      <nav
        aria-label="Header navigation"
        className="inline-grid w-fit grid-cols-1 justify-items-center gap-2 sm:flex sm:w-auto sm:items-center sm:gap-2"
      >
        <div className="order-2 flex items-center gap-2 sm:order-none sm:contents">
          <span className="sm:order-1">
            <NavPill
              href="https://www.linkedin.com/in/jayvicsanantonio/"
              ariaLabel="LinkedIn"
              icon={
                <Icon
                  icon="mdi:linkedin"
                  className="h-[clamp(24px,6vw,36px)] w-[clamp(24px,6vw,36px)]"
                  aria-hidden="true"
                />
              }
              external
              tooltip="LinkedIn"
              tooltipPlacement="below"
              collapsedPx={"clamp(56px,11vw,84px)"}
              heightPx={"clamp(48px,9.5vw,72px)"}
              className="bg-white/10 backdrop-blur-[24px] backdrop-saturate-200 border-white/55 hover:border-white/60"
            />
          </span>

          <span className="sm:order-2">
            <NavPill
              href="/projects"
              ariaLabel="Projects"
              icon={
                <Icon
                  icon="mdi:application-brackets"
                  className="h-[clamp(24px,6vw,36px)] w-[clamp(24px,6vw,36px)] font-bold"
                  aria-hidden="true"
                />
              }
              label="Projects"
              active={isProjects}
              {...projectsTooltipProps}
              collapsedPx={"clamp(56px,11vw,84px)"}
              expandedPx={"clamp(120px,40vw,180px)"}
              heightPx={"clamp(48px,9.5vw,72px)"}
              className={[
                "bg-white/20 backdrop-blur-[24px] backdrop-saturate-200",
                !isProjects ? "border-white/55 hover:border-white/60" : "",
              ].join(" ")}
            />
          </span>

          <span className="sm:order-4">
            <NavPill
              href="/work"
              ariaLabel="Work"
              icon={
                <Icon
                  icon="mdi:timeline-text"
                  className="h-[clamp(24px,6vw,36px)] w-[clamp(24px,6vw,36px)]"
                  aria-hidden="true"
                />
              }
              label="Work"
              active={isWork}
              {...workTooltipProps}
              collapsedPx={"clamp(56px,11vw,84px)"}
              expandedPx={"clamp(104px,34vw,160px)"}
              heightPx={"clamp(48px,9.5vw,72px)"}
              className={[
                "bg-white/20 backdrop-blur-[24px] backdrop-saturate-200",
                !isWork ? "border-white/55 hover:border-white/60" : "",
              ].join(" ")}
            />
          </span>

          <span className="sm:order-5">
            <NavPill
              href="https://github.com/jayvicsanantonio"
              ariaLabel="GitHub"
              icon={
                <Icon
                  icon="mdi:github"
                  className="h-[clamp(24px,6vw,36px)] w-[clamp(24px,6vw,36px)]"
                  aria-hidden="true"
                />
              }
              external
              tooltip="GitHub"
              tooltipPlacement="below"
              collapsedPx={"clamp(56px,11vw,84px)"}
              heightPx={"clamp(48px,9.5vw,72px)"}
              className="bg-white/20 backdrop-blur-[24px] backdrop-saturate-200 border-white/55 hover:border-white/60"
            />
          </span>
        </div>

        <Link
          href="/"
          aria-label="Home"
          className="pointer-events-auto order-1 inline-flex h-[clamp(48px,9.5vw,72px)] items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-900/40 px-5 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_10px_30px_rgba(0,139,139,0.3)] backdrop-blur-[20px] backdrop-saturate-[180%] transition-all hover:bg-cyan-800/50 hover:border-cyan-400/40 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_12px_35px_rgba(0,139,139,0.4)] w-full sm:order-3 sm:w-auto sm:px-6 md:px-20 before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,255,255,0.13),rgba(0,255,255,0)_50%)] before:content-['']"
          onClick={(e) => {
            e.preventDefault();
            // Force a full reload to ensure the homepage remounts and animations restart
            if (typeof window !== "undefined") window.location.assign("/");
          }}
        >
          <span className="relative text-[clamp(14px,2.2vw,22px)] text-cyan-50">
            Hi, I'm Jayvic 👋
          </span>
        </Link>
      </nav>
    </div>
  );
}
