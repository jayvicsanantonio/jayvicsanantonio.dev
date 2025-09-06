'use client';

import { motion } from 'framer-motion';
import React, { MouseEventHandler, TouchEventHandler } from 'react';

import useBoop from '@/hooks/useBoop';

export default function SocialMediaIconButton({
  Icon,
  link,
  className,
  children,
}: {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  link: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [controls, trigger] = useBoop({ scale: 1.06, timing: 180 });

  return (
    <motion.a
      href={link}
      animate={controls}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      target="_blank"
      rel="noopener noreferrer"
      className="transition will-change-transform hover:text-cyan-300"
      onMouseEnter={trigger as MouseEventHandler<HTMLAnchorElement>}
      onTouchStart={trigger as TouchEventHandler<HTMLAnchorElement>}
    >
      <Icon className={`${className ? className : 'h-6 w-6 md:h-8 md:w-8'}`} aria-hidden="true" />
      <span className="sr-only">{children}</span>
    </motion.a>
  );
}
