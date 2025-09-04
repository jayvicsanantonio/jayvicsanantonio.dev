'use client';

import { useRef } from 'react';
import type React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/pages/Icon';
import { motion } from 'framer-motion';

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

  // Map routes to animation types
  const getAnimationType = (route: string) => {
    switch (route) {
      case '/':
        return 'home';
      case '/projects':
        return 'projects';
      case '/work':
        return 'work';
      default:
        return 'default';
    }
  };

  return (
    <Link href={link} onClick={() => callback()} className={"block"}>
      <motion.div
        ref={ref}
        className={`flex items-center py-3 rounded-xl cursor-pointer border border-white/0 transition-colors will-change-transform duration-200 font-oswald px-3 sm:px-4 ${
          isActive
            ? 'text-white bg-[#151626] hover:no-underline border-white/10'
            : 'dark:text-white text-gray-950 hover:bg-[#141524] hover:border-white/10'
        }`}
        whileHover={
          isActive
            ? {}
            : {
                scale: 1.02,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 17,
                },
              }
        }
        whileTap={isActive ? {} : { scale: 0.98 }}
        tabIndex={0}
      >
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[#0f1020] text-white/90">
          <Icon
            name={IconName}
            size={22}
            strokeWidth={2}
            stroke={isActive ? 'currentColor' : 'url(#iconGradient)'}
            animationType={getAnimationType(link)}
            isActive={isActive}
            aria-hidden={true}
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
