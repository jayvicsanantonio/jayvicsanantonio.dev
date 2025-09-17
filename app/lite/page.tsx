export const runtime = "edge";

import { Oswald } from "next/font/google";
import Image from "next/image";
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
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-transparent" />
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

        {/* Tagline in liquid glass container centered within the section */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="group relative w-[min(22rem,88vw)] transform-gpu rounded-3xl bg-gradient-to-b from-white/5 via-white/3 to-white/8 p-[1.5px] shadow-[inset_0_2px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-[16px] backdrop-saturate-[180%] transition-all duration-500">
            {/* Liquid glass shimmer effect */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.08)_50%,transparent_70%)] opacity-60 animate-pulse"
            />

            {/* Subtle flowing highlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(59,130,246,0.15),transparent_70%),radial-gradient(ellipse_60%_80%_at_60%_60%,rgba(168,85,247,0.12),transparent_70%)] opacity-40 blur-lg"
            />

            {/* Inner liquid glass panel */}
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/8 via-transparent to-white/5 px-6 py-4 backdrop-blur-[12px] backdrop-saturate-[160%] before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:bg-[radial-gradient(100%_100%_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)] before:content-[''] after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl after:bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_40%,rgba(255,255,255,0.02))] after:content-['']">
              <p className="relative z-10 text-center text-base leading-relaxed text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                I experiment with AI daily—and build web platforms that put it to work.
              </p>
            </div>
          </div>
        </div>

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
        {/* Ambient background */}

        <div className="container pt-32 pb-16 sm:pt-40 px-4">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            {/* About Me Card */}
            <div className="group relative w-full h-full transform-gpu rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.25),rgba(168,85,247,0.15),rgba(34,211,238,0.12))] p-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-[24px] backdrop-saturate-[140%] transition-all duration-300 after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0)_100%)] after:opacity-0 after:mix-blend-overlay after:transition-opacity after:duration-300 hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.3),rgba(168,85,247,0.2),rgba(34,211,238,0.15))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_rgba(0,0,0,0.5)] hover:ring-white/15 group-hover:after:opacity-100 focus-within:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)] focus-within:after:opacity-100 hover:-translate-y-0.5 sm:p-[1.2px] md:hover:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)]">
              {/* Subtle halo */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(80%_60%_at_50%_40%,rgba(59,130,246,0.22),transparent_70%),radial-gradient(70%_60%_at_60%_60%,rgba(168,85,247,0.18),transparent_70%)] opacity-20 blur-xl"
              />

              {/* Inner frosted panel */}
              <div className="relative h-full rounded-2xl border border-white/8 bg-gray-950/50 p-6 backdrop-blur-[20px] backdrop-saturate-[150%] sm:p-8 before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(100%_50%_at_50%_0%,rgba(255,255,255,0.05),rgba(255,255,255,0)_50%)] before:content-['']">
                <h2 className="font-oswald mb-6 text-2xl font-bold tracking-tight text-white">
                  About Me
                </h2>
                <div className="mt-3 h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />
                <div className="mt-6 space-y-4 text-[0.95rem]/relaxed sm:text-[0.98rem]/relaxed text-gray-300/90">
                  <p>
                    I'm Jayvic San Antonio, a Full-Stack Web Developer originally from the
                    Philippines, now thriving in the San Francisco Bay Area. With over 9 years of
                    experience, you could say JavaScript is my coding soulmate - I love its
                    versatility and how it keeps getting better and better!
                  </p>
                  <p>
                    From hackathons and co-founding a startup to working at a global media and tech
                    company, I've thrived in all kinds of environments. Whether I'm flying solo or
                    part of an awesome team, I'm all about tackling challenging projects and
                    delivering top-notch code (optimized, documented, and ready to roll!).
                  </p>
                  <p>
                    In this ever-evolving industry, staying sharp is key. That's why I'm constantly
                    learning and pushing my skills to the next level.
                  </p>
                  <p>
                    <strong className="text-cyan-300/90">What gets me excited?</strong> The chance
                    to create impactful solutions, make user experiences amazing, and drive
                    innovation in a forward-thinking environment. Collaboration and inclusivity are
                    super important to me, so working with a team that shares those values would be
                    epic!
                  </p>
                  <p>
                    Excited to bring your vision to life? Let's collaborate and build something
                    incredible together!{" "}
                    <span className="text-cyan-300 underline cursor-pointer">Let's chat!</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Skills and Expertise Container */}
            <div className="space-y-8">
              {/* Skills Card */}
              <div className="group relative w-full transform-gpu rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.25),rgba(168,85,247,0.15),rgba(34,211,238,0.12))] p-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-[24px] backdrop-saturate-[140%] transition-all duration-300 after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0)_100%)] after:opacity-0 after:mix-blend-overlay after:transition-opacity after:duration-300 hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.3),rgba(168,85,247,0.2),rgba(34,211,238,0.15))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_rgba(0,0,0,0.5)] hover:ring-white/15 group-hover:after:opacity-100 focus-within:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)] focus-within:after:opacity-100 hover:-translate-y-0.5 sm:p-[1.2px] md:hover:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)]">
                {/* Subtle halo */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(80%_60%_at_50%_40%,rgba(59,130,246,0.22),transparent_70%),radial-gradient(70%_60%_at_60%_60%,rgba(168,85,247,0.18),transparent_70%)] opacity-20 blur-xl"
                />

                {/* Inner frosted panel */}
                <div className="relative rounded-2xl border border-white/8 bg-gray-950/50 p-6 backdrop-blur-[20px] backdrop-saturate-[150%] sm:p-8 before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(100%_50%_at_50%_0%,rgba(255,255,255,0.05),rgba(255,255,255,0)_50%)] before:content-['']">
                  <h2 className="font-oswald mb-6 text-2xl font-bold tracking-tight text-white">
                    Skills
                  </h2>
                  <div className="mt-3 h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />
                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      "JavaScript",
                      "TypeScript",
                      "React",
                      "Next.js",
                      "Remix",
                      "Node.js",
                      "Express.js",
                      "Tailwind CSS",
                      "React Native",
                      "Expo",
                      "Ember.js",
                      "HTML",
                      "CSS",
                      "SASS / SCSS",
                      "AWS",
                      "MongoDB",
                      "Redis",
                      "MySQL",
                      "PostgreSQL",
                      "Java",
                      "Cypress",
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
              </div>

              {/* Expertise Card */}
              <div className="group relative w-full transform-gpu rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.25),rgba(168,85,247,0.15),rgba(34,211,238,0.12))] p-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-[24px] backdrop-saturate-[140%] transition-all duration-300 after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0)_100%)] after:opacity-0 after:mix-blend-overlay after:transition-opacity after:duration-300 hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.3),rgba(168,85,247,0.2),rgba(34,211,238,0.15))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_rgba(0,0,0,0.5)] hover:ring-white/15 group-hover:after:opacity-100 focus-within:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)] focus-within:after:opacity-100 hover:-translate-y-0.5 sm:p-[1.2px] md:hover:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)]">
                {/* Subtle halo */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(80%_60%_at_50%_40%,rgba(59,130,246,0.22),transparent_70%),radial-gradient(70%_60%_at_60%_60%,rgba(168,85,247,0.18),transparent_70%)] opacity-20 blur-xl"
                />

                {/* Inner frosted panel */}
                <div className="relative rounded-2xl border border-white/8 bg-gray-950/50 p-6 backdrop-blur-[20px] backdrop-saturate-[150%] sm:p-8 before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(100%_50%_at_50%_0%,rgba(255,255,255,0.05),rgba(255,255,255,0)_50%)] before:content-['']">
                  <h2 className="font-oswald mb-6 text-2xl font-bold tracking-tight text-white">
                    Expertise
                  </h2>
                  <div className="mt-3 h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />
                  <div className="mt-6 space-y-3">
                    {[
                      "Frontend Development",
                      "Web Performance Optimization",
                      "Agile and Scrum Methodologies",
                      "Cross-functional Collaboration",
                      "Problem-solving and Debugging",
                      "Responsive Design",
                      "Adaptability and Learning",
                      "Mentoring and Knowledge Sharing",
                      "Documentation Proficiency",
                      "Technical Leadership",
                      "Software Engineering Best Practices",
                      "Startup Development",
                    ].map((expertise) => (
                      <div key={expertise} className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-cyan-300/80" />
                        <span className="text-[0.95rem]/relaxed text-gray-300/90">{expertise}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
