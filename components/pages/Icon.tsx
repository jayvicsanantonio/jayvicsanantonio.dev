import { animated } from "react-spring";
import { MouseEventHandler, TouchEventHandler } from "react";
import useBoop from "@/hooks/use-boop";

export default function Icon({
  name: Component,
  className,
  size = 24,
  strokeWidth = 2,
  stroke = "url(#iconGradient)",
  boopConfig = {
    rotation: 90,
    timing: 300,
  },
  ...props
}: {
  name: any;
  className?: string;
  size?: number;
  strokeWidth?: number;
  stroke?: string;
  boopConfig?: {
    scale?: number;
    rotation?: number;
    timing?: number;
  };
  props?: Array<any>;
}) {
  const [style, trigger] = useBoop(boopConfig);

  return (
    <animated.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={style}
      onMouseEnter={trigger as MouseEventHandler<SVGSVGElement>}
      onTouchStart={trigger as TouchEventHandler<SVGSVGElement>}
    >
      <defs>
        <linearGradient
          id="iconGradient"
          x1="0"
          y1="0"
          x2="24"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <Component
        size={size}
        stroke={stroke}
        strokeWidth={strokeWidth}
        {...props}
      />
    </animated.svg>
  );
}
