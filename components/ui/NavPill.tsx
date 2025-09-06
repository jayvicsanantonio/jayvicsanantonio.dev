"use client";

import { GlassButton } from "@/components/ui/GlassButton";
import React from "react";

export type NavPillProps = {
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
  label?: string; // Text shown when active
  active?: boolean; // Controls expansion + letter reveal
  vtTagName?: string; // e.g., 'projects' | 'work' — always applied when provided
  cyanAccent?: boolean; // Optional cyan border tint (Home)
  external?: boolean; // Open in new tab
  collapsedPx?: number | string; // Default 48; can be CSS strings like 'clamp(...)'
  expandedPx?: number | string; // Default 140; CSS strings allowed
  heightPx?: number | string; // Default 48; CSS strings allowed
  prefersReducedMotion?: boolean;
  tooltip?: string; // Tooltip text when non-active
  tooltipPlacement?: "above" | "below"; // Default: 'above'
  className?: string;
};

export function NavPill({
  href,
  ariaLabel,
  icon,
  label,
  active = false,
  vtTagName,
  cyanAccent = false,
  external = false,
  collapsedPx = 48,
  expandedPx = 140,
  heightPx = 48,
  prefersReducedMotion = false,
  tooltip,
  tooltipPlacement = "above",
  className,
}: NavPillProps) {
  // View-transition tag (optional)
  const vtClass = vtTagName ? `vt-tag-${vtTagName}` : "";

  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" as const }
    : {};

  return (
    <div
      className="group relative inline-block"
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
          "rounded-full inline-flex items-center justify-center",
          cyanAccent ? "border-cyan-400/50 hover:border-cyan-300/60" : "",
          active ? "border-cyan-400/70 hover:border-cyan-300/70" : "",
          vtClass,
          className ?? "",
        ].join(" ")}
        style={{
          width: collapsedPx,
          height: heightPx,
          transition: "width 200ms ease-out",
          willChange: "width",
        }}
        aria-current={active ? "page" : undefined}
        {...linkProps}
      >
        <span className="inline-flex items-center gap-2">
          {/* Icon with cursor-follow transform */}
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
            {/* Force icon cyan when active */}
            {(() => {
              if (React.isValidElement(icon)) {
                const prevClass = (icon.props as any).className || "";
                return React.cloneElement(icon as any, {
                  className: [prevClass, active ? "text-cyan-300" : ""].filter(Boolean).join(" "),
                  color: active ? "#22d3ee" : (icon.props as any).color,
                  style: {
                    ...(icon.props as any).style,
                    color: active ? "#22d3ee" : (icon.props as any).style?.color,
                  },
                });
              }
              return icon;
            })()}
          </span>
          {/* icon-only; no expanding pill text */}
        </span>
      </GlassButton>

      {/* Tooltip only when non-active and tooltip prop provided */}
      {!active && tooltip ? (
        <span
          className={[
            "pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-md bg-black/80 px-2 py-1 text-[11px] md:text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg z-50",
            tooltipPlacement === "above" ? "-translate-y-full -top-2" : "",
          ].join(" ")}
          style={
            tooltipPlacement === "below"
              ? { top: "calc(100% + 10px)" }
              : undefined
          }
        >
          {tooltip}
        </span>
      ) : null}

      {/* Active route indicator dot */}
      {active ? (
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[calc(100%+6px)] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.65)]"
        />
      ) : null}
    </div>
  );
}
