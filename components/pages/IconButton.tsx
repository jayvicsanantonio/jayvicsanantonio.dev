"use client";

import { useState, useCallback } from "react";
import { MouseEventHandler, TouchEventHandler } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useBoop from "@/hooks/use-boop";
import { animated } from "react-spring";

export default function IconButton({
  Icon,
  link,
  callback = () => {},
  children,
}: {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  link: string;
  callback?: () => void;
  children: React.ReactNode;
}) {
  const [isActive, setIsActive] = useState(false);
  const [style, trigger] = useBoop({ rotation: 20, timing: 200 });
  const pathname = usePathname();

  const handleMouseEnter = useCallback(() => {
    // @ts-ignore
    trigger();
    setIsActive(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // @ts-ignore
    trigger();
    setIsActive(false);
  }, []);

  return (
    <Link href={link} passHref legacyBehavior>
      <a
        href={link}
        className={`flex items-center p-1 rounded-lg text-lg cursor-pointer border-none hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-colors duration-200 font-oswald font-bold ${
          pathname === link
            ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            : "text-white"
        }`}
        onClick={() => callback()}
        tabIndex={0}
        onMouseEnter={handleMouseEnter as MouseEventHandler<HTMLAnchorElement>}
        onMouseLeave={handleMouseLeave as MouseEventHandler<HTMLAnchorElement>}
        onTouchStart={handleMouseEnter as TouchEventHandler<HTMLAnchorElement>}
      >
        <animated.span
          style={style}
          className="flex justify-center items-center rounded text-white"
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
              strokeWidth={2.5}
              stroke={
                isActive || pathname === link
                  ? "url(#iconButtonGradient)"
                  : "currentColor"
              }
            />
          </svg>
        </animated.span>
        <span className="px-4 py-0">{children}</span>
      </a>
    </Link>
  );
}
