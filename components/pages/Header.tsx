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
        className={
          isNavOpen
            ? "absolute top-[89px] left-0 flex flex-col h-screen w-full z-9 bg-gray-950 text-gray-200 overflow-y-auto p-2 gap-4"
            : "hidden md:flex items-center gap-4"
        }
      >
        <IconButton Icon={House} link="/">
          Home
        </IconButton>
        <IconButton Icon={LayoutPanelLeft} link="/projects">
          Projects
        </IconButton>
        <IconButton Icon={Newspaper} link="/blog">
          Blog
        </IconButton>
        <IconButton Icon={FlaskConical} link="/lab">
          Lab
        </IconButton>
        <IconButton Icon={FileUser} link="/work">
          Work
        </IconButton>
      </nav>
      <Button
        aria-label="Toggle navigation"
        className="md:hidden"
        size="icon"
        variant="ghost"
        onClick={() => setIsNavOpen((prev) => !prev)}
      >
        {isNavOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>
    </header>
  );
}
