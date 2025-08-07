import Link from 'next/link';

const projects = [
  {
    title: 'Yahoo DSP',
    description:
      'A cutting-edge programmatic advertising platform that empowers advertisers with real-time bidding, audience targeting, and comprehensive campaign performance measurement.',
    link: 'https://www.advertising.yahooinc.com/our-dsp',
  },
  {
    title: 'Barbenheimer VS Code Theme',
    description:
      'A VS Code theme inspired by the Internet phenomenon, combining the playful aesthetics of Barbie with the dramatic tones of Oppenheimer.',
    link: 'https://marketplace.visualstudio.com/items?itemName=jayvicsanantonio.barbenheimer',
  },
];

export default function FeaturedProjects({
  featuredProjectsRef,
}: {
  featuredProjectsRef: React.RefObject<HTMLElement>;
}) {
  return (
    <section
      ref={featuredProjectsRef}
      id="projects"
      className="max-w-3xl mx-auto py-24 px-8 fade-in-section"
    >
      <h2 className="font-serif text-5xl md:text-6xl font-bold text-center mb-16">
        Selected Works
      </h2>
      <ol className="space-y-12">
        {projects.map((project, index) => (
          <li key={project.title}>
            <Link href={project.link} target="_blank" rel="noopener noreferrer" className="block group">
              <div className="flex items-baseline space-x-4">
                <span className="text-primary font-serif text-2xl">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="border-t border-border flex-grow mt-3"></div>
              </div>
              <h3 className="font-serif text-4xl md:text-5xl font-bold mt-4 group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              <p className="font-sans text-lg md:text-xl mt-4 max-w-2xl">
                {project.description}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
