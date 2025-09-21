export const runtime = "edge";

import { Oswald } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import GlassHeaderBubble from "@/components/ui/GlassHeaderBubble";

const oswald = Oswald({ subsets: ["latin"] });

export default function MobileHomePage() {
  return (
    <main className="text-white overflow-x-hidden min-h-screen">
      {/* Custom Ambient Background with black gradient overlay */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(59,130,246,0.15),transparent_60%),radial-gradient(60%_50%_at_50%_100%,rgba(168,85,247,0.12),transparent_60%)]" />

        {/* Subtle grid */}
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px] opacity-[0.04] mix-blend-overlay" />

        {/* Grain */}
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:3px_3px] opacity-[0.06] mix-blend-soft-light" />

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
          className="absolute inset-0 opacity-[0.14] mix-blend-screen"
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
            className="h-auto w-full object-contain object-bottom"
            style={{
              filter:
                "brightness(0.95) saturate(1.25) drop-shadow(0 0 60px rgba(0,139,139,0.30)) drop-shadow(0 10px 40px rgba(0,0,0,0.45))",
            }}
          />
        </div>

        {/* Title at bottom */}
        <div className="pointer-events-none absolute left-1/2 bottom-8 w-[17.625rem] -translate-x-1/2 text-center z-10">
          <h2
            className={`font-bold tracking-wide text-white drop-shadow-[0_4px_20px_rgba(0,139,139,0.4)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] ${oswald.className}`}
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

      {/* Section 2: About Me, Skills, and Expertise */}
      <section className="relative w-full overflow-hidden">
        <div className="container pt-32 pb-16 sm:pt-40 px-4">
          {/* Top Row - About Me and Skills */}
          <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch mb-8">
            {/* About Me Card */}
            <div className="group relative w-full transform-gpu rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.25),rgba(255,255,255,0.08),rgba(34,211,238,0.20))] p-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-[24px] backdrop-saturate-[140%] transition-all duration-300 after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0)_100%)] after:opacity-0 after:mix-blend-overlay after:transition-opacity after:duration-300 hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.35),rgba(255,255,255,0.12),rgba(34,211,238,0.30))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_rgba(0,0,0,0.5)] hover:ring-white/15 group-hover:after:opacity-100 focus-within:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)] focus-within:after:opacity-100 hover:-translate-y-0.5 sm:p-[1.2px] md:hover:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)]">
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
                    ideas into products people can actually use. I care about craft and about
                    people. I write code that is easy to read, I obsess over how things feel, and I
                    treat reliability like a feature. Clear contracts, thoughtful design, and
                    automated checks help me ship with confidence and keep things fast and
                    accessible for everyone.
                  </p>

                  <p>
                    My path has been a mix of startup scrappiness and big‑company scale. I
                    co‑founded a company back home, won a few hackathons, and learned how to rally a
                    team around a rough idea. In the Bay Area I helped rebuild revenue‑critical
                    features in a large advertising platform, scaled systems that needed to work
                    under pressure, mentored newer engineers, and built tools that made everyone a
                    little faster.
                  </p>
                  <p>
                    Lately, I've been building web applications with modern approaches to sharpen my
                    craft and stay current. I've also been learning more about AI, especially
                    generative AI, context engineering, large language models, and MCPs, and I'm
                    using AI coding tools thoughtfully to become even more productive as an
                    engineer. I'm actively mastering these capabilities so I can move faster, make
                    better decisions, and keep a real competitive edge.
                  </p>
                  <p>
                    When I'm not coding, I'm getting my steps in Pokemon Go, collecting Star Wars
                    Black Series figures, catching up on MCU movies and shows, and listening to Ed
                    Sheeran. I like early-morning coffee, long walks with good podcasts, and
                    shipping work I'm proud to sign my name on.
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

            {/* Skills Card */}
            <div className="group relative w-full transform-gpu rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.25),rgba(255,255,255,0.08),rgba(34,211,238,0.20))] p-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-[24px] backdrop-saturate-[140%] transition-all duration-300 after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0)_100%)] after:opacity-0 after:mix-blend-overlay after:transition-opacity after:duration-300 hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.35),rgba(255,255,255,0.12),rgba(34,211,238,0.30))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_rgba(0,0,0,0.5)] hover:ring-white/15 group-hover:after:opacity-100 focus-within:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)] focus-within:after:opacity-100 hover:-translate-y-0.5 sm:p-[1.2px] md:hover:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)]">
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
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium tracking-[0.12em] text-gray-300 uppercase"
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
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium tracking-[0.12em] text-gray-300 uppercase"
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
                      {[
                        "Prisma",
                        "Drizzle",
                        "PostgreSQL",
                        "MySQL",
                        "SQLite",
                        "MongoDB",
                        "Redis",
                        "Firebase",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium tracking-[0.12em] text-gray-300 uppercase"
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
                      {[
                        "Zod",
                        "Vitest",
                        "React Testing Library",
                        "Jest",
                        "Playwright",
                        "Cypress",
                        "GitHub Actions",
                        "Jenkins",
                        "CI/CD",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium tracking-[0.12em] text-gray-300 uppercase"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* DevOps and Tooling */}
                  <div>
                    <h3 className="mb-3 text-sm font-semibold tracking-wider text-rose-300 uppercase">
                      DevOps and Tooling
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Amazon Web Services",
                        "Vercel",
                        "Cloudflare",
                        "Netlify",
                        "Docker",
                        "Git",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium tracking-[0.12em] text-gray-300 uppercase"
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
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium tracking-[0.12em] text-gray-300 uppercase"
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
          <div className="group relative w-full transform-gpu rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.25),rgba(255,255,255,0.08),rgba(34,211,238,0.20))] p-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-[24px] backdrop-saturate-[140%] transition-all duration-300 after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0)_100%)] after:opacity-0 after:mix-blend-overlay after:transition-opacity after:duration-300 hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.35),rgba(255,255,255,0.12),rgba(34,211,238,0.30))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_rgba(0,0,0,0.5)] hover:ring-white/15 group-hover:after:opacity-100 focus-within:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)] focus-within:after:opacity-100 hover:-translate-y-0.5 sm:p-[1.2px] md:hover:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)]">
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
                ].map((expertise) => (
                  <div key={expertise.title} className="transition-all duration-300">
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
    </main>
  );
}
