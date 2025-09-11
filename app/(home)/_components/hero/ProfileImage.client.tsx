'use client';

import Image from 'next/image';

export default function ProfileImage({ initialPill }: { initialPill: boolean }) {
  return (
    <div
      className="fixed bottom-0 left-1/2 isolate z-40 -translate-x-1/2 will-change-transform"
      style={{
        opacity: initialPill ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div
        className="relative w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[75vw] 2xl:w-[70vw] max-w-[90rem]"
        style={{
          // Very tall initially, shrinks with scroll
          height: 'calc(80vh - 30vh * var(--p, 0))',
          minHeight: '35rem',
          maxHeight: '65rem',
          // Scale effect: starts at 100%, goes down to 60%
          transform: `scale(calc(1 - 0.4 * var(--p, 0)))`,
          transformOrigin: '50% 100%',
          willChange: 'transform, height',
          transition: 'none', // Remove transitions for smoother scroll
        }}
      >
        <Image
          src="/images/me.png"
          alt="Jayvic San Antonio - Creative Developer"
          fill
          className="object-contain object-bottom"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 120rem"
          style={{
            willChange: 'filter',
            filter: `brightness(calc(0.9 + 0.3 * var(--p))) saturate(1.3) hue-rotate(12deg) drop-shadow(0 0 calc(20px + 40px * var(--p)) rgba(0, 139, 139, 0.35)) drop-shadow(0 0 calc(60px + 120px * var(--p)) rgba(0, 139, 139, 0.18))`,
          }}
        />
      </div>
    </div>
  );
}
