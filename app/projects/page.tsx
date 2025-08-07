import { motion } from 'framer-motion';
import Link from 'next/link';

const allProjects = [
  {
    title: 'Yahoo DSP',
    description: 'A cutting-edge programmatic advertising platform for businesses.',
    link: 'https://www.advertising.yahooinc.com/our-dsp',
    source: null,
  },
  {
    title: 'Barbenheimer VS Code Theme',
    description: 'A VS Code theme inspired by the Internet phenomenon.',
    link: 'https://marketplace.visualstudio.com/items?itemName=jayvicsanantonio.barbenheimer',
    source: 'https://github.com/jayvicsanantonio/barbenheimer-vscode-theme',
  },
  {
    title: 'Web Development Hub',
    description: 'An extensive library of categorized links tailored for web developers.',
    link: 'https://webdevhub.link/',
    source: 'https://github.com/jayvicsanantonio/web-development-hub',
  },
  {
    title: 'Barbenheimer Zed Theme',
    description: 'A Zed theme inspired by the cultural phenomenon.',
    link: 'https://zed.dev/extensions?query=Barbenheimer',
    source: 'https://github.com/jayvicsanantonio/barbenheimer-zed-theme',
  },
  {
    title: 'SyncFlow',
    description: 'A real-time task synchronization service for Apple Reminders and Google Tasks.',
    link: 'https://sync-flow-nine.vercel.app/',
    source: 'https://github.com/jayvicsanantonio/sync-flow',
  },
  {
    title: 'Malayang Mananampalataya Church',
    description: 'A church website built with React.js to foster a strong connection with its congregation.',
    link: 'https://mmchurch.ph/',
    source: 'https://github.com/nesceal/mmchurch',
  },
];

export default function Page() {
  return (
    <section
      className="max-w-4xl mx-auto py-24 px-8 fade-in-section"
    >
      <div className="text-center mb-16">
        <h1 className="font-serif text-6xl md:text-8xl font-bold">
          Projects
        </h1>
        <p className="font-sans text-xl md:text-2xl mt-4 text-primary">
          A collection of my work.
        </p>
      </div>

      <div className="space-y-12">
        {allProjects.map((project) => (
          <div key={project.title} className="border-b border-border pb-8">
            <h2 className="font-serif text-4xl font-bold">{project.title}</h2>
            <p className="font-sans text-lg mt-2 mb-4">{project.description}</p>
            <div className="flex space-x-6 font-sans">
              <Link href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">
                View Project
              </Link>
              {project.source && (
                <Link href={project.source} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">
                  View Source
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
