import type { ReactNode, SVGProps } from "react";

type IconName =
  | "check"
  | "chevronDown"
  | "external"
  | "github"
  | "linkedin"
  | "play"
  | "projects"
  | "work";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

type IconDefinition =
  | {
      paths: string[];
      type: "fill";
    }
  | {
      children: ReactNode;
      type: "stroke";
    };

const ICONS: Record<IconName, IconDefinition> = {
  check: { paths: ["M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"], type: "fill" },
  chevronDown: { paths: ["M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"], type: "fill" },
  external: {
    paths: [
      "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14zm-9 4h6v2H7v10h10v-4h2v6H5z",
    ],
    type: "fill",
  },
  github: {
    paths: [
      "M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.47.11-3.05 0 0 .97-.31 3.17 1.18A10.93 10.93 0 0 1 12 6c.98.01 1.96.13 2.88.39 2.2-1.48 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.09 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z",
    ],
    type: "fill",
  },
  linkedin: {
    children: (
      <>
        <path d="M6.5 10v7.5" />
        <path d="M10.5 17.5v-7.25" />
        <path d="M10.5 13.25c0-1.8 1.13-3.05 2.8-3.05 1.82 0 2.95 1.24 2.95 3.45v3.85" />
        <path d="M6.5 6.5v.01" />
      </>
    ),
    type: "stroke",
  },
  play: { paths: ["M8 5v14l11-7z"], type: "fill" },
  projects: {
    children: (
      <>
        <rect height="5.5" rx="1.5" width="5.5" x="4" y="4" />
        <rect height="5.5" rx="1.5" width="5.5" x="14.5" y="4" />
        <rect height="5.5" rx="1.5" width="5.5" x="4" y="14.5" />
        <path d="M14.5 16.25h5" />
        <path d="M17 13.75v5" />
      </>
    ),
    type: "stroke",
  },
  work: {
    children: (
      <>
        <path d="M9 7V5.75A1.75 1.75 0 0 1 10.75 4h2.5A1.75 1.75 0 0 1 15 5.75V7" />
        <rect height="11" rx="2" width="16" x="4" y="7" />
        <path d="M4 12.25h16" />
        <path d="M10 12.25v1.25h4v-1.25" />
      </>
    ),
    type: "stroke",
  },
};

export default function Icon({ name, size = 24, className, ...props }: IconProps) {
  const icon = ICONS[name];

  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      {icon.type === "fill" ? (
        icon.paths.map((path) => <path d={path} key={path} fill="currentColor" />)
      ) : (
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          vectorEffect="non-scaling-stroke"
        >
          {icon.children}
        </g>
      )}
    </svg>
  );
}
