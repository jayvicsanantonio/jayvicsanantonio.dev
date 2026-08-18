"use client";

import type React from "react";

import { GlassButton } from "@/components/primitives/GlassButton";

export type NavPillProps = {
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
  active?: boolean; // Cyan tint, aria-current, tooltip suppression, and the active dot
  vtTagName?: string; // e.g., 'projects' | 'work' — always applied when provided
  external?: boolean; // Open in new tab
  widthPx?: number | string; // Default 48; CSS strings such as clamp() are allowed
  heightPx?: number | string; // Default 48; CSS strings allowed
  tooltip?: string; // Tooltip text when non-active
  tooltipPlacement?: "above" | "below"; // Default: 'above'
  className?: string;
};

export function NavPill({
  href,
  ariaLabel,
  icon,
  active = false,
  vtTagName,
  external = false,
  widthPx = 48,
  heightPx = 48,
  tooltip,
  tooltipPlacement = "above",
  className,
}: NavPillProps) {
  // View-transition tag (optional)
  const vtClass = vtTagName ? `vt-tag-${vtTagName}` : "";

  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" as const } : {};
  const prefetchProps = external ? {} : { prefetch: false as const };

  return (
    <fieldset
      className="group relative inline-block m-0 border-0 p-0"
      onMouseMove={(e) => {
        const t = e.currentTarget as HTMLElement;
        const r = t.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const my = ((e.clientY - r.top) / r.height - 0.5) * 2;
        t.style.setProperty("--mx", String(mx));
        t.style.setProperty("--my", String(my));
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget as HTMLElement;
        t.style.setProperty("--mx", "0");
        t.style.setProperty("--my", "0");
      }}
    >
      <GlassButton
        href={href}
        aria-label={ariaLabel}
        className={[
          active ? "border-cyan-400/70 hover:border-cyan-300/70" : "",
          vtClass,
          className ?? "",
        ].join(" ")}
        style={{
          width: widthPx,
          height: heightPx,
          transition: "width 200ms ease-out",
          WebkitBackdropFilter: "blur(24px) saturate(200%)",
          backdropFilter: "blur(24px) saturate(200%)",
        }}
        aria-current={active ? "page" : undefined}
        {...linkProps}
        {...prefetchProps}
      >
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className="inline-flex"
            style={{
              transform:
                "translate(calc(var(--mx, 0) * 12px), calc(var(--my, 0) * 12px)) rotate(calc(var(--mx, 0) * -6deg))",
              transition: "transform 360ms cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "transform",
              color: active ? "#22d3ee" : undefined,
            }}
          >
            {icon}
          </span>
        </span>
      </GlassButton>

      {!active && tooltip ? (
        <span
          className={[
            "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 rounded-md bg-black/80 px-2 py-1 text-[11px] whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 md:text-xs",
            tooltipPlacement === "above" ? "-top-2 -translate-y-full" : "",
          ].join(" ")}
          style={tooltipPlacement === "below" ? { top: "calc(100% + 10px)" } : undefined}
        >
          {tooltip}
        </span>
      ) : null}

      {active ? (
        <span
          aria-hidden
          className="pointer-events-none absolute top-[calc(100%+6px)] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.65)]"
        />
      ) : null}
    </fieldset>
  );
}
