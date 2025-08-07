'use client';

import { useRef } from 'react';
import type React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useBoop from '@/hooks/use-boop';
import Icon from '@/components/pages/Icon';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function IconButton({
  IconName,
  link,
  callback = () => {},
  children,
}: {
  IconName: React.FC<React.SVGProps<SVGSVGElement>>;
  link: string;
  callback?: () => void;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === link;
  const ref = useRef<HTMLDivElement | null>(null);

  // Subtle magnetic hover
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, {
    stiffness: 300,
    damping: 30,
    mass: 0.5,
  });
  const springY = useSpring(y, {
    stiffness: 300,
    damping: 30,
    mass: 0.5,
  });

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.05);
    y.set(relY * 0.05);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link href={link} onClick={() => callback()} className="block">
      <motion.div
        ref={ref}
        className={`flex items-center py-2 rounded-xl text-lg cursor-pointer border border-white/0 transition-colors will-change-transform duration-200 font-oswald font-semibold tracking-wide space-x-2 px-3 hover:underline hover:underline-offset-2 ${
          isActive
            ? 'text-white bg-linear-to-r from-blue-500/20 to-purple-500/20 hover:no-underline border-white/10'
            : 'dark:text-white text-gray-950 hover:bg-white/5 hover:border-white/10'
        }`}
        tabIndex={0}
        style={{ x: springX, y: springY }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <Icon
          name={IconName}
          size={24}
          strokeWidth={2.5}
          stroke={isActive ? 'currentColor' : 'url(#iconGradient)'}
          aria-hidden={true}
          boopConfig={{ rotation: 20, timing: 300 }}
        />
        <span>{children}</span>
      </motion.div>
    </Link>
  );
}
