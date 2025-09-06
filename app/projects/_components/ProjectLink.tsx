import React from 'react';

import { GlassButton } from '@/components/ui/GlassButton';

export default function ProjectLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isExternal =
    href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

  if (isExternal) {
    return (
      <GlassButton
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="h-9 gap-2 px-3 text-sm"
      >
        {children}
      </GlassButton>
    );
  }

  return (
    <GlassButton href={href} className="h-9 gap-2 px-3 text-sm" prefetch>
      {children}
    </GlassButton>
  );
}
