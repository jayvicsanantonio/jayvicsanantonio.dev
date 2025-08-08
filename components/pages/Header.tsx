'use client';

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  MouseEventHandler,
  TouchEventHandler,
} from 'react';
import Drawer from '@/components/pages/Drawer';
import useBoop from '@/hooks/use-boop';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Icon from '@/components/pages/Icon';

export default function Header() {
  const [, menuTrigger] = useBoop({ x: 8, timing: 250 });

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeDrawer = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  // Auto-hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY || 0;
      const delta = currentY - lastScrollYRef.current;
      if (Math.abs(delta) > 6) {
        setIsVisible(delta < 0 || currentY < 24);
        lastScrollYRef.current = currentY;
      }
      setIsScrolled(currentY > 8);
      // Scroll progress for circular indicator
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const p =
        total > 0 ? Math.min(1, Math.max(0, currentY / total)) : 0;
      setScrollProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Removed anchor tracking for menu button (no longer needed)

  return (
    <>
      {/* Floating chrome: auto-hiding corner controls with scroll progress ring */}
      <AnimatePresence>
        {isVisible && (
          <motion.header
            className="fixed top-4 right-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              delay: 0.1,
            }}
          >
            <div className="flex items-center gap-2 rounded-full px-1 py-1 border transition-all duration-300 bg-transparent border-transparent">
              {/* Theme toggle removed */}
              <div
                className={`relative ${isNavOpen ? 'z-[60]' : ''}`}
              >
                <Button
                  aria-expanded={isNavOpen}
                  aria-label="Open main menu"
                  className={`cursor-pointer rounded-full text-white transition-colors ${
                    isNavOpen
                      ? 'bg-white/20 border border-white/30 ring-2 ring-white/30'
                      : 'bg-transparent border border-transparent hover:bg-white/1'
                  }`}
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
                  <motion.svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    initial="rest"
                    whileHover="hover"
                    onHoverStart={() => menuTrigger()}
                    onMouseEnter={
                      menuTrigger as MouseEventHandler<SVGSVGElement>
                    }
                    onTouchStart={
                      menuTrigger as TouchEventHandler<SVGSVGElement>
                    }
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
                    <motion.g
                      style={{
                        transformBox: 'fill-box',
                        transformOrigin: 'center',
                      }}
                      variants={{ rest: { x: 0 }, hover: { x: 6 } }}
                    >
                      <rect
                        x="2"
                        y="11"
                        width="20"
                        height="2"
                        fill="url(#menuIconGradient)"
                      />
                    </motion.g>
                    <rect
                      x="2"
                      y="18"
                      width="20"
                      height="2"
                      fill="url(#menuIconGradient)"
                    />
                  </motion.svg>
                </Button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isNavOpen && <Drawer closeDrawer={closeDrawer} />}
      </AnimatePresence>
    </>
  );
}
