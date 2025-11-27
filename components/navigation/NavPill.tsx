"use client";

import React from "react";

import { GlassButton } from "@/components/primitives/GlassButton";

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
  tooltip?: string; // Tooltip text when non-active
  tooltipPlacement?: "above" | "below"; // Default: 'above'
  className?: string;
};

export function NavPill({
  href,
  ariaLabel,
  icon,
  label: _label,
  active = false,
  vtTagName,
  cyanAccent = false,
  external = false,
  collapsedPx = 48,
  expandedPx: _expandedPx = 140,
  heightPx = 48,
  tooltip,
  tooltipPlacement = "above",
  className,
}: NavPillProps) {
  // View-transition tag (optional)
  const vtClass = vtTagName ? `vt-tag-${vtTagName}` : "";

  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" as const } : {};

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
          WebkitBackdropFilter: "blur(24px) saturate(200%)",
          backdropFilter: "blur(24px) saturate(200%)",
        }}
        aria-current={active ? "page" : undefined}
        {...linkProps}
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
            {(() => {
              if (React.isValidElement(icon)) {
                type IconProps = {
                  className?: string;
                  color?: string;
                  style?: React.CSSProperties;
                };
                const el = icon as React.ReactElement<IconProps>;
                const prevClass = el.props.className ?? "";
                return React.cloneElement(el, {
                  className: [prevClass, active ? "text-cyan-300" : ""].filter(Boolean).join(" "),
                  style: {
                    ...(el.props.style ?? {}),
                    color: active ? "#22d3ee" : el.props.style?.color,
                  },
                });
              }
              return icon;
            })()}
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
