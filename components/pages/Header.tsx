"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CodeIcon from "@/components/icons/code";
import MenuIcon from "@/components/icons/menu";
import CloseIcon from "@/components/icons/close";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="flex items-center justify-between py-6 bg-gray-950 border-b border-gray-800 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <CodeIcon className="w-6 h-6" />
      </div>
      <nav
        className={
          isNavOpen
            ? "absolute top-[89px] left-0 flex flex-col h-screen w-full z-9 bg-gray-950 text-gray-200 overflow-y-auto"
            : "hidden md:flex items-center gap-8"
        }
      >
        <Link href="/" passHref legacyBehavior>
          <a
            href="/"
            onClick={() => setIsNavOpen(false)}
            className={`${
              isNavOpen ? "border-b-2 border-gray-800 py-8 px-4" : ""
            } font-medium hover:underline`}
          >
            Home
          </a>
        </Link>
        <Link href="/projects" passHref legacyBehavior>
          <a
            href="/projects"
            onClick={() => setIsNavOpen(false)}
            className={`${
              isNavOpen ? "border-b-2 border-gray-800 py-8 px-4" : ""
            } font-medium hover:underline`}
          >
            Projects
          </a>
        </Link>
        <Link href="/blog" passHref legacyBehavior>
          <a
            href="/blog"
            onClick={() => setIsNavOpen(false)}
            className={`${
              isNavOpen ? "border-b-2 border-gray-800 py-8 px-4" : ""
            } font-medium hover:underline`}
          >
            Blog
          </a>
        </Link>
        <Link href="/work" passHref legacyBehavior>
          <a
            href="/work"
            onClick={() => setIsNavOpen(false)}
            className={`${
              isNavOpen ? "border-b-2 border-gray-800 py-8 px-4" : ""
            } font-medium hover:underline`}
          >
            Work
          </a>
        </Link>
      </nav>
      <Button
        aria-label="Toggle navigation"
        className="md:hidden"
        size="icon"
        variant="ghost"
        onClick={() => setIsNavOpen((prev) => !prev)}
      >
        {isNavOpen ? (
          <CloseIcon className="w-6 h-6" />
        ) : (
          <MenuIcon className="w-6 h-6" />
        )}
      </Button>
    </header>
  );
}
