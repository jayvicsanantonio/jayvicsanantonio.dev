export const runtime = "edge";

import Image from "next/image";
import Link from "next/link";
import NavRow from "@/app/mobile/_components/NavRow.client";
import AnimatedText from "@/components/ui/AnimatedText";

export default function MobileHomePage() {
  return (
    <main className="bg-black text-white">
      <h1 className="sr-only">Jayvic San Antonio — Software Engineer</h1>

      {/* Section 1: Hero with video */}
      <section className="relative mx-3 mt-3 h-[calc(100svh-1.5rem)] overflow-hidden rounded-[28px] border border-white/10 sm:mx-4 sm:rounded-[36px]">
        {/* Background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/matrix-horizontal.mp4"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden
        />

        {/* Subtle grid overlay to match design */}
        <div
          className="absolute inset-0 opacity-[0.14] mix-blend-screen"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 0)",
            backgroundSize: "64px 64px, 64px 64px",
            backgroundPosition: "0 0, 0 0",
          }}
        />

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(59,130,246,0.18),transparent_60%),radial-gradient(60%_50%_at_50%_100%,rgba(16,185,129,0.16),transparent_60%)]" />

        {/* Tagline */}
        <p className="absolute left-1/2 top-10 w-[min(22rem,88vw)] -translate-x-1/2 px-2 text-center text-base leading-relaxed text-white/90 sm:top-12">
          I experiment with AI daily—and build web platforms that put it to work.
        </p>

        {/* Foreground person image */}
        <div className="absolute bottom-0 left-1/2 w-[92%] max-w-[28rem] -translate-x-1/2">
          <Image
            src="/images/me.png"
            alt="Jayvic San Antonio looking through binoculars"
            width={1400}
            height={1000}
            priority
            className="h-auto w-full object-contain object-bottom"
            style={{
              filter:
                "brightness(0.95) saturate(1.25) drop-shadow(0 0 60px rgba(0,139,139,0.30)) drop-shadow(0 10px 40px rgba(0,0,0,0.45))",
            }}
          />
        </div>

        {/* Name / CTA row */}
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-base font-light tracking-wider">Jayvic</div>
            <div className="text-[10px] font-bold tracking-[0.2em]">SAN ANTONIO</div>
          </div>
          <Link
            href="/work"
            className="pointer-events-auto flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-white/90 sm:h-12 sm:px-6"
          >
            Work Experience
          </Link>
        </div>

        {/* Corner mask for rounded look */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/5 sm:rounded-[36px]" />
      </section>

      {/* Section 2: MobileNavRow styles + smaller image */}
      <section className="relative mx-3 mb-16 mt-6 min-h-[100svh] overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(120%_100%_at_50%_0%,#0b1220,transparent_60%),linear-gradient(to_bottom,#0b1220,#2a3542_40%,#2f3741_70%,#0d1117_100%)] px-4 py-16 sm:mx-4 sm:rounded-[36px]">
        {/* Cyan greeting pill (reusing overlay pill look) */}
        <div className="mx-auto mb-4 flex w-[17.625rem] items-center justify-center rounded-[384px] border border-white/30 bg-gradient-to-b from-[#18ccc144]/80 to-[#00a69e33]/80 px-4 py-3 backdrop-blur-[16px] backdrop-saturate-[160%] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_30px_rgba(0,0,0,0.22)]">
          <span className="px-2 text-base font-semibold tracking-wide text-white">
            Hi, I'm Jayvic 👋
          </span>
        </div>

        {/* Nav row using MobileNavRow button styles */}
        <NavRow />

        {/* Title centered within the whole section */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 w-[17.625rem] -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <h2 className="text-[20px] leading-6 font-semibold tracking-[0.01em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            <AnimatedText
              text="Full-Stack Software Engineer"
              start={true}
              perCharDelay={30}
              baseDelay={120}
            />
          </h2>
          {/* Subtle cyan underline under the title */}
          <div className="mx-auto mt-1 h-[2px] w-[56%] rounded-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
          <div className="pointer-events-none mx-auto -mt-[3px] h-[6px] w-[56%] rounded-full bg-cyan-400/20 blur-[4px]" />
        </div>

        {/* Bottom image, large and grounded */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-[88%] max-w-[30rem]">
          <Image
            src="/images/me.png"
            alt="Jayvic portrait"
            width={1200}
            height={900}
            className="h-auto w-full object-contain object-bottom"
            style={{ filter: "brightness(0.95) drop-shadow(0 14px 42px rgba(0,0,0,0.5))" }}
          />
        </div>

        {/* Corner ring to emphasize rounded container */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/5 sm:rounded-[36px]" />
      </section>
    </main>
  );
}
