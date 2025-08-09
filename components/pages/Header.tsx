'use client';

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  MouseEventHandler,
  TouchEventHandler,
} from 'react';
import useBoop from '@/hooks/use-boop';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MainMenu from '@/components/pages/MainMenu';

export default function Header() {
  const [, menuTrigger] = useBoop({ x: 8, timing: 250 });

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);

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

  // Close when clicking outside the menu
  useEffect(() => {
    if (!isNavOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (
        menuContainerRef.current &&
        target &&
        !menuContainerRef.current.contains(target)
      ) {
        setIsNavOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () =>
      document.removeEventListener('mousedown', onDocClick);
  }, [isNavOpen]);

  return (
    <>
      {/* Floating chrome: auto-hiding corner controls with scroll progress ring */}
      <AnimatePresence>
        {isVisible && (
          <motion.header
            className="fixed top-4 right-4 z-[90]"
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
                ref={menuContainerRef}
                className={`relative ${isNavOpen ? 'z-[90]' : ''}`}
              >
                <Button
                  aria-expanded={isNavOpen}
                  aria-label="Open main menu"
                  className={`relative z-[95] cursor-pointer rounded-full text-white transition-colors ${
                    isNavOpen
                      ? 'border border-white/30 ring-1 ring-white/10 hover:bg-transparent'
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

                {/* Click-outside backdrop */}
                <AnimatePresence>
                  {isNavOpen && (
                    <motion.button
                      aria-hidden={true}
                      className="fixed inset-0 z-[85] cursor-default bg-black/50 backdrop-blur-sm"
                      style={{ WebkitBackdropFilter: 'blur(4px)' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => setIsNavOpen(false)}
                    />
                  )}
                </AnimatePresence>

                {/* Anchored popover under the hamburger */}
                <AnimatePresence>
                  {isNavOpen && (
                    <motion.div
                      className="absolute right-0 top-full mt-2 z-[90] w-72 rounded-xl border border-white/10 bg-[#101118] p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_16px_48px_rgba(99,102,241,0.25)]"
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{
                        type: 'spring',
                        stiffness: 360,
                        damping: 28,
                      }}
                      role="menu"
                      aria-label="Main navigation"
                    >
                      <div className="flex flex-col gap-3">
                        <MainMenu
                          closeDrawer={() => setIsNavOpen(false)}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
      {/* Drawer removed in favor of anchored popover */}
    </>
  );
}
