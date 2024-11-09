"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Drawer from "./Drawer";
import MainMenu from "./MainMenu";
import useBoop from "@/hooks/use-boop";
import { animated } from "react-spring";
import { Button } from "@/components/ui/button";
import { Code, Menu } from "lucide-react";

export default function Header() {
  const [style, trigger] = useBoop({ rotation: 20, timing: 200, scale: 1.4 });
  const [isNavOpen, setIsNavOpen] = useState(false);

  const closeDrawer = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-6 bg-gray-950 border-b border-gray-800 sticky top-0 z-10 -mx-4 lg:-mx-auto">
      <Link
        href="/"
        className="flex items-center gap-2"
        aria-label="Logo"
        onMouseEnter={trigger}
      >
        <animated.span style={style}>
          <Code size={24} className="hover:text-violet-600" />
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
