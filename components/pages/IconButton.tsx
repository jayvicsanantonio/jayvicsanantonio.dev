"use client";

import { MouseEventHandler, TouchEventHandler } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { animated } from "react-spring";
import useBoop from "@/hooks/use-boop";
import Icon from "@/components/pages/Icon";

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
  const [style, trigger] = useBoop({ rotation: 20, timing: 200 });
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link href={link} passHref legacyBehavior>
      <a
        href={link}
        className={`flex items-center py-1 rounded-lg text-lg cursor-pointer border-none transition-colors will-change-transform duration-200 font-oswald font-bold space-x-2 px-2 ${
          isActive
            ? "text-transparent bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white"
            : "dark:text-white text-gray-950"
        }`}
        onClick={() => callback()}
        tabIndex={0}
        onMouseEnter={trigger as MouseEventHandler<HTMLAnchorElement>}
        onTouchStart={trigger as TouchEventHandler<HTMLAnchorElement>}
      >
        <animated.span
          style={style}
          className="flex justify-center items-center rounded "
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <defs>
              <linearGradient
                id="iconButtonGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <Icon
              name={IconName}
              strokeWidth={2.5}
              stroke={isActive ? "currentColor" : "url(#iconButtonGradient)"}
            />
          </svg>
        </animated.span>
        <span>{children}</span>
      </a>
    </Link>
  );
}
