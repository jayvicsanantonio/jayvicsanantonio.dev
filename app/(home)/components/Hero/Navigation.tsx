"use client";

import type { ComponentProps, CSSProperties } from "react";

import { NavPill } from "@/components/navigation/NavPill";
import { NAV_BUTTON_CLASSES, NAV_BUTTON_WIDTH } from "@/components/navigation/navStyles";
import Icon from "@/components/primitives/Icon";

const HERO_NAV_PILL_WIDTH = "clamp(280px, var(--nav-row-w, 22vw), 520px)";
const HERO_NAV_PILL_HEIGHT = "clamp(48px, var(--pill-h, 10vh), 72px)";
const HERO_NAV_BUTTON_HEIGHT = HERO_NAV_PILL_HEIGHT;

type NavItem = {
  href: string;
  ariaLabel: string;
  tooltip: string;
  icon: ComponentProps<typeof Icon>["name"];
  iconSize: number;
  vtTagName?: "projects" | "work";
  external?: boolean;
};

const LEFT_NAV_ITEMS: NavItem[] = [
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
];

const RIGHT_NAV_ITEMS: NavItem[] = [
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

function NavGroup({ items }: { items: NavItem[] }) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3 md:gap-3.5">
      {items.map((item) => {
        // exactOptionalPropertyTypes rejects passing these as undefined, so spread them conditionally
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
            widthPx={NAV_BUTTON_WIDTH}
            heightPx={HERO_NAV_BUTTON_HEIGHT}
            className={NAV_BUTTON_CLASSES}
            {...navPillProps}
          />
        );
      })}
    </div>
  );
}

export default function Navigation() {
  return (
    <nav aria-label="Hero quick links" className="w-full">
      <div className="mx-auto flex w-fit items-center gap-2.5 sm:gap-3 md:gap-3.5">
        <NavGroup items={LEFT_NAV_ITEMS} />

        <div
          aria-hidden
          className="hidden h-px md:block"
          style={{ width: HERO_NAV_PILL_WIDTH } as CSSProperties}
          data-nav-spacer
        />

        <NavGroup items={RIGHT_NAV_ITEMS} />
      </div>
    </nav>
  );
}
