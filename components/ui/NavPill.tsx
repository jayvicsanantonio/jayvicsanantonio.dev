import React, { useId } from "react";

import { GlassButton } from "@/components/ui/GlassButton";

import NavPillMotion from "./NavPill.client";

const sanitizeId = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, "");

export type NavPillProps = {
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
  label?: string;
  active?: boolean;
  vtTagName?: string;
  cyanAccent?: boolean;
  external?: boolean;
  collapsedPx?: number | string;
  expandedPx?: number | string;
  heightPx?: number | string;
  tooltip?: string;
  tooltipPlacement?: "above" | "below";
  className?: string;
  interactive?: boolean;
};

function renderIcon(icon: React.ReactNode, active: boolean) {
  if (React.isValidElement(icon)) {
    type IconProps = {
      className?: string;
      color?: string;
      style?: React.CSSProperties;
    };
    const element = icon as React.ReactElement<IconProps>;
    const prevClass = element.props.className ?? "";
    return React.cloneElement(element, {
      className: [prevClass, active ? "text-cyan-300" : ""].filter(Boolean).join(" "),
      style: {
        ...(element.props.style ?? {}),
        color: active ? "#22d3ee" : element.props.style?.color,
      },
    });
  }
  return icon;
}

function NavPill({
  href,
  ariaLabel,
  icon,
  active = false,
  vtTagName,
  cyanAccent = false,
  external = false,
  collapsedPx = 48,
  expandedPx: _expandedPx = 140, // reserved for future expansion animation
  heightPx = 48,
  tooltip,
  tooltipPlacement = "above",
  className,
  interactive = true,
}: NavPillProps) {
  const reactId = useId();
  const elementId = `nav-pill-${sanitizeId(reactId)}`;

  const vtClass = vtTagName ? `vt-tag-${vtTagName}` : "";
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" as const } : {};

  return (
    <fieldset id={elementId} className="group relative inline-block">
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
            {renderIcon(icon, active)}
          </span>
        </span>
      </GlassButton>

      {!active && tooltip ? (
        <span
          className={[
            "pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-md bg-black/80 px-2 py-1 text-[11px] whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 md:text-xs",
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

      {interactive ? <NavPillMotion targetId={elementId} /> : null}
    </fieldset>
  );
}

export { NavPill };
export default NavPill;
