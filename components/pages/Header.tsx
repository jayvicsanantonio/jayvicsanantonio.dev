"use client";

import {
  useState,
  useCallback,
  MouseEventHandler,
  TouchEventHandler,
} from "react";
import Link from "next/link";
import Drawer from "@/components/pages/Drawer";
import MainMenu from "@/components/pages/MainMenu";
import useBoop from "@/hooks/use-boop";
import { animated } from "react-spring";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import Icon from "@/components/pages/Icon";
import HolidayLights from "@/components/pages/HolidayLights";
import Sun from "@/components/icons/Sun";
import Moon from "@/components/icons/Moon";
import Theme from "@/types/theme";

export default function Header({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}) {
  const [menuStyle, menuTrigger] = useBoop({ x: 15, timing: 300 });

  const [isNavOpen, setIsNavOpen] = useState(false);

  const closeDrawer = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  return (
    <>
      <header className="flex items-center justify-between px-4 py-2 mt-4 bg-white dark:bg-gray-950/80 bg-white/80 backdrop-blur-lg border rounded-3xl dark:border-gray-800 sticky top-1 z-20 -mx-4 lg:-mx-auto">
        <Link href="/" className="flex items-center gap-2" aria-label="Logo">
          <Icon
            name={Code}
            size={30}
            aria-hidden={true}
            boopConfig={{
              scale: 1.5,
              timing: 300,
            }}
          />
        </Link>
        <HolidayLights />
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
            {!isNavOpen && <MainMenu />}
          </nav>
          <div className="flex md:border-l md:border-gray-200 dark:md:border-gray-800 md:pl-4">
            <Button
              role="switch"
              aria-label="Toggle theme"
              className="hover:bg-transparent"
              size="icon"
              variant="ghost"
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
            >
              {theme === "light" ? (
                <Icon
                  name={Sun}
                  aria-hidden={true}
                  boopConfig={{
                    rotation: 20,
                    timing: 200,
                  }}
                />
              ) : (
                <Icon
                  name={Moon}
                  aria-hidden={true}
                  boopConfig={{
                    rotation: 20,
                    timing: 200,
                  }}
                />
              )}
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
              onMouseEnter={menuTrigger as MouseEventHandler<HTMLButtonElement>}
              onTouchStart={menuTrigger as TouchEventHandler<HTMLButtonElement>}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
                  x="2"
                  y="4"
                  width="20"
                  height="2"
                  fill="url(#menuIconGradient)"
                />
                <animated.rect
                  x="2"
                  y="11"
                  width="20"
                  height="2"
                  fill="url(#menuIconGradient)"
                  style={menuStyle}
                />
                <rect
                  x="2"
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
      {isNavOpen && <Drawer closeDrawer={closeDrawer} />}
    </>
  );
}
