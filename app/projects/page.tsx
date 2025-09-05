"use client";

import { PROJECTS } from "@/app/projects/project-data";
import AmbientBackground from "@/components/pages/AmbientBackground";

import usePrefersReducedMotion from "@/hooks/use-prefers-reduced-motion";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

// PROJECTS now sourced from project-data.ts

import GlassHeaderBubble from "@/components/ui/GlassHeaderBubble";
import { Icon } from "@iconify/react";

// Filters and ordering constants
const PREFERRED_FILTER_ORDER = [
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

function LinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isExternal =
    href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 transition-colors focus-ring"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 transition-colors focus-ring"
      prefetch
    >
      {children}
    </Link>
  );
}

export default function ProjectsPage() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative w-full">
      <AmbientBackground />

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full opacity-20 blur-3xl bg-[radial-gradient(closest-side,rgba(59,130,246,0.25),transparent)]" />
        <div className="absolute bottom-0 right-0 h-[26rem] w-[26rem] rounded-full opacity-15 blur-3xl bg-[radial-gradient(closest-side,rgba(168,85,247,0.25),transparent)]" />
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="space-y-5 max-w-3xl">
          {/* Glass Bubble Animation - Icon + Text Bubble */}
          <GlassHeaderBubble
            prefersReducedMotion={prefersReducedMotion}
            label="PROJECTS"
            vtClassName="vt-tag-projects"
            expandedWidthPx={200}
            icon={
              <Icon
                icon="mdi:application-brackets"
                width={28}
                height={28}
                className="text-white/90"
                aria-hidden="true"
              />
            }
          />

          <h1 className="font-oswald text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-cyan-300/90">
            Crafted Artifacts
          </h1>

          <p className="text-gray-300/85 text-base sm:text-lg max-w-[720px]">
            A curated collection of platforms, tools, and experiments—built with
            care, tuned for performance, and shaped by design.
          </p>
        </div>

        {/* Projects only */}
        <Suspense fallback={null}>
          <SkillsAndCases prefersReducedMotion={prefersReducedMotion} />
        </Suspense>
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

  // Derive filters from project skills, with preferred order first and rest alphabetical
  const filters = React.useMemo(() => {
    const set = new Set<string>();
    for (const p of PROJECTS) {
      for (const s of p.skills) set.add(s);
    }
    const rest = Array.from(set).filter((s) => !PREFERRED_FILTER_ORDER.includes(s as any));
    rest.sort((a, b) => a.localeCompare(b));
    return ["All", ...PREFERRED_FILTER_ORDER.filter((s) => set.has(s)), ...rest];
  }, []);

  const [active, setActive] = React.useState<string>(() =>
    initialFromQuery && filters.includes(initialFromQuery) ? initialFromQuery : "All",
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
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASING as any } },
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
      <span className="sr-only" aria-live="polite" role="status">{announce}</span>
      <div className="flex flex-wrap gap-2">
        {filters.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={`rounded-full px-3 py-1.5 text-xs sm:text-sm border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-blue-400/60 ${
              active === s
                ? "bg-purple-600/70 text-white border-purple-500/70"
                : "bg-white/5 text-white/90 border-white/10"
            }`}
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
                    <LinkButton key={`${c.slug}-${l.label}`} href={l.href}>
                      {l.icon}
                      {l.icon ? <>&nbsp;</> : null}
                      {l.label}
                    </LinkButton>
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
