"use client";

import { PROJECTS } from "@/app/projects/project-data";

import usePrefersReducedMotion from "@/hooks/use-prefers-reduced-motion";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

// PROJECTS now sourced from project-data.ts

import AnimatedText from "@/components/ui/AnimatedText";
import { GlassButton } from "@/components/ui/GlassButton";

// Filters and ordering constants
const SKILL_FILTERS = [
  "All",
  "Enterprise",
  "Startup",
  "Hobby",
  "Client",
  "Open Source",
  "Sandboxes",
] as const;

const PRIORITY_ORDER = [
  "yahoo-dsp",
  "webdevhub",
  "sync-flow",
  "tracknstick",
  "barbenheimer-vscode-theme",
  "barbenheimer-zed-theme",
  "ember-upgrade-guide",
];

function ProjectLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isExternal =
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  if (isExternal) {
    return (
      <GlassButton
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="h-9 px-3 text-sm gap-2"
      >
        {children}
      </GlassButton>
    );
  }

  return (
    <GlassButton href={href} className="h-9 px-3 text-sm gap-2" prefetch>
      {children}
    </GlassButton>
  );
}

export default function ProjectsPage() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative w-full">
      <div className="container pt-52 pb-16">
        {/* Header */}
        <div className="space-y-5">
          <h1 className="font-oswald text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-cyan-300/90">
            <span className="sr-only">Projects</span>
            <AnimatedText
              text="Crafted Artifacts"
              start={!prefersReducedMotion}
              perCharDelay={45}
            />
          </h1>

          <p className="text-gray-300/85 text-base sm:text-lg max-w-[720px]">
            A curated collection of platforms, tools, and experiments—built with
            care, tuned for performance, and shaped by design.
          </p>
        </div>

        {/* Projects only */}

        <SkillsAndCases prefersReducedMotion={prefersReducedMotion} />
      </div>
    </section>
  );
}

function SkillsAndCases({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialFromQuery =
    (searchParams?.get("skill") || searchParams?.get("filter")) ?? undefined;

  // Fixed, curated filters
  const [active, setActive] = React.useState<string>(() =>
    initialFromQuery && SKILL_FILTERS.includes(initialFromQuery as any)
      ? (initialFromQuery as (typeof SKILL_FILTERS)[number])
      : "All",
  );

  // Announce filter changes for screen readers
  const [announce, setAnnounce] = React.useState<string>("");

  // Keep URL query param in sync with active filter (replace to avoid history spam)
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(searchParams?.toString());
      if (active === "All") {
        params.delete("skill");
        params.delete("filter");
      } else {
        params.set("skill", active);
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      setAnnounce(`Filter: ${active}`);
    } catch {
      // no-op
    }
    // Intentionally omitting searchParams from deps to avoid feedback loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, pathname, router]);

  const EASING = [0.22, 1, 0.36, 1] as const;

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: 0.02 },
    },
  };

  const cardVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: EASING as any },
        },
      };

  const visible = React.useMemo(() => {
    const filtered = PROJECTS.filter(
      (c) => active === "All" || c.skills.includes(active),
    );
    return filtered.slice().sort((a, b) => {
      const ai = PRIORITY_ORDER.indexOf(a.slug);
      const bi = PRIORITY_ORDER.indexOf(b.slug);
      if (ai !== -1 || bi !== -1) {
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      }
      return 0;
    });
  }, [active]);

  return (
    <div className="mt-12">
      {/* Matrix */}
      {/* SR announcement for filter changes */}
      <span className="sr-only" aria-live="polite" role="status">
        {announce}
      </span>
      <div className="flex flex-wrap gap-2">
        {SKILL_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={`relative inline-flex items-center rounded-full px-3 py-1.5 text-xs sm:text-sm transition-colors border backdrop-blur-md backdrop-saturate-[140%] ${
              active === s
                ? "text-white border-cyan-400/60 bg-cyan-900/70 shadow-[0_8px_28px_rgba(0,0,0,0.35)]"
                : "text-white/90 border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.06))] hover:border-white/50"
            } focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-cyan-400/60`}
            aria-pressed={active === s}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Projects rail */}
      <motion.div
        key={active}
        className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6"
        {...(!prefersReducedMotion
          ? {
              variants: containerVariants,
              initial: "hidden" as const,
              whileInView: "show" as const,
              viewport: { once: true, amount: 0.2 },
            }
          : {})}
      >
        {visible.map((c) => (
          <motion.article
            key={c.slug}
            {...(!prefersReducedMotion ? { variants: cardVariants } : {})}
            className="group relative rounded-2xl p-[1px] min-h-[430px] bg-[linear-gradient(135deg,rgba(59,130,246,0.35),rgba(168,85,247,0.22),rgba(34,211,238,0.2))] shadow-[0_8px_28px_rgba(0,0,0,0.35)] ring-1 ring-white/5"
          >
            <div className="flex h-full flex-col rounded-2xl border border-white/5 bg-gray-950/70 backdrop-blur-md overflow-hidden">
              <Image
                src={c.image.src}
                alt={c.image.alt}
                width={c.image.width}
                height={c.image.height}
                style={{
                  aspectRatio: c.image.ratio,
                }}
                className="w-full h-40 md:h-44 object-cover"
              />
              <div className="p-5 flex-1 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-oswald text-xl text-white">{c.title}</h3>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] font-medium text-gray-300 whitespace-nowrap">
                    {c.period}
                  </span>
                </div>
                <p className="text-gray-300/90 text-[0.98rem]/relaxed flex-1 overflow-hidden">
                  {c.blurb}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                  {c.links.map((l) => (
                    <ProjectLink key={`${c.slug}-${l.label}`} href={l.href}>
                      {l.icon}
                      {l.icon ? <>&nbsp;</> : null}
                      {l.label}
                    </ProjectLink>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
