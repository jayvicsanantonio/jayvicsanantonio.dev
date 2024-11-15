"use client";

import { MouseEventHandler, TouchEventHandler } from "react";
import Link from "next/link";
import useBoop from "@/hooks/use-boop";
import { animated } from "react-spring";

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
  const [style, trigger] = useBoop({ rotation: 10, timing: 200 });

  return (
    <Link href={link} passHref legacyBehavior>
      <animated.a
        href={link}
        style={style}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-400 transition-colors"
        onMouseEnter={trigger as MouseEventHandler<HTMLAnchorElement>}
        onTouchStart={trigger as TouchEventHandler<HTMLAnchorElement>}
      >
        <Icon
          className={`${className ? className : "w-6 h-6 md:w-8 md:h-8"}`}
        />
      </animated.a>
    </Link>
  );
}
