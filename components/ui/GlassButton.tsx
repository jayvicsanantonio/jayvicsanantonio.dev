import Link from 'next/link'
import type React from 'react'
import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

export type GlassButtonProps = React.ComponentProps<typeof Link> & {
  className?: string
}

const GlassButton = forwardRef<HTMLAnchorElement, GlassButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        {...props}
        className={cn(
          // Layout base: caller controls absolute pos/size
          'pointer-events-auto isolate inline-flex items-center justify-center overflow-hidden rounded-full',
          // Pure Tailwind glass approximation (no custom utilities)
          'border border-white/10 bg-gradient-to-b from-white/20 to-white/15 backdrop-blur-[16px] backdrop-saturate-150',
          // Depth (approximate former glass-base shadow)
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_30px_rgba(0,0,0,0.22)]',
          // Transitions
          'transition duration-200 ease-out',
          // Gloss highlight that follows cursor via --mx/--my
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(60%_40%_at_calc(50%_+_var(--mx,0)_*_10px)_calc(18%_+_var(--my,0)_*_8px),rgba(255,255,255,0.55),rgba(255,255,255,0)_70%)] before:opacity-[0.85] before:content-['']",
          // Hover polish
          'hover:border-white/50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_10px_36px_rgba(0,0,0,0.26)]',
          className,
        )}
      >
        {/* Content sits above sheen/highlight */}
        <span className="relative z-10 flex items-center justify-center">{children}</span>
      </Link>
    )
  },
)

GlassButton.displayName = 'GlassButton'

export { GlassButton }
