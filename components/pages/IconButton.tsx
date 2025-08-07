'use client';

import { MouseEventHandler, TouchEventHandler } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useBoop from '@/hooks/use-boop';
import Icon from '@/components/pages/Icon';

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

  return (
    <Link
      href={link}
      passHref
      className={`flex items-center py-1 rounded-lg text-lg cursor-pointer border-none transition-colors will-change-transform duration-200 font-oswald font-semibold tracking-wide space-x-2 px-2 hover:underline hover:underline-offset-2 ${
        isActive
          ? 'text-white bg-linear-to-r from-blue-500/80 to-purple-500/80 hover:no-underline'
          : 'dark:text-white text-gray-950'
      }`}
      onClick={() => callback()}
      tabIndex={0}
    >
      <Icon
        name={IconName}
        size={24}
        strokeWidth={2.5}
        stroke={isActive ? 'currentColor' : 'url(#iconGradient)'}
        aria-hidden={true}
        boopConfig={{
          rotation: 20,
          timing: 300,
        }}
      />
      <span>{children}</span>
    </Link>
  );
}
