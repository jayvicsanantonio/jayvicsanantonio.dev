"use client";

// About section component with cinematic scroll-triggered reveal
// Ported from lite page to match design system

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CARD_INNER_BASE, CARD_OUTER_BASE } from "@/components/ui/cardStyles";
import KeywordsBackground, { type KeywordItem } from "@/components/ui/KeywordsBackground.client";

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
    items: ["Prisma", "PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis"],
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
    items: ["Amazon Web Services", "Vercel", "Google Cloud", "Cloudflare", "Netlify", "Git"],
  },
  {
    title: "AI and Productivity",
    accentClass: "text-indigo-300",
    items: [
      "Cursor",
      "Warp.dev",
      "Claude Code",
      "Gemini CLI",
      "Windsurf",
      "GitHub Copilot",
      "OpenRouter",
      "Cline",
      "VS Code",
      "Zed",
      "AI SDK",
      "OpenAI SDK",
      "ChatGPT",
      "Perplexity",
      "Comet",
      "LangChain",
      "Amazon Bedrock",
      "Amazon Rekognition",
      "Google AI Studio",
      "Chrome Builti-in AI API",
      "Groq API",
      "AI Agents",
      "Multi-Agent Orchestration",
      "Google GenAI SDK",
    ],
  },
] as const;

const EXPERTISE_ITEMS = [
  {
    title: "Reliability as a feature",
    description:
      "I design with clear contracts, structured outputs, and automated checks so changes ship confidently and stay healthy over time.",
  },
  {
    title: "Performance and accessibility",
    description:
      "I sweat UX details and measure results, from Lighthouse wins to smoother motion and faster page loads on real networks and devices.",
  },
  {
    title: "Edge-first architecture",
    description:
      "I simplify deployments and reduce latency by consolidating services, adding thoughtful rate limits and admin surfaces where they earn their keep.",
  },
  {
    title: "Security and trust",
    description:
      "I harden APIs with authentication, headers, CORS discipline, and predictable error handling so teams can move quickly without surprises.",
  },
  {
    title: "AI as leverage with guardrails",
    description:
      "I integrate LLMs and coding assistants to boost velocity while keeping outputs structured, costs controlled, and reviews human-friendly.",
  },
  {
    title: "Data and APIs that age well",
    description:
      "I design schemas and endpoints that are easy to read, paginate, cache, and evolve without breaking callers.",
  },
  {
    title: "Testing that protects momentum",
    description:
      "I balance unit, integration, and E2E coverage so the codebase remains fast to change and safe to deploy.",
  },
  {
    title: "Developer experience and documentation",
    description:
      "I write the docs I wish I had, improve onboarding paths, and shape tooling that keeps teams in flow.",
  },
  {
    title: "Mentorship and collaboration",
    description:
      "I help teammates level up through pairing, design reviews, and clear communication, keeping the team calm and productive.",
  },
] as const;

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const keywordsContainerRef = useRef<HTMLDivElement>(null);
  const aboutCardRef = useRef<HTMLDivElement>(null);
  const keywordsSectionStartRef = useRef<number>(0);
  const isTrackingKeywordsRef = useRef(false);
  const lastScrollYRef = useRef(0);
  
  // Progress: 0-1 (0-0.5 appear, 0.5-1 disappear)
  const [keywordProgress, setKeywordProgress] = useState(0);
  const [keywordsComplete, setKeywordsComplete] = useState(false);
  const [aboutCardVisible, setAboutCardVisible] = useState(false);

  // Track scroll position relative to keywords section
  useEffect(() => {
    const keywordsContainer = keywordsContainerRef.current;
    if (!keywordsContainer) return;

    const updateProgress = () => {
      if (!isTrackingKeywordsRef.current || keywordsComplete) return;

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - keywordsSectionStartRef.current;
      
      // Map scroll delta to progress (1000px scroll = full progress)
      // Adjust this value to control how much scroll is needed for full animation
      const maxScrollDistance = 1000;
      const progress = Math.max(0, Math.min(1, scrollDelta / maxScrollDistance));
      
      setKeywordProgress(progress);
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isTrackingKeywordsRef.current) {
          // Start tracking when keywords section enters viewport
          isTrackingKeywordsRef.current = true;
          keywordsSectionStartRef.current = window.scrollY;
          lastScrollYRef.current = window.scrollY;
        } else if (!entry.isIntersecting && isTrackingKeywordsRef.current) {
          // Stop tracking when section exits
          isTrackingKeywordsRef.current = false;
        }
      });
    }, observerOptions);

    observer.observe(keywordsContainer);

    // Track scroll to update progress
    const handleScroll = () => {
      if (isTrackingKeywordsRef.current && !keywordsComplete) {
        updateProgress();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [keywordsComplete]);

  // Track scroll naturally - no prevention, just map scroll to progress
  // This allows smooth, natural scrolling while driving keywords animation

  // Handle keywords completion
  const handleKeywordsComplete = () => {
    setKeywordsComplete(true);
    isTrackingKeywordsRef.current = false;
    // Animate About card on top
    setTimeout(() => {
      setAboutCardVisible(true);
    }, 300);
  };

  // Flatten arrays for background keyword overlays
  const skillKeywords: KeywordItem[] = useMemo(
    () =>
      SKILL_SECTIONS.flatMap((s) =>
        s.items.map((label) => ({ label, accentClass: s.accentClass })),
      ),
    [],
  );
  // Selected expertise items optimized for hiring managers
  const HIGHLIGHT_EXPERTISE_TITLES = [
    "Reliability as a feature",
    "Performance and accessibility",
    "Edge-first architecture",
    "Security and trust",
    "AI as leverage with guardrails",
    "Data and APIs that age well",
  ] as const;
  const expertiseKeywords: KeywordItem[] = useMemo(
    () =>
      EXPERTISE_ITEMS.filter((e) =>
        (HIGHLIGHT_EXPERTISE_TITLES as readonly string[]).includes(e.title),
      ).map((e) => ({ label: e.title })),
    [],
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-10 2xl:px-40 overflow-hidden z-[250]"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, rgba(8, 51, 68, 1) 0%, rgba(8, 51, 68, 0.1) 5%, rgba(0, 0, 0, 0.7) 70%)",
      }}
    >
      {/* Ambient background effects - similar to AmbientBackground.tsx */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,51,68,0.6),transparent)]" />

        {/* Subtle grid */}
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px] opacity-[0.04]" />

        {/* Grain */}
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:3px_3px] opacity-[0.05]" />
      </div>
      <div className="relative text-white">
        {/* Phase 1: keywords fill the viewport */}
        <div ref={keywordsContainerRef} className="relative h-[110svh] sm:h-[110vh]">
          <KeywordsBackground
            items={[...skillKeywords, ...expertiseKeywords]}
            count={112}
            className="absolute inset-0"
            controlledProgress={keywordProgress}
            onComplete={handleKeywordsComplete}
          />
          
          {/* Phase 2: About card appears on top after keywords complete */}
          {aboutCardVisible && (
            <div
              className="container px-4 absolute inset-0 flex items-center justify-center z-10"
              style={{ pointerEvents: "none" }}
            >
              <div
                ref={aboutCardRef}
                className={`${CARD_OUTER_BASE} w-full max-w-2xl`}
                style={{
                  opacity: aboutCardVisible ? 1 : 0,
                  transform: aboutCardVisible
                    ? "translateY(0) scale(1)"
                    : `translateY(${16}px) scale(0.94)`,
                  transition: "opacity 800ms cubic-bezier(0.22,1,0.36,1), transform 900ms cubic-bezier(0.22,1,0.36,1)",
                  pointerEvents: "auto",
                }}
              >
                <div className={`${CARD_INNER_BASE} h-full p-6 sm:p-8`}>
                  <h2 className={"font-oswald mb-6 text-2xl font-bold tracking-tight text-white"}>
                    About Me
                  </h2>
                  <div className="mt-3 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  <div className="mt-6 space-y-4 text-[0.95rem]/relaxed sm:text-[0.98rem]/relaxed text-gray-300/90">
                    <p>
                      I'm Jayvic San Antonio, a full‑stack software engineer from the Philippines, now
                      building in the San Francisco Bay Area. I've spent more than a decade turning
                      ideas into products people can actually use. I care about craft and about people.
                      I write code that is easy to read, I obsess over how things feel, and I treat
                      reliability like a feature. Clear contracts, thoughtful design, and automated
                      checks help me ship with confidence and keep things fast and accessible for
                      everyone.
                    </p>
                    <p>
                      My path has been a mix of startup scrappiness and big‑company scale. I co‑founded
                      a company back home, won a few hackathons, and learned how to rally a team around
                      a rough idea. In the Bay Area I helped rebuild revenue‑critical features in a
                      large advertising platform, scaled systems that needed to work under pressure,
                      mentored newer engineers, and built tools that made everyone a little faster.
                    </p>
                    <p>
                      Lately, I've been building web applications with modern approaches to sharpen my
                      craft and stay current. I've also been learning more about AI, especially
                      generative AI, context engineering, large language models, and MCPs, and I'm using
                      AI coding tools thoughtfully to become even more productive as an engineer. I'm
                      actively mastering these capabilities so I can move faster, make better decisions,
                      and keep a real competitive edge.
                    </p>
                    <p>
                      When I'm not coding, I'm getting my steps in Pokemon Go, collecting Star Wars
                      Black Series figures, catching up on MCU movies and shows, and listening to Ed
                      Sheeran. I like early-morning coffee, long walks with good podcasts, and shipping
                      work I'm proud to sign my name on.
                    </p>
                    <p>
                      If you're working on something ambitious and care about the details, I'd love to
                      build with you. You can reach me at my{" "}
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
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
