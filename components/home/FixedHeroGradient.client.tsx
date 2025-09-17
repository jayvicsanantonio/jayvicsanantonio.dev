'use client';

import { createPortal } from 'react-dom';

export default function FixedHeroGradient() {
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-[220svh] bg-gradient-to-b from-black via-gray-800 to-gray-200 glass-optimized"
    />,
    document.body,
  );
}
