import { GlassButton } from '@/components/ui/GlassButton';
import { cn } from '@/lib/utils';
import React from 'react';

export type NavButtonProps = {
  href: string;
  ariaLabel: string;
  tooltip: string;
  side: 'left' | 'right';
  offsetPx: number;
  size: { w: number; h: number };
  top: string;
  transitionMs?: number;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function NavButton({
  href,
  ariaLabel,
  tooltip,
  side,
  offsetPx,
  size,
  top,
  transitionMs = 260,
  children,
  ...linkProps
}: NavButtonProps) {
  const leftExpr =
    side === 'left'
      ? `calc(50% - ((96vw - 2 * var(--closeMaxX)) / 2) - ${offsetPx}px)`
      : `calc(50% + ((96vw - 2 * var(--closeMaxX)) / 2) + ${offsetPx}px)`;

  return (
    <div
      className="group absolute pointer-events-auto"
      style={{
        width: `${size.w}px`,
        height: `${size.h}px`,
        top,
        left: leftExpr,
        transform:
          'translate(-50%, -50%) translate(calc(var(--mx, 0) * 6px), calc(var(--my, 0) * 6px))',
        transition: `transform ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        opacity: 'var(--ui, 0)',
        willChange: 'transform',
      }}
      onMouseMove={(e) => {
        const t = e.currentTarget as HTMLElement;
        const r = t.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const my = ((e.clientY - r.top) / r.height - 0.5) * 2;
        t.style.setProperty('--mx', String(mx));
        t.style.setProperty('--my', String(my));
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget as HTMLElement;
        t.style.setProperty('--mx', '0');
        t.style.setProperty('--my', '0');
      }}
    >
      {(() => {
        const { className: linkClassName, target, rel } = linkProps as {
          className?: string;
          target?: React.HTMLAttributeAnchorTarget;
          rel?: string;
        };
        return (
          <GlassButton
            href={href}
            aria-label={ariaLabel}
            className={cn(
              'inline-flex w-full h-full items-center justify-center rounded-full text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80',
              linkClassName
            )}
            {...(target ? { target } : {})}
            {...(rel ? { rel } : {})}
          >
            {children}
          </GlassButton>
        );
      })()}
      <span className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full rounded-md bg-black/80 px-2 py-1 text-[11px] md:text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
        {tooltip}
      </span>
    </div>
  );
}

