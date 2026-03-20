"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { PROJECTS } from "@/app/projects/projects.data";

import { CARD_INNER_BASE, CARD_OUTER_BASE } from "@/components/styles/card-styles";
import ProjectLink from "./ProjectLink";

const SKILL_FILTERS = [
  "All",
  "Enterprise",
  "Startup",
  "Hobby",
  // "Client",
  "Open Source",
  "Sandboxes",
] as const;

const PRIORITY_ORDER = [
  "yahoo-dsp",
  "collectiq",
  "reflexa-ai",
  "ai-humanity-passport",
  "tracknstick",
  "webdevhub",
  "ai-inbox-briefer",
  "sync-flow",
  "barbenheimer-vscode-theme",
  "barbenheimer-zed-theme",
  "ember-upgrade-guide",
];

const FILTER_BUTTON_CLASS =
  "relative inline-flex min-h-11 items-center rounded-full border px-3 py-2 text-xs sm:text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

const FILTER_BUTTON_ACTIVE =
  "border-cyan-400/60 bg-cyan-950/85 text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)]";

const FILTER_BUTTON_IDLE =
  "border-white/20 bg-slate-900/80 text-white/80 hover:border-white/35 hover:bg-slate-900/90";

const PROJECT_CARD_IMAGE_SIZES =
  "(min-width: 1400px) 387px, (min-width: 1024px) calc((100vw - 9rem) / 3), (min-width: 768px) calc((100vw - 6rem) / 2), calc(100vw - 2rem)";

import { cn } from "@/lib/class-names";

function FadeInImage({ alt, ...props }: React.ComponentProps<typeof Image>) {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <Image
      alt={alt}
      {...props}
      className={cn(
        props.className,
        "transition-opacity duration-500",
        isLoading ? "opacity-0" : "opacity-100",
      )}
      onLoad={(e) => {
        setIsLoading(false);
        props.onLoad?.(e);
      }}
    />
  );
}

type SkillsAndCasesProps = {
  initialFilter?: string | undefined;
};

export default function SkillsAndCases({ initialFilter }: SkillsAndCasesProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Fixed, curated filters
  const [active, setActive] = React.useState<string>(() =>
    initialFilter && (SKILL_FILTERS as readonly string[]).includes(initialFilter)
      ? (initialFilter as (typeof SKILL_FILTERS)[number])
      : "All",
  );

  // Announce filter changes for screen readers
  const [announce, setAnnounce] = React.useState<string>("");

  // Keep URL query param in sync with active filter (replace to avoid history spam)
  const handleFilterChange = (newFilter: string) => {
    setActive(newFilter);
    setAnnounce(`Filter: ${newFilter}`);

    const params = new URLSearchParams(window.location.search);
    if (newFilter === "All") {
      params.delete("skill");
      params.delete("filter");
    } else {
      params.set("skill", newFilter);
    }
    const qs = params.toString();
    const currentQuery = window.location.search.startsWith("?")
      ? window.location.search.slice(1)
      : window.location.search;
    if (qs !== currentQuery) {
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }
  };

  const visible = React.useMemo(() => {
    const filtered = PROJECTS.filter((c) => active === "All" || c.skills.includes(active));
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
      {/* SR announcement for filter changes */}
      <output className="sr-only" aria-live="polite">
        {announce}
      </output>
      <div>
        <div className="flex flex-wrap gap-2">
          {SKILL_FILTERS.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => handleFilterChange(s)}
              className={`${FILTER_BUTTON_CLASS} ${
                active === s ? FILTER_BUTTON_ACTIVE : FILTER_BUTTON_IDLE
              }`}
              aria-pressed={active === s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Projects grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((c, i) => (
          <article key={c.slug} className={`${CARD_OUTER_BASE} min-h-[360px] md:min-h-[430px]`}>
            <div
              className={`${CARD_INNER_BASE} [@container(min-width:36rem)]:grid [@container(min-width:36rem)]:grid-cols-[minmax(0,1fr),1.5fr] [@container(min-width:36rem)]:gap-0`}
            >
              <div className="relative h-36 w-full overflow-hidden md:h-44 [@container(min-width:28rem)]:h-48 [@container(min-width:36rem)]:h-full">
                <Link
                  href={`/projects/${c.slug}`}
                  aria-label={`Read the ${c.title} project case study`}
                  className="block h-full w-full"
                >
                  <FadeInImage
                    src={c.image.src}
                    alt={c.image.alt}
                    width={c.image.width}
                    height={c.image.height}
                    style={{ aspectRatio: c.image.ratio }}
                    className="h-full w-full object-cover"
                    priority={i === 0}
                    sizes={PROJECT_CARD_IMAGE_SIZES}
                  />
                </Link>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-oswald text-xl text-white">
                    <Link
                      href={`/projects/${c.slug}`}
                      aria-label={`Read the ${c.title} project case study`}
                      className="transition-colors hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                    >
                      {c.title}
                    </Link>
                  </h3>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium tracking-[0.12em] whitespace-nowrap text-gray-300 uppercase">
                    {c.period}
                  </span>
                </div>
                <p className="hyphenate flex-1 overflow-hidden text-[0.98rem]/relaxed text-gray-300/90">
                  {c.blurb}
                </p>
                <p className="text-sm text-cyan-100/75">
                  Dedicated case study with project context, technical decisions, and outcomes.
                </p>

                <div className="mt-auto space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <ProjectLink href={`/projects/${c.slug}`}>
                      Read {c.title} case study
                    </ProjectLink>
                  </div>
                  {c.links.length ? (
                    <div className="space-y-2">
                      <p className="text-xs tracking-[0.16em] text-gray-500 uppercase">
                        External resources
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {c.links.map((l) => {
                          let icon: React.ReactNode = null;
                          switch (l.icon) {
                            case "github":
                              icon = <Icon icon="mdi:github" width={18} height={18} />;
                              break;
                            case "watch":
                              icon = <Icon icon="mdi:play" width={16} height={16} />;
                              break;
                            case "marketplace":
                            case "external":
                            case "view":
                              icon = <Icon icon="mdi:open-in-new" width={16} height={16} />;
                              break;
                            default:
                              icon = null;
                          }
                          return (
                            <ProjectLink key={`${c.slug}-${l.label}`} href={l.href}>
                              {icon}
                              {icon ? <>&nbsp;</> : null}
                              {l.label}
                            </ProjectLink>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
