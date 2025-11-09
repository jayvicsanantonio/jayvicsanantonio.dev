"use client";

import { Icon } from "@iconify/react";
import type { CSSProperties } from "react";

import { NavPill } from "@/components/ui/NavPill";
import { CFG } from "@/app/(home)/_components/Hero/config";

export const HERO_NAV_PILL_WIDTH = "clamp(320px, var(--nav-row-w, 20vw), 560px)";
export const HERO_NAV_PILL_HEIGHT = "clamp(54px, var(--pill-h, 8vh), 96px)";
export const HERO_NAV_BUTTON_HEIGHT = `${CFG.nav.buttonSize.h}px`;
export const HERO_NAV_ROW_GAP = `calc(${HERO_NAV_PILL_WIDTH} + min(2rem, 4vw))`;

type NavItem = {
  href: string;
  ariaLabel: string;
  tooltip: string;
  icon: string;
  iconSize: number;
  vtTagName?: "projects" | "work";
  external?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  {
    href: "https://www.linkedin.com/in/jayvicsanantonio/",
    ariaLabel: "LinkedIn",
    tooltip: "LinkedIn",
    icon: "mdi:linkedin",
    iconSize: 40,
    external: true,
  },
  {
    href: "/projects",
    ariaLabel: "Projects",
    tooltip: "Projects",
    icon: "mdi:application-brackets",
    iconSize: 36,
    vtTagName: "projects",
  },
  {
    href: "/work",
    ariaLabel: "Work Experience",
    tooltip: "Work Experience",
    icon: "mdi:timeline-text",
    iconSize: 36,
    vtTagName: "work",
  },
  {
    href: "https://github.com/jayvicsanantonio",
    ariaLabel: "GitHub",
    tooltip: "GitHub",
    icon: "mdi:github",
    iconSize: 40,
    external: true,
  },
];

const BUTTON_CLASSES =
  "text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 bg-white/20 backdrop-blur-[24px] backdrop-saturate-200 border-white/55 hover:border-white/60";

export default function NavRow() {
  return (
    <nav aria-label="Hero quick links" className="w-full">
      <div className="mx-auto flex w-fit items-center gap-3.5">
        <div className="flex items-center gap-3.5">
          {NAV_ITEMS.slice(0, 2).map((item) => {
            const navPillProps = {
              ...(item.vtTagName ? { vtTagName: item.vtTagName } : {}),
              ...(item.external ? { external: true } : {}),
            };
            return (
              <NavPill
                key={item.ariaLabel}
                href={item.href}
                ariaLabel={item.ariaLabel}
                icon={<Icon icon={item.icon} width={item.iconSize} height={item.iconSize} />}
                tooltip={item.tooltip}
                collapsedPx={CFG.nav.buttonSize.w}
                heightPx={CFG.nav.buttonSize.h}
                className={BUTTON_CLASSES}
                {...navPillProps}
              />
            );
          })}
        </div>

        <div
          aria-hidden
          className="h-px"
          style={{ width: HERO_NAV_PILL_WIDTH } as CSSProperties}
          data-nav-spacer
        />

        <div className="flex items-center gap-3.5">
          {NAV_ITEMS.slice(2).map((item) => {
            const navPillProps = {
              ...(item.vtTagName ? { vtTagName: item.vtTagName } : {}),
              ...(item.external ? { external: true } : {}),
            };
            return (
              <NavPill
                key={item.ariaLabel}
                href={item.href}
                ariaLabel={item.ariaLabel}
                icon={<Icon icon={item.icon} width={item.iconSize} height={item.iconSize} />}
                tooltip={item.tooltip}
                collapsedPx={CFG.nav.buttonSize.w}
                heightPx={CFG.nav.buttonSize.h}
                className={BUTTON_CLASSES}
                {...navPillProps}
              />
            );
          })}
        </div>
      </div>
    </nav>
  );
}
