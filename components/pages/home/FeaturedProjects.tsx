import Link from 'next/link';
import Image from 'next/image';
import { Github } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CardContent, CardFooter, Card } from '@/components/ui/card';
import ProjectButton from '@/components/pages/ProjectButton';

export default function FeaturedProjects({
  featuredProjectsRef,
}: {
  featuredProjectsRef: React.RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: featuredProjectsRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1, 0.95]
  );

  return (
    <motion.section
      ref={featuredProjectsRef as React.RefObject<HTMLElement>}
      id="projects"
      className="relative scroll-mt-52 min-h-screen"
      style={{ scale }}
    >
      <div className="space-y-12 bg-linear-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-xl text-gray-950 dark:text-gray-200">
        <div className="flex gap-4">
          <div className="flex-1 space-y-4">
            <h2 className="font-oswald text-2xl font-bold">
              Featured Projects
            </h2>
            <p className="dark:text-gray-400">
              Check out some of my recent projects that showcase my
              expertise in web development.
            </p>
          </div>
          <div className="self-end">
            <Link
              href="/projects"
              aria-label="View all projects"
              className="inline-flex items-center justify-center rounded-lg border border-gray-700 px-6 py-3 text-sm font-medium hover:border-t-purple-500 hover:border-r-purple-500 hover:border-b-blue-400 hover:border-l-blue-400 focus:outline-hidden focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-600 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="will-change-transform"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="flex flex-col h-full shadow-2xl  rounded-lg overflow-hidden">
              <CardContent className="flex-1 -p-6 max-h-60 rounded-t-lg overflow-hidden">
                <Image
                  alt="Yahoo DSP - Programmatic advertising platform interface showing campaign dashboard"
                  className="w-full h-full object-cover"
                  height={225}
                  src="/images/home/yahoo-dsp.webp"
                  style={{
                    aspectRatio: '400/225',
                    objectFit: 'cover',
                  }}
                  width={400}
                />
              </CardContent>
              <CardFooter className="dark:bg-gray-950 text-gray-950 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
                <div className="flex flex-1 flex-start justify-between gap-2">
                  <div className="space-y-2">
                    <h3 className="font-oswald bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight mb-1">
                      Yahoo DSP
                    </h3>
                    <p className="dark:text-gray-200 ">
                      A cutting-edge programmatic advertising platform
                      for businesses. Built with a powerful tech stack
                      including{' '}
                      <em className="font-bold">Ember.js</em>,{' '}
                      <em className="font-bold">React.js</em>, and{' '}
                      <em className="font-bold">Node.js</em>, the
                      platform empowers advertisers with features like
                      real-time bidding, audience targeting, and
                      comprehensive campaign performance measurement.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <ProjectButton link={null}>
                    <Github size={20} />
                    Github
                  </ProjectButton>
                  <ProjectButton link="https://www.advertising.yahooinc.com/our-dsp">
                    View Project
                  </ProjectButton>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
          <motion.div
            className="will-change-transform"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="flex flex-col h-full shadow-2xl  rounded-lg overflow-hidden">
              <CardContent className="flex-1 -p-6 max-h-60 rounded-t-lg overflow-hidden">
                <Image
                  alt="Barbenheimer VS Code Theme"
                  className="w-full h-full object-cover"
                  height={225}
                  src="/images/home/barbenheimer.webp"
                  style={{
                    aspectRatio: '400/225',
                    objectFit: 'cover',
                  }}
                  width={400}
                />
              </CardContent>
              <CardFooter className="dark:bg-gray-950 text-gray-950 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
                <div className="flex flex-1 flex-start justify-between gap-2">
                  <div className="space-y-2">
                    <h3 className="font-oswald bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight mb-1">
                      Barbenheimer VS Code Theme
                    </h3>
                    <p className="dark:text-gray-200">
                      A VS Code theme inspired by the Internet
                      phenomenon of the same name. It combines the
                      pink and playful aesthetics of Barbie with the
                      dark and dramatic tones of Oppenheimer.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <ProjectButton link="https://github.com/jpsanantonio/barbenheimer-vscode-theme">
                    <Github size={20} />
                    Github
                  </ProjectButton>
                  <ProjectButton link="https://marketplace.visualstudio.com/items?itemName=jayvicsanantonio.barbenheimer">
                    View Project
                  </ProjectButton>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
