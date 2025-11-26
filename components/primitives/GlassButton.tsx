import Link from "next/link";
import type React from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/class-names";

export type GlassButtonProps = React.ComponentProps<typeof Link> & {
  className?: string;
};

const GlassButton = forwardRef<HTMLAnchorElement, GlassButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        {...props}
        className={cn(
          // Layout base: caller controls absolute pos/size
          "pointer-events-auto isolate inline-flex items-center justify-center overflow-hidden rounded-full",
          // Pure Tailwind glass approximation (no custom utilities)
          "border border-white/15 bg-gradient-to-br from-white/16 via-white/10 to-white/6 backdrop-blur-[18px] backdrop-saturate-[180%]",
          // Depth (approximate former glass-base shadow)
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_30px_rgba(0,0,0,0.24),0_0_18px_rgba(34,211,238,0.25)]",
          // Transitions
          "transition duration-200 ease-out",
          // Gloss highlight that follows cursor via --mx/--my
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(60%_40%_at_calc(50%_+_var(--mx,0)_*_10px)_calc(18%_+_var(--my,0)_*_8px),rgba(255,255,255,0.55),rgba(255,255,255,0)_70%)] before:opacity-[0.78] before:content-['']",
          // Hover polish
          "hover:border-white/70 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_38px_rgba(0,0,0,0.3),0_0_22px_rgba(34,211,238,0.3)]",
          className,
        )}
      >
        {/* Content sits above sheen/highlight */}
        <span className="relative z-10 flex items-center justify-center">{children}</span>
      </Link>
    );
  },
);

GlassButton.displayName = "GlassButton";

export { GlassButton };
