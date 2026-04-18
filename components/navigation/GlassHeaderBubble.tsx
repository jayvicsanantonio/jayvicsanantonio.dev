"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavPill } from "@/components/navigation/NavPill";
import {
  NAV_BUTTON_CLASSES,
  NAV_HOME_LINK_CLASSES,
  NAV_ICON_CLASSES,
} from "@/components/navigation/navStyles";
import Icon from "@/components/primitives/Icon";

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
              icon={<Icon name="linkedin" className={NAV_ICON_CLASSES.linkedin} />}
              external
              tooltip="LinkedIn"
              tooltipPlacement="below"
              collapsedPx={"clamp(56px,11vw,84px)"}
              heightPx={"clamp(48px,9.5vw,72px)"}
              className={NAV_BUTTON_CLASSES}
            />
          </span>

          <span className="sm:order-2">
            <NavPill
              href="/projects"
              ariaLabel="Projects"
              icon={<Icon name="projects" className={NAV_ICON_CLASSES.projects} />}
              label="Projects"
              active={isProjects}
              {...projectsTooltipProps}
              collapsedPx={"clamp(56px,11vw,84px)"}
              expandedPx={"clamp(120px,40vw,180px)"}
              heightPx={"clamp(48px,9.5vw,72px)"}
              className={NAV_BUTTON_CLASSES}
            />
          </span>

          <span className="sm:order-4">
            <NavPill
              href="/work"
              ariaLabel="Work"
              icon={<Icon name="work" className={NAV_ICON_CLASSES.work} />}
              label="Work"
              active={isWork}
              {...workTooltipProps}
              collapsedPx={"clamp(56px,11vw,84px)"}
              expandedPx={"clamp(104px,34vw,160px)"}
              heightPx={"clamp(48px,9.5vw,72px)"}
              className={NAV_BUTTON_CLASSES}
            />
          </span>

          <span className="sm:order-5">
            <NavPill
              href="https://github.com/jayvicsanantonio"
              ariaLabel="GitHub"
              icon={<Icon name="github" className={NAV_ICON_CLASSES.github} />}
              external
              tooltip="GitHub"
              tooltipPlacement="below"
              collapsedPx={"clamp(56px,11vw,84px)"}
              heightPx={"clamp(48px,9.5vw,72px)"}
              className={NAV_BUTTON_CLASSES}
            />
          </span>
        </div>

        <Link
          href="/"
          aria-label="Home"
          className={NAV_HOME_LINK_CLASSES}
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
