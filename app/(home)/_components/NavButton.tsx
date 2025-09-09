import type React from 'react';

import { NavPill } from '@/components/ui/NavPill';
import { cn } from '@/lib/utils';

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
    <fieldset
      className="group pointer-events-auto absolute"
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
      onMouseMove={(_e) => {
        const t = _e.currentTarget as HTMLElement;
        const r = t.getBoundingClientRect();
        const mx = ((_e.clientX - r.left) / r.width - 0.5) * 2;
        const my = ((_e.clientY - r.top) / r.height - 0.5) * 2;
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
        const {
          className: linkClassName,
          target,
          rel,
        } = linkProps as {
          className?: string;
          target?: React.HTMLAttributeAnchorTarget;
          rel?: string;
        };
        // Extract vt-tag-* from className and pass via vtTagName prop
        const vtMatch = linkClassName?.match(/vt-tag-(projects|work)/);
        const vtTagName = vtMatch ? vtMatch[1] : undefined;
        const cleanedClassName = linkClassName?.replace(/vt-tag-(projects|work)/g, '').trim();
        return (
          <NavPill
            href={href}
            ariaLabel={ariaLabel}
            icon={children}
            // hero pills are icon-only (inactive), but keep vt-tag for transitions if provided
            active={false}
            {...(vtTagName ? { vtTagName } : {})}
            collapsedPx={size.w}
            heightPx={size.h}
            tooltip={tooltip}
            className={cn(
              'text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80',
              'bg-white/20 backdrop-blur-[24px] backdrop-saturate-200 border-white/55 hover:border-white/60',
              cleanedClassName,
            )}
            {...(target ? { target } : {})}
            {...(rel ? { rel } : {})}
          />
        );
      })()}
    </fieldset>
  );
}
