export const runtime = 'edge';

import Image from 'next/image';
import Link from 'next/link';
import { Oswald } from 'next/font/google';
import NavRow from '@/app/mobile/_components/NavRow.client';
import AnimatedText from '@/components/ui/AnimatedText';

const oswald = Oswald({ subsets: ['latin'] });

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
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 0)',
            backgroundSize: '64px 64px, 64px 64px',
            backgroundPosition: '0 0, 0 0',
          }}
        />

        {/* Enhanced vignette to cover corners and sides */}
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(59,130,246,0.18),transparent_60%),radial-gradient(60%_50%_at_50%_100%,rgba(16,185,129,0.16),transparent_60%),radial-gradient(circle_at_0%_0%,rgba(0,0,0,0.8),transparent_25%),radial-gradient(circle_at_100%_0%,rgba(0,0,0,0.8),transparent_25%),radial-gradient(circle_at_0%_100%,rgba(0,0,0,0.8),transparent_25%),radial-gradient(circle_at_100%_100%,rgba(0,0,0,0.8),transparent_25%)]" />

        {/* Cyan greeting pill */}
        <div className="absolute left-1/2 top-6 -translate-x-1/2">
          <div className="mx-auto mb-4 flex w-[17.625rem] items-center justify-center rounded-[384px] border border-white/30 bg-gradient-to-b from-[#18ccc144]/80 to-[#00a69e33]/80 px-4 py-3 backdrop-blur-[16px] backdrop-saturate-[160%] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_30px_rgba(0,0,0,0.22)]">
            <span className="px-2 text-base font-semibold tracking-wide text-white">
              Hi, I'm Jayvic 👋
            </span>
          </div>
        </div>

        {/* Nav row at top */}
        <div className="absolute left-1/2 top-24 -translate-x-1/2">
          <NavRow />
        </div>

        {/* Tagline centered within the section */}
        <p className="pointer-events-none absolute left-1/2 top-1/2 w-[min(22rem,88vw)] -translate-x-1/2 -translate-y-1/2 px-2 text-center text-base leading-relaxed text-white/90">
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
                'brightness(0.95) saturate(1.25) drop-shadow(0 0 60px rgba(0,139,139,0.30)) drop-shadow(0 10px 40px rgba(0,0,0,0.45))',
            }}
          />
        </div>

        {/* Title at bottom */}
        <div className="pointer-events-none absolute left-1/2 bottom-8 w-[17.625rem] -translate-x-1/2 text-center z-10">
          <h2 className={`font-bold tracking-wide text-white drop-shadow-[0_4px_20px_rgba(0,139,139,0.4)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] ${oswald.className}`}>
            <div className="text-[36px] leading-none">
              <AnimatedText
                text="FULL-STACK"
                start={true}
                perCharDelay={80}
                baseDelay={120}
              />
            </div>
            <div className="text-[24px] leading-tight">
              <AnimatedText
                text="Software Engineer"
                start={true}
                perCharDelay={80}
                baseDelay={800}
              />
            </div>
          </h2>
          {/* Subtle cyan underline under the title */}
          <div className="mx-auto mt-1 h-[2px] w-[56%] rounded-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
          <div className="pointer-events-none mx-auto -mt-[3px] h-[6px] w-[56%] rounded-full bg-cyan-400/20 blur-[4px]" />
        </div>

        {/* Corner mask for rounded look */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/5 sm:rounded-[36px]" />
      </section>


    </main>
  );
}
