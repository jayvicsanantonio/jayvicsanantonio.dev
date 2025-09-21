'use client'

import Link from 'next/link'

export default function FooterBrandCTA({
  showName,
  overlayUpDampen,
}: {
  showName: boolean
  overlayUpDampen: number
}) {
  return (
    <div
      className="pointer-events-none absolute inset-x-4 transition-opacity duration-300 px-[env(safe-area-inset-left)] sm:inset-x-16"
      style={{
        bottom: 'max(env(safe-area-inset-bottom, 20px), 16px)',
        paddingLeft: 'max(env(safe-area-inset-left), 1rem)',
        paddingRight: 'max(env(safe-area-inset-right), 1rem)',
        opacity: showName ? `calc(1 - clamp(0, var(--overlay-up, 0) / ${overlayUpDampen}, 1))` : 0,
        transform: 'translateY(calc(-1.2 * var(--scroll-y, 0) * var(--gate, 0) * 1px))',
        willChange: 'opacity, transform',
      }}
    >
      <div className="flex items-center justify-between gap-4 sm:gap-6">
        <div className="text-white min-w-0 flex-shrink-0">
          <div className="text-base font-light tracking-wider sm:text-lg md:text-3xl">Jayvic</div>
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase sm:text-xs md:text-2xl md:tracking-[0.3em]">
            SAN ANTONIO
          </div>
        </div>
        <Link
          href="/work"
          className="pointer-events-auto flex items-center justify-center h-10 whitespace-nowrap rounded-full bg-white px-5 text-xs font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-white/90 sm:h-11 sm:px-6 sm:text-sm md:h-12 md:px-8 md:text-base"
        >
          Work Experience
        </Link>
      </div>
    </div>
  )
}
