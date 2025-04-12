'use client';

import { motion } from 'framer-motion';
import { MouseEventHandler, TouchEventHandler } from 'react';
import useBoop from '@/hooks/use-boop';

export default function Icon({
  name: Component,
  className,
  size = 24,
  strokeWidth = 2,
  stroke = 'url(#iconGradient)',
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
  const [controls, trigger] = useBoop(boopConfig);

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      animate={controls} // Use animate prop with controls
      onMouseEnter={trigger as MouseEventHandler<SVGSVGElement>}
      onTouchStart={trigger as TouchEventHandler<SVGSVGElement>}
      // Initial state can be set here if needed, e.g., initial={{ transform: 'translate(0px, 0px) rotate(0deg) scale(1)' }}
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
    </motion.svg>
  );
}
