"use client";

// About section component with cinematic scroll-triggered reveal
// Ported from lite page to match design system

import { useEffect, useRef, useState } from "react";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"] });

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Start showing content after black transition completes (around 1500px scroll)
      const blackTransitionComplete = 1500;
      const isInView = scrollY > blackTransitionComplete;

      // Calculate progress for staggered animations
      const progress = Math.max(0, Math.min(1, (scrollY - blackTransitionComplete) / 400));

      setIsVisible(isInView);
      setScrollProgress(progress);

      // Debug logging
      console.log("AboutSection scroll:", { scrollY, isInView, progress });
    };

    // Check initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-cyan-950 z-[250]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 60}px)`,
        transition:
          "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        minHeight: "100vh",
      }}
    >
      <div className="container pt-32 pb-16 sm:pt-40 px-4 text-white">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* About Me Card */}
          <div
            className="group relative w-full h-full transform-gpu rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.25),rgba(168,85,247,0.15),rgba(34,211,238,0.12))] p-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-[24px] backdrop-saturate-[140%] transition-all duration-700 after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0)_100%)] after:opacity-0 after:mix-blend-overlay after:transition-opacity after:duration-300 hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.3),rgba(168,85,247,0.2),rgba(34,211,238,0.15))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_rgba(0,0,0,0.5)] hover:ring-white/15 group-hover:after:opacity-100 focus-within:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)] focus-within:after:opacity-100 hover:-translate-y-0.5 sm:p-[1.2px] md:hover:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateX(${isVisible ? 0 : -40}px) scale(${isVisible ? 1 : 0.95})`,
              transitionDelay: "0.2s",
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
                  <strong className="text-cyan-300/90">What gets me excited?</strong> The chance to
                  create impactful solutions, make user experiences amazing, and drive innovation in
                  a forward-thinking environment. Collaboration and inclusivity are super important
                  to me, so working with a team that shares those values would be epic!
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
            <div
              className="group relative w-full transform-gpu rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.25),rgba(168,85,247,0.15),rgba(34,211,238,0.12))] p-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-[24px] backdrop-saturate-[140%] transition-all duration-700 after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0)_100%)] after:opacity-0 after:mix-blend-overlay after:transition-opacity after:duration-300 hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.3),rgba(168,85,247,0.2),rgba(34,211,238,0.15))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_rgba(0,0,0,0.5)] hover:ring-white/15 group-hover:after:opacity-100 focus-within:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)] focus-within:after:opacity-100 hover:-translate-y-0.5 sm:p-[1.2px] md:hover:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateX(${isVisible ? 0 : 40}px) scale(${isVisible ? 1 : 0.95})`,
                transitionDelay: "0.4s",
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
                  ].map((skill, index) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium tracking-[0.12em] text-gray-300 uppercase transition-all duration-300"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: `translateY(${isVisible ? 0 : 20}px)`,
                        transitionDelay: `${0.6 + index * 0.05}s`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Expertise Card */}
            <div
              className="group relative w-full transform-gpu rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.25),rgba(168,85,247,0.15),rgba(34,211,238,0.12))] p-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-[24px] backdrop-saturate-[140%] transition-all duration-700 after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0)_100%)] after:opacity-0 after:mix-blend-overlay after:transition-opacity after:duration-300 hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.3),rgba(168,85,247,0.2),rgba(34,211,238,0.15))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_rgba(0,0,0,0.5)] hover:ring-white/15 group-hover:after:opacity-100 focus-within:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)] focus-within:after:opacity-100 hover:-translate-y-0.5 sm:p-[1.2px] md:hover:[transform:perspective(1000px)_rotateX(0.6deg)_rotateY(-0.6deg)]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateX(${isVisible ? 0 : 40}px) scale(${isVisible ? 1 : 0.95})`,
                transitionDelay: "0.8s",
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
                  Expertise
                </h2>
                <div className="mt-3 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
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
                  ].map((expertise, index) => (
                    <div
                      key={expertise}
                      className="flex items-center gap-3 transition-all duration-300"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: `translateX(${isVisible ? 0 : 20}px)`,
                        transitionDelay: `${1.0 + index * 0.1}s`,
                      }}
                    >
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
  );
}
