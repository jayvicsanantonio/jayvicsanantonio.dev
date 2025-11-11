import { VIDEO_OVERLAY_BACKGROUND } from "./hero.constants";
import type { PillProps } from "./hero.types";

export default function Pill({
  pillRef,
  videoRef,
  videoOverlayRef,
  pillContentRef,
  pillSkinRef,
}: PillProps) {
  return (
    <div
      ref={pillRef}
      data-testid="HeroPill"
      className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-transparent text-lg font-semibold text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
      style={{ backgroundColor: "#ffffff" }}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        tabIndex={-1}
        className="absolute inset-0 z-0 h-full w-full rounded-[inherit] object-cover opacity-0"
      >
        <source src="/matrix-horizontal.mp4" type="video/mp4" />
      </video>
      <div
        ref={pillSkinRef}
        className="pointer-events-none absolute inset-[1px] z-[1] rounded-[inherit] opacity-0"
        aria-hidden
      >
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#071f3a] via-[#051328] to-[#030a16]" />
        <div className="absolute inset-0 rounded-[inherit] border border-cyan-300/60 shadow-[0_0_35px_rgba(34,211,238,0.35)_inset]" />
        <div className="absolute inset-0 rounded-[inherit] ring-1 ring-cyan-300/20" />
      </div>
      <div
        ref={videoOverlayRef}
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ opacity: 0, background: VIDEO_OVERLAY_BACKGROUND }}
      />
      <div
        ref={pillContentRef}
        className="relative z-10 flex items-center justify-center px-12 py-4 text-base font-semibold tracking-wide text-black lg:text-2xl"
      >
        Hi, I&apos;m Jayvic 👋
      </div>
    </div>
  );
}
