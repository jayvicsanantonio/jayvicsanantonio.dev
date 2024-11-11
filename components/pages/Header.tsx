"use client";

import {
  useState,
  useCallback,
  MouseEventHandler,
  TouchEventHandler,
} from "react";
import Link from "next/link";
import Drawer from "./Drawer";
import MainMenu from "./MainMenu";
import useBoop from "@/hooks/use-boop";
import { animated } from "react-spring";
import { Button } from "@/components/ui/button";
import { Code, Menu } from "lucide-react";

export default function Header() {
  const [style, trigger] = useBoop({ scale: 1.5, timing: 300 });
  const [isNavOpen, setIsNavOpen] = useState(false);

  const closeDrawer = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-6 bg-gray-950 border-b border-gray-800 sticky top-0 z-10 -mx-4 lg:-mx-auto">
      <Link href="/" className="flex items-center gap-2" aria-label="Logo">
        <animated.span
          onMouseEnter={trigger as MouseEventHandler<HTMLAnchorElement>}
          onTouchStart={trigger as TouchEventHandler<HTMLAnchorElement>}
          style={style}
        >
          <svg width="30" height="30" viewBox="0 0 30 30">
            <defs>
              <linearGradient
                id="codeIconGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <Code size={30} stroke="url(#codeIconGradient)" />
          </svg>
        </animated.span>
      </Link>
      <nav
        role="navigation"
        aria-label="Main menu"
        className={
          isNavOpen ? "fixed inset-0 p-4" : "hidden md:flex items-center gap-4"
        }
      >
        {isNavOpen ? <Drawer closeDrawer={closeDrawer} /> : <MainMenu />}
      </nav>
      <Button
        aria-expanded={isNavOpen}
        aria-label="Open main menu"
        className="md:hidden"
        size="icon"
        variant="ghost"
        onClick={() => setIsNavOpen((prev) => !prev)}
      >
        <Menu size={24} aria-hidden="true" focusable="false" />
      </Button>
    </header>
  );
}
