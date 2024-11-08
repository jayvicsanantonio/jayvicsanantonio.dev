"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/pages/IconButton";
import {
  X,
  Code,
  Menu,
  House,
  LayoutPanelLeft,
  Newspaper,
  FlaskConical,
  FileUser,
} from "lucide-react";

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
        className={isNavOpen ? "fixed inset-0 p-4" : ""}
      >
        {isNavOpen && (
          <div className="absolute inset-0 bg-violet-600 opacity-50 transition-opacity duration-200 ease-in-out" />
        )}
        <div
          className={
            isNavOpen
              ? "absolute top-0 right-0 max-w-72 min-w-48 bottom-0 w-2/5 flex flex-col space-between bg-gray-950 shadow-lg p-6"
              : ""
          }
        >
          <div
            className={
              isNavOpen
                ? "flex flex-col gap-6 flex-1"
                : "hidden md:flex items-center gap-4"
            }
          >
            <IconButton
              Icon={House}
              link="/"
              callback={isNavOpen ? () => setIsNavOpen(false) : null}
            >
              Home
            </IconButton>
            <IconButton
              Icon={LayoutPanelLeft}
              link="/projects"
              callback={isNavOpen ? () => setIsNavOpen(false) : null}
            >
              Projects
            </IconButton>
            <IconButton
              Icon={Newspaper}
              link="/blog"
              callback={isNavOpen ? () => setIsNavOpen(false) : null}
            >
              Blog
            </IconButton>
            <IconButton
              Icon={FlaskConical}
              link="/lab"
              callback={isNavOpen ? () => setIsNavOpen(false) : null}
            >
              Lab
            </IconButton>
            <IconButton
              Icon={FileUser}
              link="/work"
              callback={isNavOpen ? () => setIsNavOpen(false) : null}
            >
              Work
            </IconButton>
          </div>

          {isNavOpen && (
            <Button
              className="flex items-center justify-center gap-2 text-white p-2 cursor-pointer rounded text-lg"
              onClick={() => setIsNavOpen(false)}
            >
              <X /> Dismiss
            </Button>
          )}
        </div>
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
