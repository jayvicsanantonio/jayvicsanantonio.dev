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
import { Code, Moon, Sun } from "lucide-react";

export default function Header({
  theme,
  setTheme,
}: {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}) {
  const [logoStyle, logoTrigger] = useBoop({ scale: 1.5, timing: 300 });
  const [themeStyle, themeTrigger] = useBoop({
    rotation: 90,
    timing: 300,
  });
  const [menuStyle, menuTrigger] = useBoop({ x: 15, timing: 300 });

  const [isNavOpen, setIsNavOpen] = useState(false);

  const closeDrawer = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-6 bg-white dark:bg-gray-950 border-b dark:border-gray-800 sticky top-0 z-10 -mx-4 lg:-mx-auto">
      <Link href="/" className="flex items-center gap-2" aria-label="Logo">
        <animated.span
          onMouseEnter={logoTrigger as MouseEventHandler<HTMLAnchorElement>}
          onTouchStart={logoTrigger as TouchEventHandler<HTMLAnchorElement>}
          style={logoStyle}
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
      <div className="flex space-x-7">
        <nav
          role="navigation"
          aria-label="Main menu"
          className={
            isNavOpen
              ? "fixed inset-0 p-4 z-10"
              : "hidden md:flex items-center gap-4"
          }
        >
          {isNavOpen ? <Drawer closeDrawer={closeDrawer} /> : <MainMenu />}
        </nav>
        <div className="md:border-l md:border-gray-200 dark:md:border-gray-800 md:pl-4">
          <Button
            role="switch"
            aria-label="Toggle theme"
            className="bg-transparent hover:bg-transparent  focus:outline-blue-700"
            size="icon"
            onClick={() => {
              // @ts-ignore
              themeTrigger();
              setTheme(theme === "light" ? "dark" : "light");
            }}
          >
            <animated.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={themeStyle}
              onMouseEnter={themeTrigger as MouseEventHandler<SVGSVGElement>}
              onTouchStart={themeTrigger as TouchEventHandler<SVGSVGElement>}
            >
              <defs>
                <linearGradient
                  id="themeIconGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              {theme === "light" ? (
                <Sun stroke="url(#themeIconGradient)" aria-hidden={true} />
              ) : (
                <Moon stroke="url(#themeIconGradient)" aria-hidden={true} />
              )}
            </animated.svg>
          </Button>
          <Button
            aria-expanded={isNavOpen}
            aria-label="Open main menu"
            className="md:hidden hover:bg-transparent"
            size="icon"
            variant="ghost"
            onClick={() => {
              // @ts-ignore
              menuTrigger();
              setIsNavOpen((prev) => !prev);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onMouseEnter={menuTrigger as MouseEventHandler<SVGSVGElement>}
              onTouchStart={menuTrigger as TouchEventHandler<SVGSVGElement>}
            >
              <defs>
                <linearGradient
                  id="menuIconGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <rect
                x="4"
                y="4"
                width="20"
                height="2"
                fill="url(#menuIconGradient)"
              />
              <animated.rect
                x="4"
                y="11"
                width="20"
                height="2"
                fill="url(#menuIconGradient)"
                style={menuStyle}
              />
              <rect
                x="4"
                y="18"
                width="20"
                height="2"
                fill="url(#menuIconGradient)"
              />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}
