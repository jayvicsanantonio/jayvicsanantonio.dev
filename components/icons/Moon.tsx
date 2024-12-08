"use client";

import { StrokeLineCap } from "@/types/stroke-line-cap";
import { StrokeLineJoin } from "@/types/stroke-line-join";

export default function Moon({
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
