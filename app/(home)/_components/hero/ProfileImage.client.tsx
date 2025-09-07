'use client';

import Image from 'next/image';

export default function ProfileImage({ initialPill }: { initialPill: boolean }) {
  return (
    <div
      className="fixed bottom-0 left-1/2 isolate z-40 -translate-x-1/2"
      style={{
        opacity: initialPill ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div
        className="relative w-[22rem] sm:w-[28rem] md:w-[60rem]"
        style={{
          height: 'calc(50rem - 10rem * var(--p))',
          transform: 'scale(clamp(0.6, calc(1 - 0.4 * var(--p)), 1))',
          transformOrigin: '50% 100%',
        }}
      >
        <Image
          src="/images/me.png"
          alt="Jayvic San Antonio - Creative Developer"
          fill
          className="object-contain object-bottom"
          style={{
            willChange: 'filter',
            filter: `brightness(calc(0.9 + 0.3 * var(--p))) saturate(1.3) hue-rotate(12deg) drop-shadow(0 0 calc(20px + 40px * var(--p)) rgba(0, 139, 139, 0.35)) drop-shadow(0 0 calc(60px + 120px * var(--p)) rgba(0, 139, 139, 0.18))`,
          }}
          priority
        />
      </div>
    </div>
  );
}
