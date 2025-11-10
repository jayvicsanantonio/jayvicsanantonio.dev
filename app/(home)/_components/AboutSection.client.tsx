"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";

import { CARD_INNER_BASE, CARD_OUTER_BASE } from "@/components/ui/cardStyles";

import { MarqueeRow } from "./MarqueeRow";

type InViewOptions = { rootMargin?: string; threshold?: number };
function useInViewOnce<T extends Element>(ref: RefObject<T | null>, opts: InViewOptions = {}) {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (seen) return;

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true);
          obs.disconnect();
        }
      },
      { root: null, rootMargin: opts.rootMargin ?? "0px", threshold: opts.threshold ?? 0.2 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, opts.rootMargin, opts.threshold, seen]);

  return seen;
}

const SKILLS: string[] = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Hono",
  "Cloudflare Workers",
  "Vercel Edge",
  "Tailwind CSS",
  "Framer Motion",
  "Zod",
  "Prisma",
  "PostgreSQL",
  "Redis",
  "MySQL",
  "SQLite",
  "REST APIs",
  "Playwright",
  "Vitest",
  "Cypress",
  "GitHub Actions",
  "AWS",
  "Vercel",
  "GCP",
  "Docker",
  "Accessibility",
  "Performance",
  "DX",
  "LLMs",
  "LangChain",
  "OpenAI",
  "Copilot",
];

export default function AboutSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(cardRef, { rootMargin: "-10% 0px -10% 0px", threshold: 0.15 });

  const row0 = useMemo(() => SKILLS.filter((_, index) => index % 4 === 0), []);
  const row1 = useMemo(() => SKILLS.filter((_, index) => index % 4 === 1), []);
  const row2 = useMemo(() => SKILLS.filter((_, index) => index % 4 === 2), []);
  const row3 = useMemo(() => SKILLS.filter((_, index) => index % 4 === 3), []);

  return (
    <section
      data-testid="AboutSection"
      className="relative z-[250] w-full overflow-hidden px-6 sm:px-10 2xl:px-40"
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="mx-auto mt-4 w-full max-w-6xl space-y-2">
        <MarqueeRow items={row0} duration={36} direction="left" />
        <MarqueeRow items={row1} duration={42} direction="right" />
        <MarqueeRow items={row2} duration={48} direction="left" />
        <MarqueeRow items={row3} duration={54} direction="right" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:72px_72px] opacity-[0.03]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 py-20 text-white sm:py-24">
        <article
          ref={cardRef}
          data-testid="AboutCard"
          className={`${CARD_OUTER_BASE} w-full max-w-3xl`}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px) scale(1)" : "translateY(8px) scale(0.985)",
            transition:
              "opacity 600ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className={`${CARD_INNER_BASE} p-5 sm:p-6 [@container(min-width:36rem)]:p-6`}>
            <div className="text-left">
              <h2 className="font-oswald text-xl text-white [@container(min-width:28rem)]:text-2xl">
                About Me
              </h2>
              <div className="mt-3 h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />
            </div>
            <div className="mt-4 space-y-3 text-[0.95rem]/relaxed text-gray-300/90 [@container(min-width:34rem)]:space-y-4 sm:text-[0.98rem]/relaxed">
              <p>
                I'm Jayvic San Antonio, a full‑stack software engineer from the Philippines, now
                building in the San Francisco Bay Area. I've spent more than a decade turning ideas
                into products people can actually use. I care about craft and about people. I write
                code that is easy to read, I obsess over how things feel, and I treat reliability
                like a feature. Clear contracts, thoughtful design, and automated checks help me
                ship with confidence and keep things fast and accessible for everyone.
              </p>
              <p>
                My path has been a mix of startup scrappiness and big‑company scale. I co‑founded a
                company back home, won a few hackathons, and learned how to rally a team around a
                rough idea. In the Bay Area I helped rebuild revenue‑critical features in a large
                advertising platform, scaled systems that needed to work under pressure, mentored
                newer engineers, and built tools that made everyone a little faster.
              </p>
              <p>
                Lately, I've been building web applications with modern approaches to sharpen my
                craft and stay current. I've also been learning more about AI, especially generative
                AI, context engineering, large language models, and MCPs, and I'm using AI coding
                tools thoughtfully to become even more productive as an engineer. I'm actively
                mastering these capabilities so I can move faster, make better decisions, and keep a
                real competitive edge.
              </p>
              <p>
                When I'm not coding, I'm getting my steps in Pokemon Go, collecting Star Wars Black
                Series figures, catching up on MCU movies and shows, and listening to Ed Sheeran. I
                like early-morning coffee, long walks with good podcasts, and shipping work I'm
                proud to sign my name on.
              </p>
              <p>
                If you're working on something ambitious and care about the details, I'd love to
                build with you. You can reach me at my{" "}
                <Link
                  href="mailto:hi@jayvicsanantonio.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-cyan-300 transition-colors duration-200 hover:text-cyan-200"
                >
                  email
                </Link>
                , find me on{" "}
                <Link
                  href="https://www.linkedin.com/in/jayvicsanantonio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-cyan-300 transition-colors duration-200 hover:text-cyan-200"
                >
                  LinkedIn
                </Link>
                , and see more of my work{" "}
                <Link
                  href="/projects"
                  rel="noopener noreferrer"
                  className="relative text-cyan-300 transition-colors duration-200 hover:text-cyan-200"
                >
                  here
                </Link>
                .
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
