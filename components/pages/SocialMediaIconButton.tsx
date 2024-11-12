"use client";

import { MouseEventHandler, TouchEventHandler } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useBoop from "@/hooks/use-boop";
import { animated } from "react-spring";

export default function SocialMediaIconButton({
  Icon,
  link,
  children,
}: {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  link: string;
  children: React.ReactNode;
}) {
  const [style, trigger] = useBoop({ rotation: 10, timing: 200 });
  const pathname = usePathname();

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
        <Icon className="w-8 h-8" />
      </animated.a>
    </Link>
  );
}
