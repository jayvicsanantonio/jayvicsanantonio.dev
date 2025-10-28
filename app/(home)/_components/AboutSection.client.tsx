"use client";

// About section component with cinematic scroll-triggered reveal
// Ported from lite page to match design system

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CARD_INNER_BASE, CARD_OUTER_BASE } from "@/components/ui/cardStyles";

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
  const aboutCardRef = useRef<HTMLDivElement>(null);
  const skillsCardRef = useRef<HTMLDivElement>(null);
  const expertiseCardRef = useRef<HTMLDivElement>(null);

  const [cardTransforms, setCardTransforms] = useState({
    aboutCard: { scale: 0.5, opacity: 0 },
    skillsCard: { scale: 0.5, opacity: 0 },
    expertiseCard: { scale: 0.5, opacity: 0 },
  });

  const [animationComplete, setAnimationComplete] = useState({
    aboutCard: false,
    skillsCard: false,
    expertiseCard: false,
  });

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3, // Trigger when 30% of card is visible
      rootMargin: "0px 0px -20% 0px", // Start animation slightly before fully in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;

          // Trigger animations with staggered delays - only once
          if (target === aboutCardRef.current && !animationComplete.aboutCard) {
            setCardTransforms((prev) => ({
              ...prev,
              aboutCard: { scale: 1, opacity: 1 },
            }));
            setAnimationComplete((prev) => ({
              ...prev,
              aboutCard: true,
            }));

            // Skills card appears after about card with delay
            setTimeout(() => {
              setCardTransforms((prev) => ({
                ...prev,
                skillsCard: { scale: 1, opacity: 1 },
              }));
              setAnimationComplete((prev) => ({
                ...prev,
                skillsCard: true,
              }));
            }, 300);

            // Expertise card appears after skills card with delay
            setTimeout(() => {
              setCardTransforms((prev) => ({
                ...prev,
                expertiseCard: { scale: 1, opacity: 1 },
              }));
              setAnimationComplete((prev) => ({
                ...prev,
                expertiseCard: true,
              }));
            }, 600);

            // Unobserve after triggering to prevent re-animation
            observer.unobserve(target);
          }
        }
      });
    }, observerOptions);

    // Only observe the first card (About) to trigger the sequence
    if (aboutCardRef.current && !animationComplete.aboutCard) {
      observer.observe(aboutCardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [animationComplete.aboutCard]);

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
      <div className="container pt-32 pb-16 sm:pt-40 px-4 text-white">
        {/* Top Row - About Me and Skills */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch mb-8">
          {/* About Me Card */}
        <div
          ref={aboutCardRef}
          className={`${CARD_OUTER_BASE}`}
          style={{
            opacity: cardTransforms.aboutCard.opacity,
            transform: `scale(${cardTransforms.aboutCard.scale})`,
            transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
          }}
        >
          <div className={`${CARD_INNER_BASE} h-full p-6 sm:p-8`}>
            <h2
              className="font-oswald mb-6 text-2xl font-bold tracking-tight text-white"
            >
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
                build with you. You can reach me at my{' '}
                <Link
                  href="mailto:hi@jayvicsanantonio.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
                >
                  email
                </Link>
                , find me on{' '}
                <Link
                  href="https://www.linkedin.com/in/jayvicsanantonio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
                >
                  LinkedIn
                </Link>
                , and see more of my work{' '}
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

        {/* Skills Card */}
        <div
          ref={skillsCardRef}
          className={`${CARD_OUTER_BASE}`}
          style={{
            opacity: cardTransforms.skillsCard.opacity,
            transform: `scale(${cardTransforms.skillsCard.scale})`,
            transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
          }}
        >
          <div className={`${CARD_INNER_BASE} p-6 sm:p-8`}>
            <h2
              className="font-oswald mb-6 text-2xl font-bold tracking-tight text-white"
            >
              Skills
            </h2>
            <div className="mt-3 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="mt-6 space-y-6">
              {SKILL_SECTIONS.map(({ title, accentClass, items }) => (
                <div key={title}>
                  <h3 className={`mb-3 text-sm font-semibold tracking-wider uppercase ${accentClass}`}>
                    {title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium tracking-[0.12em] text-gray-300 uppercase"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>

        {/* Bottom Row - Expertise Card (Full Width) */}
        <div
          ref={expertiseCardRef}
          className={`${CARD_OUTER_BASE}`}
          style={{
            opacity: cardTransforms.expertiseCard.opacity,
            transform: `scale(${cardTransforms.expertiseCard.scale})`,
            transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
          }}
        >
          <div className={`${CARD_INNER_BASE} p-6 sm:p-8`}>
            <h2 className="font-oswald mb-6 text-2xl font-bold tracking-tight text-white">
              Expertise
            </h2>
            <div className="mt-3 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {EXPERTISE_ITEMS.map((expertise) => (
                <div key={expertise.title}>
                  <div className="flex items-start gap-3">
                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-300/80" />
                    <div>
                      <h4 className="font-semibold text-[0.95rem]/relaxed text-white mb-1">
                        {expertise.title}:
                      </h4>
                      <p className="text-[0.85rem]/relaxed text-gray-300/90">
                        {expertise.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
