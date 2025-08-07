'use client';

import {
  useState,
  useCallback,
  MouseEventHandler,
  TouchEventHandler,
} from 'react';
import Link from 'next/link';
import Drawer from '@/components/pages/Drawer';
import MainMenu from '@/components/pages/MainMenu';
import useBoop from '@/hooks/use-boop';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';
import Icon from '@/components/pages/Icon';
import HolidayLights from '@/components/pages/HolidayLights';
import Sun from '@/components/icons/Sun';
import Moon from '@/components/icons/Moon';
import Theme from '@/types/theme';

export default function Header({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}) {
  const [boopControls, menuTrigger] = useBoop({ x: 15, timing: 300 });

  const [isNavOpen, setIsNavOpen] = useState(false);

  const closeDrawer = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  return (
    <>
      {/* Minimal chrome: floating corner menu and theme toggle */}
      <header className="fixed top-4 right-4 z-30">
        <div className="flex items-center gap-2">
          <Button
            role="switch"
            aria-label="Toggle theme"
            className="hover:bg-transparent cursor-pointer rounded-full"
            size="icon"
            variant="ghost"
            onClick={() => {
              setTheme(theme === 'light' ? 'dark' : 'light');
            }}
            title="Toggle theme"
          >
            {theme === 'light' ? (
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
            className="hover:bg-transparent rounded-full"
            size="icon"
            variant="ghost"
            onClick={() => {
              // @ts-ignore
              menuTrigger();
              setIsNavOpen((prev) => !prev);
            }}
            onMouseEnter={
              menuTrigger as MouseEventHandler<HTMLButtonElement>
            }
            onTouchStart={
              menuTrigger as TouchEventHandler<HTMLButtonElement>
            }
            title="Menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
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
              <motion.rect
                x="2"
                y="11"
                width="20"
                height="2"
                fill="url(#menuIconGradient)"
                animate={boopControls}
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
      </header>
      {isNavOpen && <Drawer closeDrawer={closeDrawer} />}
    </>
  );
}
