import { useState, useRef, useEffect } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import KeywordsBackground, { type KeywordItem } from "@/components/ui/KeywordsBackground.client";
import { KEYWORD_HIGHLIGHT_LARGE, KEYWORD_HIGHLIGHT_MEDIUM } from "@/lib/keywordHighlight";
import GlassHeaderBubble from "@/components/ui/GlassHeaderBubble";
import AnimatedSection from "@/app/(home)/_components/AnimatedSection.client";

const SKILL_SECTIONS = [
  {
    title: "Frontend",
    accentClass: "text-cyan-300",
    items: [
      "JavaScript",
      "TypeScript",
      "React",
      "NextJS",
      "Tailwind CSS",
      "Shadcn UI",
      "Framer Motion",
      "React Native",
      "Expo",
      "EmberJS",
      "HTML",
      "CSS",
      "Sass",
      "SVG",
      "Accessibility",
      "VS Code Extensions",
      "Zed Extensions",
    ],
  },
  {
    title: "Backend and Edge",
    accentClass: "text-purple-300",
    items: [
      "NodeJS",
      "Hono",
      "Express",
      "Cloudflare Workers",
      "Vercel Edge",
      "REST APIs",
      "SailsJS",
      "Socket.IO",
      "Rate Limiting",
      "Caching",
      "Session Management",
      "Authentication",
      "Authorization",
    ],
  },
  {
    title: "Data",
    accentClass: "text-emerald-300",
    items: [
      "Prisma",
      "Drizzle",
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "MongoDB",
      "Redis",
      "Firebase",
    ],
  },
  {
    title: "Quality and Testing",
    accentClass: "text-orange-300",
    items: [
      "Zod",
      "Vitest",
      "React Testing Library",
      "Jest",
      "Playwright",
      "Cypress",
      "GitHub Actions",
      "Jenkins",
      "CI/CD",
    ],
  },
  {
    title: "DevOps and Tooling",
    accentClass: "text-rose-300",
    items: ["Amazon Web Services", "Vercel", "Cloudflare", "Netlify", "Docker", "Git"],
  },
  {
    title: "AI and Productivity",
    accentClass: "text-indigo-300",
    items: [
      "Cursor",
      "Warp.dev",
      "Claude Code",
      "Gemini CLI",
      "GitHub Copilot",
      "OpenRouter",
      "Windsurf",
      "Cline",
      "VS Code",
      "Zed",
      "Gemini",
      "ChatGPT",
      "Perplexity",
      "Comet",
      "LangChain",
      "v0",
      "Bolt.new",
      "Lovable",
      "Google AI Studio",
      "Google Workspace",
      "Linear",
      "Jira",
    ],
  },
] as const;

// (Expertise items are displayed as curated keywords; detailed list removed for the lite page.)

export const metadata: Metadata = {
  title: "Jayvic San Antonio | Senior Software Engineer",
  description:
    "Accessibility-focused, low-motion version of Jayvic San Antonio's portfolio for slower devices or quick reference.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function MobileHomePage() {
  const [keywordProgress, setKeywordProgress] = useState(0);
  const pinRef = useRef<HTMLDivElement>(null);
  // No global scroll-lock on the lite page to avoid interfering with hero/nav animations.

  // Pinned scrubbing without body lock (prevents interference with hero/nav)
  useEffect(() => {
    const el = pinRef.current;
    if (!el) return;
    let startY = 0;
    const recalcStart = () => {
      let y = 0;
      let n: HTMLElement | null = el;
      while (n) { y += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
      startY = y;
    };
    const onScroll = () => {
      const total = el.offsetHeight - window.innerHeight;
      const y = Math.min(Math.max(window.scrollY - startY, 0), Math.max(total, 1));
      const pRaw = Math.max(0, Math.min(1, y / Math.max(total, 1)));
      const pEase = 1 - Math.pow(1 - pRaw, 3);
      setKeywordProgress(pEase);
    };
    recalcStart();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", recalcStart, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", recalcStart);
    };
  }, [setKeywordProgress]);

  return (
    <main className="text-white overflow-x-hidden min-h-screen">
      {/* Custom Ambient Background with black gradient overlay */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(59,130,246,0.15),transparent_60%),radial-gradient(60%_50%_at_50%_100%,rgba(168,85,247,0.12),transparent_60%)]" />

        {/* Subtle grid */}
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px] opacity-[0.04]" />

        {/* Grain */}
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:3px_3px] opacity-[0.05]" />

        {/* Black gradient overlay - black at top (section 1) fading to transparent (section 2) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/40 to-transparent" />
      </div>
      <h1 className="sr-only">Jayvic San Antonio — Full-Stack Software Engineer</h1>
      {/* Black gradient transition to section 2 */}

      {/* Top-centered header bubble */}
      <div className="pointer-events-none fixed left-0 right-0 top-[max(env(safe-area-inset-top),16px)] z-[70] py-6 sm:py-10">
        <div className="pointer-events-auto flex justify-center">
          <GlassHeaderBubble label="Hi, I'm Jayvic 👋" />
        </div>
      </div>

      {/* Section 1: Hero with video */}
      <section className="relative mx-3 mt-3 h-[calc(100svh-1.5rem)] overflow-hidden rounded-[28px] border border-white/10 sm:mx-4 sm:rounded-[36px] overscroll-behavior-y-contain">
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
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 0)",
            backgroundSize: "64px 64px, 64px 64px",
            backgroundPosition: "0 0, 0 0",
          }}
        />

        {/* Enhanced vignette to cover corners and sides */}
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(59,130,246,0.18),transparent_60%),radial-gradient(60%_50%_at_50%_100%,rgba(16,185,129,0.16),transparent_60%),radial-gradient(circle_at_0%_0%,rgba(0,0,0,0.9),transparent_30%),radial-gradient(circle_at_100%_0%,rgba(0,0,0,0.9),transparent_30%),radial-gradient(circle_at_0%_100%,rgba(0,0,0,0.9),transparent_30%),radial-gradient(circle_at_100%_100%,rgba(0,0,0,0.9),transparent_30%)]" />

        {/* Targeted overlay to hide watermarks */}
        <div className="absolute bottom-0 right-0 w-32 h-24 bg-gradient-to-tl from-black/95 via-black/85 to-transparent" />
        <div className="absolute top-0 right-0 w-20 h-12 bg-gradient-to-bl from-black/80 via-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-32 h-20 bg-gradient-to-tr from-black/95 via-black/85 to-transparent" />

        {/* Foreground person image */}
        <div className="absolute bottom-0 left-1/2 w-[92%] max-w-[28rem] -translate-x-1/2">
          <Image
            src="/images/me.png"
            alt="Jayvic San Antonio looking through binoculars"
            width={1400}
            height={1000}
            priority
            className="h-auto w-full object-contain object-bottom shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* Title at bottom */}
        <div className="pointer-events-none absolute left-1/2 bottom-8 w-[17.625rem] -translate-x-1/2 text-center z-10">
          <h2
            className={"font-oswald font-bold tracking-wide text-white drop-shadow-[0_4px_20px_rgba(0,139,139,0.4),_0_2px_10px_rgba(0,0,0,0.6)]"}
          >
            <div className="text-[36px] leading-none">
              <AnimatedText text="FULL-STACK" start={true} perCharDelay={80} baseDelay={120} />
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

      {/* Section 2: Keywords first across a tall region; About appears at the bottom */}
      <section className="relative w-full overflow-hidden">
        <div ref={pinRef} className="relative min-h-[220svh]">
          <KeywordsBackground
            items={[
              ...SKILL_SECTIONS.flatMap((s) =>
                s.items.map((label) => ({
                  label,
                  accentClass: s.accentClass,
                  emphasis: KEYWORD_HIGHLIGHT_LARGE.has(label)
                    ? 1.35
                    : KEYWORD_HIGHLIGHT_MEDIUM.has(label)
                      ? 1.18
                      : 1,
                })) as KeywordItem[],
              ),
              { label: "Reliability as a feature" },
              { label: "Performance and accessibility" },
              { label: "Edge-first architecture" },
              { label: "Security and trust" },
              { label: "AI as leverage with guardrails" },
              { label: "Data and APIs that age well" },
            ]}
            count={128}
            className="absolute inset-0"
            controlledProgress={keywordProgress}
          />
        </div>
        <div className="container px-4 pt-16 pb-20"></div>
      </section>
      <AnimatedSection largeText="ABOUT">
        <div className="space-y-4 text-lg text-gray-300">
          <p>
            I&apos;m Jayvic San Antonio, a full‑stack software engineer from the Philippines, now
            building in the San Francisco Bay Area. I&apos;ve spent more than a decade turning ideas
            into products people can actually use. I care about craft and about people. I write
            code that is easy to read, I obsess over how things feel, and I treat reliability like a
            feature. Clear contracts, thoughtful design, and automated checks help me ship with
            confidence and keep things fast and accessible for everyone.
          </p>
          <p>
            My path has been a mix of startup scrappiness and big‑company scale. I co‑founded a
            company back home, won a few hackathons, and learned how to rally a team around a rough
            idea. In the Bay Area I helped rebuild revenue‑critical features in a large advertising
            platform, scaled systems that needed to work under pressure, mentored newer engineers,
            and built tools that made everyone a little faster.
          </p>
          <p>
            Lately, I&apos;ve been building web applications with modern approaches to sharpen my
            craft and stay current. I&apos;ve also been learning more about AI, especially
            generative AI, context engineering, large language models, and MCPs, and I&apos;m using
            AI coding tools thoughtfully to become even more productive as an engineer. I&apos;m
            actively mastering these capabilities so I can move faster, make better decisions, and
            keep a real competitive edge.
          </p>
          <p>
            When I&apos;m not coding, I&apos;m getting my steps in Pokemon Go, collecting Star Wars
            Black Series figures, catching up on MCU movies and shows, and listening to Ed Sheeran.
            I like early-morning coffee, long walks with good podcasts, and shipping work I&apos;m
            proud to sign my name on.
          </p>
          <p>
            If you&apos;re working on something ambitious and care about the details, I&apos;d love
            to build with you. You can reach me at my{" "}
            <Link
              href="mailto:hi@jayvicsanantonio.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
            >
              email
            </Link>
            , find me on{" "}
            <Link
              href="https://www.linkedin.com/in/jayvicsanantonio"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
            >
              LinkedIn
            </Link>
            , and see more of my work{" "}
            <Link
              href="/projects"
              rel="noopener noreferrer"
              className="relative text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
            >
              here
            </Link>
            .
          </p>
        </div>
      </AnimatedSection>
      <AnimatedSection largeText="CONTACT">
        <div className="space-y-4 text-lg text-gray-300">
          <p>Feel free to say hello:</p>
          <p>
            <Link
              href="mailto:hi@jayvicsanantonio.dev"
              className="relative text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
            >
              hi@jayvicsanantonio.dev
            </Link>
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="https://www.linkedin.com/in/jayvicsanantonio"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
