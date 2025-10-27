import Link from "next/link";
import type React from "react";

export default function ProjectLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isExternal =
    href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  const cls = [
    "inline-flex h-9 gap-2 px-3 text-sm items-center justify-center rounded-full border",
    "border-white/20 bg-slate-900/85 text-white/90 shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-colors duration-200",
    "hover:border-white/35 hover:bg-slate-900/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
  ].join(" ");

  if (isExternal) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} className={cls} prefetch>
      {children}
    </Link>
  );
}
