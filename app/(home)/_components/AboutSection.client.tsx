"use client";

// About section component with cinematic scroll-triggered reveal
// Ported from lite page to match design system

import { Oswald } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const oswald = Oswald({ subsets: ["latin"] });

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
      className="relative w-full px-10 lg:px-40 overflow-hidden z-[250]"
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
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px] opacity-[0.04] mix-blend-overlay" />

        {/* Grain */}
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:3px_3px] opacity-[0.06] mix-blend-soft-light" />
      </div>
      <div className="container pt-32 pb-16 sm:pt-40 px-4 text-white">
        {/* Top Row - About Me and Skills */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch mb-8">
          {/* About Me Card */}
          <div
            ref={aboutCardRef}
            className="group relative w-full transform-gpu rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.25),rgba(168,85,247,0.15),rgba(34,211,238,0.12))] p-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-[24px] backdrop-saturate-[140%] transition-all duration-700 after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0)_100%)] after:opacity-0 after:mix-blend-overlay after:transition-opacity after:duration-300 hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.3),rgba(168,85,247,0.2),rgba(34,211,238,0.15))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_rgba(0,0,0,0.5)] hover:ring-white/15 group-hover:after:opacity-100 focus-within:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)] focus-within:after:opacity-100 hover:-translate-y-0.5 sm:p-[1.2px] md:hover:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)]"
            style={{
              opacity: cardTransforms.aboutCard.opacity,
              transform: `scale(${cardTransforms.aboutCard.scale})`,
              transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
            }}
          >
            {/* Subtle halo */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(80%_60%_at_50%_40%,rgba(59,130,246,0.22),transparent_70%),radial-gradient(70%_60%_at_60%_60%,rgba(168,85,247,0.18),transparent_70%)] opacity-20 blur-xl"
            />

            {/* Inner frosted panel */}
            <div className="relative h-full rounded-2xl border border-white/8 bg-gray-950/50 p-6 backdrop-blur-[20px] backdrop-saturate-[150%] sm:p-8 before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(100%_50%_at_50%_0%,rgba(255,255,255,0.05),rgba(255,255,255,0)_50%)] before:content-['']">
              <h2
                className={`${oswald.className} mb-6 text-2xl font-bold tracking-tight text-white`}
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
                  work I'm proud to sign my name on. If you're working on something ambitious and
                  care about the details, I'd love to build with you. You can reach me at my{" "}
                  <a
                    href="mailto:hi@jayvicsanantonio.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative text-cyan-300 hover:text-cyan-200 transition-colors duration-200 decoration-purple-400/60 underline decoration-wavy decoration-2 underline-offset-4"
                  >
                    email
                  </a>
                  , find me on{" "}
                  <a
                    href="https://www.linkedin.com/in/jayvicsanantonio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative text-cyan-300 hover:text-cyan-200 transition-colors duration-200 decoration-purple-400/60 underline decoration-wavy decoration-2 underline-offset-4"
                  >
                    LinkedIn
                  </a>
                  , and see more of my work{" "}
                  <a
                    href="https://jayvicsanantonio.dev/projects"
                    rel="noopener noreferrer"
                    className="relative text-cyan-300 hover:text-cyan-200 transition-colors duration-200 decoration-purple-400/60 underline decoration-wavy decoration-2 underline-offset-4"
                  >
                    here
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Skills Card */}
          <div
            ref={skillsCardRef}
            className="group relative w-full transform-gpu rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.25),rgba(168,85,247,0.15),rgba(34,211,238,0.12))] p-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-[24px] backdrop-saturate-[140%] transition-all duration-700 after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0)_100%)] after:opacity-0 after:mix-blend-overlay after:transition-opacity after:duration-300 hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.3),rgba(168,85,247,0.2),rgba(34,211,238,0.15))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_rgba(0,0,0,0.5)] hover:ring-white/15 group-hover:after:opacity-100 focus-within:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)] focus-within:after:opacity-100 hover:-translate-y-0.5 sm:p-[1.2px] md:hover:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)]"
            style={{
              opacity: cardTransforms.skillsCard.opacity,
              transform: `scale(${cardTransforms.skillsCard.scale})`,
              transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
            }}
          >
            {/* Subtle halo */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(80%_60%_at_50%_40%,rgba(59,130,246,0.22),transparent_70%),radial-gradient(70%_60%_at_60%_60%,rgba(168,85,247,0.18),transparent_70%)] opacity-20 blur-xl"
            />

            {/* Inner frosted panel */}
            <div className="relative rounded-2xl border border-white/8 bg-gray-950/50 p-6 backdrop-blur-[20px] backdrop-saturate-[150%] sm:p-8 before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(100%_50%_at_50%_0%,rgba(255,255,255,0.05),rgba(255,255,255,0)_50%)] before:content-['']">
              <h2
                className={`${oswald.className} mb-6 text-2xl font-bold tracking-tight text-white`}
              >
                Skills
              </h2>
              <div className="mt-3 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <div className="mt-6 space-y-6">
                {/* Frontend */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold tracking-wider text-cyan-300 uppercase">
                    Frontend
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "JavaScript",
                      "TypeScript",
                      "React",
                      "Next.js",
                      "Tailwind CSS",
                      "Framer Motion",
                      "React Native",
                      "Expo",
                      "HTML",
                      "CSS",
                      "Sass",
                      "SVG",
                      "Accessibility",
                    ].map((skill, index) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium tracking-[0.12em] text-gray-300 uppercase transition-all duration-300"
                        style={{
                          opacity: cardTransforms.skillsCard.opacity,
                          transform: `translateY(${cardTransforms.skillsCard.opacity > 0.5 ? 0 : 20}px)`,
                          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                          transitionDelay: `${index * 0.05}s`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Backend and Edge */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold tracking-wider text-purple-300 uppercase">
                    Backend and Edge
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Node.js",
                      "Hono",
                      "Express",
                      "Cloudflare Workers",
                      "Vercel Edge",
                      "REST APIs",
                      "Rate Limiting",
                      "Auth",
                    ].map((skill, index) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium tracking-[0.12em] text-gray-300 uppercase transition-all duration-300"
                        style={{
                          opacity: cardTransforms.skillsCard.opacity,
                          transform: `translateY(${cardTransforms.skillsCard.opacity > 0.5 ? 0 : 20}px)`,
                          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                          transitionDelay: `${(index + 13) * 0.05}s`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Data */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold tracking-wider text-emerald-300 uppercase">
                    Data
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["PostgreSQL", "Prisma", "MySQL", "MongoDB", "Redis"].map((skill, index) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium tracking-[0.12em] text-gray-300 uppercase transition-all duration-300"
                        style={{
                          opacity: cardTransforms.skillsCard.opacity,
                          transform: `translateY(${cardTransforms.skillsCard.opacity > 0.5 ? 0 : 20}px)`,
                          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                          transitionDelay: `${(index + 21) * 0.05}s`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quality and Testing */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold tracking-wider text-orange-300 uppercase">
                    Quality and Testing
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Zod", "Vitest", "Jest", "Cypress", "GitHub Actions", "CI/CD"].map(
                      (skill, index) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium tracking-[0.12em] text-gray-300 uppercase transition-all duration-300"
                          style={{
                            opacity: cardTransforms.skillsCard.opacity,
                            transform: `translateY(${cardTransforms.skillsCard.opacity > 0.5 ? 0 : 20}px)`,
                            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                            transitionDelay: `${(index + 26) * 0.05}s`,
                          }}
                        >
                          {skill}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                {/* DevOps and Tooling */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold tracking-wider text-rose-300 uppercase">
                    DevOps and Tooling
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Docker", "Kubernetes", "Git"].map((skill, index) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium tracking-[0.12em] text-gray-300 uppercase transition-all duration-300"
                        style={{
                          opacity: cardTransforms.skillsCard.opacity,
                          transform: `translateY(${cardTransforms.skillsCard.opacity > 0.5 ? 0 : 20}px)`,
                          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                          transitionDelay: `${(index + 32) * 0.05}s`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI and Productivity */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold tracking-wider text-indigo-300 uppercase">
                    AI and Productivity
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Gemini 2.5 Pro",
                      "Claude Sonnet 4.0",
                      "Claude Opus 4.1",
                      "GPT-5 Codex High",
                      "ChatGPT",
                      "GitHub Copilot",
                      "Perplexity",
                      "LangChain",
                      "OpenRouter",
                      "Google AI Studio",
                      "Gemini CLI",
                      "Cursor",
                      "Windsurf",
                      "Cline",
                      "VS Code AI Agents",
                      "Zed AI",
                      "v0",
                      "Comet",
                      "Bolt.new",
                      "Lovable",
                      "Warp.dev",
                    ].map((skill, index) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium tracking-[0.12em] text-gray-300 uppercase transition-all duration-300"
                        style={{
                          opacity: cardTransforms.skillsCard.opacity,
                          transform: `translateY(${cardTransforms.skillsCard.opacity > 0.5 ? 0 : 20}px)`,
                          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                          transitionDelay: `${(index + 35) * 0.05}s`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Expertise Card (Full Width) */}
        <div
          ref={expertiseCardRef}
          className="group relative w-full transform-gpu rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.25),rgba(168,85,247,0.15),rgba(34,211,238,0.12))] p-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-[24px] backdrop-saturate-[140%] transition-all duration-700 after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0)_100%)] after:opacity-0 after:mix-blend-overlay after:transition-opacity after:duration-300 hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.3),rgba(168,85,247,0.2),rgba(34,211,238,0.15))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_rgba(0,0,0,0.5)] hover:ring-white/15 group-hover:after:opacity-100 focus-within:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)] focus-within:after:opacity-100 hover:-translate-y-0.5 sm:p-[1.2px] md:hover:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)]"
          style={{
            opacity: cardTransforms.expertiseCard.opacity,
            transform: `scale(${cardTransforms.expertiseCard.scale})`,
            transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
          }}
        >
          {/* Subtle halo */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(80%_60%_at_50%_40%,rgba(59,130,246,0.22),transparent_70%),radial-gradient(70%_60%_at_60%_60%,rgba(168,85,247,0.18),transparent_70%)] opacity-20 blur-xl"
          />

          {/* Inner frosted panel */}
          <div className="relative rounded-2xl border border-white/8 bg-gray-950/50 p-6 backdrop-blur-[20px] backdrop-saturate-[150%] sm:p-8 before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(100%_50%_at_50%_0%,rgba(255,255,255,0.05),rgba(255,255,255,0)_50%)] before:content-['']">
            <h2 className={`${oswald.className} mb-6 text-2xl font-bold tracking-tight text-white`}>
              Expertise
            </h2>
            <div className="mt-3 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
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
              ].map((expertise, index) => (
                <div
                  key={expertise.title}
                  className="transition-all duration-300"
                  style={{
                    opacity: cardTransforms.expertiseCard.opacity,
                    transform: `translateY(${cardTransforms.expertiseCard.opacity > 0.5 ? 0 : 20}px)`,
                    transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                    transitionDelay: `${index * 0.08}s`,
                  }}
                >
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
