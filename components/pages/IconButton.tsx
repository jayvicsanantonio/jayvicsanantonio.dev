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
  subtitle,
}: {
  IconName: React.FC<React.SVGProps<SVGSVGElement>>;
  link: string;
  callback?: () => void;
  children: React.ReactNode;
  subtitle?: string;
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
        className={`flex items-center py-3 rounded-xl cursor-pointer border border-white/0 transition-colors will-change-transform duration-200 font-oswald px-4 ${
          isActive
            ? 'text-white bg-[#151626] hover:no-underline border-white/10'
            : 'dark:text-white text-gray-950 hover:bg-[#141524] hover:border-white/10'
        }`}
        tabIndex={0}
        style={isActive ? undefined : { x: springX, y: springY }}
        onMouseMove={isActive ? undefined : onMouseMove}
        onMouseLeave={isActive ? undefined : onMouseLeave}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0f1020] text-white/90">
          <Icon
            name={IconName}
            size={22}
            strokeWidth={2}
            stroke={isActive ? 'currentColor' : 'url(#iconGradient)'}
            aria-hidden={true}
            boopConfig={
              isActive
                ? { rotation: 0, timing: 0 }
                : { rotation: 20, timing: 300 }
            }
          />
        </div>
        <div className="ml-3 flex flex-col items-start">
          <span className="text-[1.05rem] leading-tight font-semibold tracking-wide">
            {children}
          </span>
          {subtitle ? (
            <span className="text-sm leading-tight text-white/60 -mt-0.5">
              {subtitle}
            </span>
          ) : null}
        </div>
      </motion.div>
    </Link>
  );
}
