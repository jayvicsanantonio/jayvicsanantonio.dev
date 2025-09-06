'use client';

import { motion } from 'framer-motion';
import { MouseEventHandler, TouchEventHandler } from 'react';

import useBoop from '@/hooks/useBoop';

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
  animationType = 'default',
  isActive = false,
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
  animationType?: 'default' | 'home' | 'projects' | 'work';
  isActive?: boolean;
  props?: Array<any>;
}) {
  const [controls, trigger] = useBoop(boopConfig);

  // Define specific animation variants for different icon types
  const iconVariants = {
    default: {
      rest: { scale: 1, rotate: 0 },
      hover: {
        scale: 1.15,
        rotate: 12,
        transition: { type: 'spring', stiffness: 500, damping: 15 },
      },
    },
    home: {
      rest: { scale: 1, y: 0, rotate: 0 },
      hover: {
        scale: 1.2,
        y: -3,
        rotate: -8,
        transition: {
          type: 'spring',
          stiffness: 600,
          damping: 12,
          duration: 0.3,
        },
      },
    },
    projects: {
      rest: { scale: 1, rotate: 0, x: 0 },
      hover: {
        scale: 1.15,
        rotate: 8,
        x: 1,
        transition: {
          type: 'spring',
          stiffness: 450,
          damping: 14,
          duration: 0.25,
        },
      },
    },
    work: {
      rest: { scale: 1, rotateY: 0, rotateX: 0 },
      hover: {
        scale: 1.18,
        rotateY: 12,
        rotateX: 5,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 16,
          duration: 0.3,
        },
      },
    },
  };

  // Create static variant for active state
  const staticVariant = {
    rest: { scale: 1, rotate: 0, x: 0, y: 0, rotateX: 0, rotateY: 0 },
    hover: {
      scale: 1,
      rotate: 0,
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
    },
  };

  return (
    <motion.div
      className="flex items-center justify-center"
      initial="rest"
      whileHover={isActive ? 'rest' : 'hover'}
      variants={isActive ? staticVariant : iconVariants[animationType]}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={className}
        animate={controls}
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
        <Component size={size} stroke={stroke} strokeWidth={strokeWidth} {...props} />
      </motion.svg>
    </motion.div>
  );
}
