'use client';

import { MouseEventHandler, TouchEventHandler } from 'react';
import useBoop from '@/hooks/use-boop';
import { motion } from 'framer-motion';

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
  const [controls, trigger] = useBoop({ rotation: 10, timing: 200 });

  return (
    <motion.a
      href={link}
      animate={controls}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-400 transition-colors will-change-transform"
      onMouseEnter={trigger as MouseEventHandler<HTMLAnchorElement>}
      onTouchStart={trigger as TouchEventHandler<HTMLAnchorElement>}
    >
      <Icon
        className={`${
          className ? className : 'w-6 h-6 md:w-8 md:h-8'
        }`}
        aria-hidden="true"
      />
      <span className="sr-only">{children}</span>
    </motion.a>
  );
}
