import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import GlassHeaderBubble from "@/components/ui/GlassHeaderBubble";

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

const CARD_WRAPPER_CLASS =
  "group relative w-full rounded-2xl bg-gradient-to-br from-slate-950/90 via-slate-950/70 to-slate-950/50 p-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_28px_rgba(0,0,0,0.45)] ring-1 ring-white/10 transition-transform duration-200 hover:-translate-y-0.5 sm:p-[1.2px]";

const CARD_BODY_CLASS = "relative h-full rounded-2xl border border-white/8 bg-gray-950/85 p-6 sm:p-8";

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

      {/* Section 2: About Me, Skills, and Expertise */}
      <section className="relative w-full overflow-hidden">
        <div className="container pt-32 pb-16 sm:pt-40 px-4">
          {/* Top Row - About Me and Skills */}
          <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch mb-8">
            {/* About Me Card */}
            <div className={CARD_WRAPPER_CLASS}>
              <div className={CARD_BODY_CLASS}>
                <h2
                  className={"font-oswald mb-6 text-2xl font-bold tracking-tight text-white"}
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
            <div className={CARD_WRAPPER_CLASS}>
              <div className={`${CARD_BODY_CLASS} space-y-6`}>
              <h2
                className={"font-oswald mb-6 text-2xl font-bold tracking-tight text-white"}
              >
                  Skills
                </h2>
                <div className="mt-3 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                <div className="mt-6 space-y-6">
                  {SKILL_SECTIONS.map(({ title, accentClass, items }) => (
                    <div key={title}>
                      <h3
                        className={`mb-3 text-sm font-semibold tracking-wider uppercase ${accentClass}`}
                      >
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
          <div className={CARD_WRAPPER_CLASS}>
            <div className={`${CARD_BODY_CLASS} space-y-6`}>
              <h2
                className={"font-oswald mb-6 text-2xl font-bold tracking-tight text-white"}
              >
                Expertise
              </h2>
              <div className="mt-3 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {EXPERTISE_ITEMS.map((expertise) => (
                  <div key={expertise.title} className="transition-colors duration-200">
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
