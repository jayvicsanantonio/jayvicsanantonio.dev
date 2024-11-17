import { MouseEventHandler, TouchEventHandler } from "react";
import { animated } from "react-spring";
import useBoop from "@/hooks/use-boop";
import { strokeLineCap } from "@/types/stroke-line-cap";
import { strokeLineJoin } from "@/types/stroke-line-join";

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
  strokeLinecap?: strokeLineCap;
  strokeLinejoin?: strokeLineJoin;
}) {
  const [style, trigger] = useBoop({
    rotation: 90,
    timing: 300,
  });

  return (
    <animated.svg
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
      style={style}
      onMouseEnter={trigger as MouseEventHandler<SVGSVGElement>}
      onTouchStart={trigger as TouchEventHandler<SVGSVGElement>}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </animated.svg>
  );
}
