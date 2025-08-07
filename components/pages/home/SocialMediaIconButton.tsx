'use client';

import { MouseEventHandler, TouchEventHandler } from 'react';
import useBoop from '@/hooks/use-boop';
import { motion } from 'framer-motion';

export default function SocialMediaIconButton({
  Icon,
  link,
  className = '',
  children,
}: {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  link: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [controls, trigger] = useBoop({ rotation: 5, scale: 1.1, timing: 300 });

  return (
    <motion.a
      href={link}
      animate={controls}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative p-3 rounded-xl bg-charcoal/30 border border-pewter/20 text-silver hover:text-pearl hover:border-amber/50 transition-all duration-300 backdrop-blur-sm will-change-transform ${className}`}
      onMouseEnter={trigger as MouseEventHandler<HTMLAnchorElement>}
      onTouchStart={trigger as TouchEventHandler<HTMLAnchorElement>}
    >
      {/* Background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber/10 to-rose/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      
      <Icon
        className="w-5 h-5 transition-colors duration-300"
        aria-hidden="true"
      />
      
      {/* Tooltip */}
      <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-charcoal border border-pewter/30 text-xs font-medium text-pearl rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none backdrop-blur-sm whitespace-nowrap">
        {children}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-pewter/30" />
      </span>
      
      <span className="sr-only">{children}</span>
    </motion.a>
  );
}
