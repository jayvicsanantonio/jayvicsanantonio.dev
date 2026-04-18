"use client";

import type { ComponentProps, CSSProperties } from "react";

import { NavPill } from "@/components/navigation/NavPill";
import Icon from "@/components/primitives/Icon";

const HERO_NAV_PILL_WIDTH = "clamp(280px, var(--nav-row-w, 22vw), 520px)";
const HERO_NAV_PILL_HEIGHT = "clamp(48px, var(--pill-h, 10vh), 72px)";
const HERO_NAV_BUTTON_HEIGHT = HERO_NAV_PILL_HEIGHT;
const HERO_NAV_BUTTON_WIDTH = "clamp(60px, 17vw, 84px)";

type NavItem = {
  href: string;
  ariaLabel: string;
  tooltip: string;
  icon: ComponentProps<typeof Icon>["name"];
  iconSize: number;
  vtTagName?: "projects" | "work";
  external?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  {
    href: "https://www.linkedin.com/in/jayvicsanantonio/",
    ariaLabel: "LinkedIn",
    tooltip: "LinkedIn",
    icon: "linkedin",
    iconSize: 34,
    external: true,
  },
  {
    href: "/projects",
    ariaLabel: "Projects",
    tooltip: "Projects",
    icon: "projects",
    iconSize: 31,
    vtTagName: "projects",
  },
  {
    href: "/work",
    ariaLabel: "Work Experience",
    tooltip: "Work Experience",
    icon: "work",
    iconSize: 31,
    vtTagName: "work",
  },
  {
    href: "https://github.com/jayvicsanantonio",
    ariaLabel: "GitHub",
    tooltip: "GitHub",
    icon: "github",
    iconSize: 26,
    external: true,
  },
];

const BUTTON_CLASSES =
  "text-white/95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80 focus-visible:ring-offset-0 bg-white/10 backdrop-blur-[24px] backdrop-saturate-[180%] border-white/30 shadow-[0_12px_28px_rgba(0,0,0,0.34),0_0_18px_rgba(34,211,238,0.32)] hover:border-cyan-200/60 hover:bg-white/14 hover:shadow-[0_14px_32px_rgba(0,0,0,0.36),0_0_22px_rgba(34,211,238,0.45)]";

export default function Navigation() {
  return (
    <nav aria-label="Hero quick links" className="w-full">
      <div className="mx-auto flex w-fit items-center gap-2.5 sm:gap-3 md:gap-3.5">
        <div className="flex items-center gap-2.5 sm:gap-3 md:gap-3.5">
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
                icon={<Icon name={item.icon} size={item.iconSize} />}
                tooltip={item.tooltip}
                collapsedPx={HERO_NAV_BUTTON_WIDTH}
                heightPx={HERO_NAV_BUTTON_HEIGHT}
                className={BUTTON_CLASSES}
                {...navPillProps}
              />
            );
          })}
        </div>

        <div
          aria-hidden
          className="hidden h-px md:block"
          style={{ width: HERO_NAV_PILL_WIDTH } as CSSProperties}
          data-nav-spacer
        />

        <div className="flex items-center gap-2.5 sm:gap-3 md:gap-3.5">
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
                icon={<Icon name={item.icon} size={item.iconSize} />}
                tooltip={item.tooltip}
                collapsedPx={HERO_NAV_BUTTON_WIDTH}
                heightPx={HERO_NAV_BUTTON_HEIGHT}
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
