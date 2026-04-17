import type { SVGProps } from "react";

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

const PATHS: Record<IconName, string> = {
  check: "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  chevronDown: "M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z",
  external: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14zm-9 4h6v2H7v10h10v-4h2v6H5z",
  github:
    "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.61-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 5.85c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.92.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2",
  linkedin:
    "M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-11.66 15v-8.5H4.67V18zM6 8.35a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1M19.33 18v-4.66c0-2.49-1.33-3.65-3.1-3.65a2.68 2.68 0 0 0-2.43 1.34h-.04V9.5h-2.56V18h2.67v-4.2c0-1.1.21-2.18 1.58-2.18 1.35 0 1.37 1.27 1.37 2.25V18z",
  play: "M8 5v14l11-7z",
  projects:
    "M4 5h7v2H6v10h5v2H4zm16 0v14h-7v-2h5V7h-5V5zm-7.59 4.41L11 8l-4 4 4 4 1.41-1.41L9.83 12z",
  work: "M4 5h16v2H4zm0 4h16v2H4zm0 4h10v2H4zm0 4h14v2H4z",
};

export default function Icon({ name, size = 24, className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      focusable="false"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
