"use client";

import { useState } from "react";
import Link from "next/link";
import Drawer from "./Drawer";
import MainMenu from "./MainMenu";
import { Button } from "@/components/ui/button";
import { Code, Menu } from "lucide-react";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-4 py-6 bg-gray-950 border-b border-gray-800 sticky top-0 z-10 -mx-4 lg:-mx-auto">
      <Link href="/" className="flex items-center gap-2" aria-label="Logo">
        <Code
          size={24}
          className="hover:text-violet-600 hover:scale-110 transform"
        />
      </Link>
      <nav
        role="navigation"
        aria-label="Main menu"
        className={
          isNavOpen ? "fixed inset-0 p-4" : "hidden md:flex items-center gap-4"
        }
      >
        {isNavOpen ? (
          <Drawer closeDrawer={() => setIsNavOpen(false)} />
        ) : (
          <MainMenu />
        )}
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
