import type { SVGProps } from "react";

type AppIconName =
  | "chevron-down"
  | "check"
  | "external"
  | "github"
  | "linkedin"
  | "play"
  | "projects"
  | "work";

type AppIconProps = SVGProps<SVGSVGElement> & {
  name: AppIconName;
};

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.75,
};

export function AppIcon({ name, className, ...props }: AppIconProps) {
  switch (name) {
    case "linkedin":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={className}
          fill="currentColor"
          {...props}
        >
          <circle cx="4" cy="4" r="2" />
          <path d="M2 9h4v13H2z" />
          <path d="M10 9h4v2.1A4.9 4.9 0 0 1 18.2 9C21 9 22 10.8 22 14.2V22h-4v-7c0-1.7-.6-2.8-2.1-2.8-1.1 0-1.8.8-2.1 1.5-.1.3-.1.8-.1 1.2V22h-4z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...props}>
          <path
            {...strokeProps}
            d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3.3-.4 6.8-1.6 6.8-7.2a5.6 5.6 0 0 0-1.5-3.9A5.2 5.2 0 0 0 19.2 1S17.7.7 15 2.5a13.2 13.2 0 0 0-6 0C6.3.7 4.8 1 4.8 1a5.2 5.2 0 0 0-.1 2.5 5.6 5.6 0 0 0-1.5 3.9c0 5.6 3.5 6.8 6.8 7.2a4.8 4.8 0 0 0-1 3.2v4"
          />
          <path {...strokeProps} d="M9 18c-4.5 2-5-2-7-2" />
        </svg>
      );
    case "projects":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...props}>
          <path {...strokeProps} d="m8 4-5 8 5 8" />
          <path {...strokeProps} d="m16 4 5 8-5 8" />
          <path {...strokeProps} d="m14.5 4-5 16" />
        </svg>
      );
    case "work":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...props}>
          <circle cx="7" cy="6" r="1.5" fill="currentColor" />
          <circle cx="7" cy="12" r="1.5" fill="currentColor" />
          <circle cx="7" cy="18" r="1.5" fill="currentColor" />
          <path {...strokeProps} d="M10 6h9" />
          <path {...strokeProps} d="M10 12h9" />
          <path {...strokeProps} d="M10 18h9" />
          <path {...strokeProps} d="M7 7.5v3" />
          <path {...strokeProps} d="M7 13.5v3" />
        </svg>
      );
    case "chevron-down":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...props}>
          <path {...strokeProps} d="m6 9 6 6 6-6" />
        </svg>
      );
    case "play":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={className}
          fill="currentColor"
          {...props}
        >
          <path d="m8 5 11 7-11 7z" />
        </svg>
      );
    case "external":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...props}>
          <path {...strokeProps} d="M7 17 17 7" />
          <path {...strokeProps} d="M9 7h8v8" />
          <path {...strokeProps} d="M17 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...props}>
          <path {...strokeProps} d="m5 12 5 5L20 7" />
        </svg>
      );
    default:
      return null;
  }
}
