'use client';

import { MouseEventHandler, TouchEventHandler } from 'react';
import useBoop from '@/hooks/use-boop';
import { motion } from 'framer-motion'; // Import motion

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
  const [controls, trigger] = useBoop({ rotation: 10, timing: 200 }); // Get controls

  return (
    <motion.a // Use motion.a
      href={link}
      animate={controls} // Pass controls to animate prop
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-400 transition-colors will-change-transform"
      onMouseEnter={trigger as MouseEventHandler<HTMLAnchorElement>}
      onTouchStart={trigger as TouchEventHandler<HTMLAnchorElement>}
      // Remove style={style}
    >
      <Icon
        className={`${
          className ? className : 'w-6 h-6 md:w-8 md:h-8'
        }`}
      />
    </motion.a>
  );
}
