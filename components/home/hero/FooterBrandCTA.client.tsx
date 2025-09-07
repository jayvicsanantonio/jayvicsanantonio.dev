'use client';

import Link from 'next/link';

export default function FooterBrandCTA({
  showName,
  overlayUpDampen,
}: {
  showName: boolean;
  overlayUpDampen: number;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-x-4 transition-opacity duration-300 sm:inset-x-16"
      style={{
        bottom: 'max(env(safe-area-inset-bottom), 16px)',
        opacity: showName ? `calc(1 - clamp(0, var(--overlay-up, 0) / ${overlayUpDampen}, 1))` : 0,
        transform: 'translateY(calc(-1.2 * var(--scroll-y, 0) * var(--gate, 0) * 1px))',
        willChange: 'opacity, transform',
      }}
    >
      <div className="flex items-center justify-between gap-6">
        <div className="text-white">
          <div className="text-lg font-light tracking-wider md:text-3xl">Jayvic</div>
          <div className="text-xs font-bold tracking-[0.3em] uppercase md:text-2xl">
            SAN ANTONIO
          </div>
        </div>
        <Link
          href="/work"
          className="pointer-events-auto rounded-full bg-white px-5 py-2 text-xs font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-white/90 sm:px-6 sm:py-2.5 sm:text-sm md:py-3 md:text-base"
        >
          Work Experience
        </Link>
      </div>
    </div>
  );
}
