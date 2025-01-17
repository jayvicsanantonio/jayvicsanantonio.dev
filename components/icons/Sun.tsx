"use client";
import { StrokeLineCap } from "@/types/stroke-line-cap";
import { StrokeLineJoin } from "@/types/stroke-line-join";

export default function Sun({
  className,
  fill = "none",
  stroke = "url(#iconGradient)",
  strokeWidth = "2",
  strokeLinecap = "round",
  strokeLinejoin = "round",
}: {
  className?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
  strokeLinecap?: StrokeLineCap;
  strokeLinejoin?: StrokeLineJoin;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="m19.07 4.93-1.41 1.41" />
      <path d="M20 12h2" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M12 20v2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="M2 12h2" />
      <path d="m4.93 4.93 1.41 1.41" />
    </svg>
  );
}
