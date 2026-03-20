import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PROJECTS } from "@/app/projects/projects.data";
import type { Project } from "@/app/projects/types";
import { SITE_URL, toAbsoluteUrl } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const getProjectBySlug = (slug: string): Project | undefined =>
  PROJECTS.find((project) => project.slug === slug);

const buildProjectUrl = (slug: string): `/${string}` => `/projects/${slug}`;

const getRelatedProjects = (project: Project): Project[] =>
  PROJECTS.filter((candidate) => candidate.slug !== project.slug)
    .map((candidate) => ({
      project: candidate,
      sharedSkillCount: candidate.skills.filter((skill) => project.skills.includes(skill)).length,
    }))
    .sort(
      (a, b) =>
        b.sharedSkillCount - a.sharedSkillCount || a.project.title.localeCompare(b.project.title),
    )
    .slice(0, 3)
    .map(({ project: relatedProject }) => relatedProject);

export const generateStaticParams = () => PROJECTS.map((project) => ({ slug: project.slug }));

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const path = buildProjectUrl(project.slug);
  const canonical = toAbsoluteUrl(path);
  const title = `${project.title} | Projects | Jayvic San Antonio`;
  const description = project.blurb;
  const ogImage = toAbsoluteUrl(project.image.src as `/${string}`);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Jayvic San Antonio",
      type: "article",
      images: [
        {
          url: ogImage,
          width: project.image.width,
          height: project.image.height,
          alt: project.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="cq container pt-40 pb-16 sm:pt-44">
        <Link
          href="/projects"
          className="inline-flex items-center rounded-full border border-white/20 bg-slate-900/80 px-4 py-2 text-xs tracking-[0.12em] text-gray-200 uppercase transition-colors hover:border-white/35 hover:bg-slate-900/95"
        >
          Back to projects
        </Link>

        <article className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/85">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          </div>

          <div className="space-y-8 p-6 sm:p-10">
            <header className="space-y-4">
              <p className="text-xs tracking-[0.2em] text-cyan-300 uppercase">{project.period}</p>
              <h1 className="font-oswald text-4xl text-white sm:text-5xl">{project.title}</h1>
              <p className="max-w-3xl text-base leading-relaxed text-gray-300">{project.blurb}</p>
            </header>

            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span
                  key={`${project.slug}-${skill}`}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>

            <section className="space-y-3">
              <h2 className="font-oswald text-2xl text-white">Highlights</h2>
              <ul className="grid gap-2 text-gray-200 sm:grid-cols-2">
                {project.metrics.map((metric) => (
                  <li
                    key={`${project.slug}-${metric}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    {metric}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              {project.sections.map((section) => (
                <div key={`${project.slug}-${section.label}`} className="space-y-2">
                  <h2 className="font-oswald text-2xl text-white">{section.label}</h2>
                  <p className="text-base leading-relaxed text-gray-300">{section.content}</p>
                </div>
              ))}
            </section>

            <section className="space-y-3">
              <h2 className="font-oswald text-2xl text-white">Links</h2>
              <div className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <Link
                    key={`${project.slug}-${link.label}`}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-slate-900/85 px-4 text-sm text-white/90 transition-colors hover:border-white/35 hover:bg-slate-900/95"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-oswald text-2xl text-white">Continue Exploring</h2>
              <p className="max-w-3xl text-base leading-relaxed text-gray-300">
                Keep moving through the site with the full{" "}
                <Link
                  href="/projects"
                  className="text-cyan-200 underline underline-offset-4 transition-colors hover:text-cyan-100"
                >
                  project case study archive
                </Link>
                , the{" "}
                <Link
                  href="/work"
                  className="text-cyan-200 underline underline-offset-4 transition-colors hover:text-cyan-100"
                >
                  professional experience timeline
                </Link>
                , or the{" "}
                <Link
                  href="/"
                  className="text-cyan-200 underline underline-offset-4 transition-colors hover:text-cyan-100"
                >
                  homepage overview
                </Link>
                .
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                {relatedProjects.map((relatedProject) => (
                  <Link
                    key={relatedProject.slug}
                    href={buildProjectUrl(relatedProject.slug)}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-cyan-300/40 hover:bg-white/[0.05]"
                  >
                    <p className="font-oswald text-xl text-white">{relatedProject.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-300">
                      {relatedProject.blurb}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
