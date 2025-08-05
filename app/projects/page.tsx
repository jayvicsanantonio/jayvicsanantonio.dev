import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import ProjectButton from '@/components/pages/ProjectButton';
import { Github } from 'lucide-react';

export default function Page() {
  return (
    <section className="w-full  dark:bg-gray-950 dark:text-gray-200">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <div className="font-oswald uppercase inline-block rounded-lg bg-gray-800 px-3 py-1">
            Featured Projects
          </div>
          <h2 className="font-oswald text-2xl font-bold tracking-tighter text-gray-950 dark:text-gray-200 md:text-3xl/tight lg:text-4xl">
            Work Showcase
          </h2>
          <p className="max-w-[600px] text-gray-950/70 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Here's a showcase of some of the projects I've worked on.
            Each one represents a unique challenge and learning
            experience.
          </p>
        </div>
        <Card className="flex flex-col h-full border-transparent rounded-lg overflow-hidden shadow-md hover:scale-105 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none will-change-transform">
          <CardContent className="flex-1 -p-6">
            <Image
              alt="Yahoo DSP"
              className="w-full h-full object-cover"
              height={125}
              src="/images/home/yahoo-dsp.webp"
              style={{
                aspectRatio: '400/125',
                objectFit: 'cover',
              }}
              width={400}
            />
          </CardContent>
          <CardFooter className="bg-white dark:bg-gray-950 bg-linear-to-r from-blue-500/10 to-purple-500/10 text-gray-2000 text-950 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
            <div className="flex flex-1 flex-start justify-between gap-2">
              <div className="space-y-2">
                <h3 className="font-oswald bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight mb-1">
                  Yahoo DSP
                </h3>
                <p className="dark:text-gray-200">
                  A cutting-edge programmatic advertising platform for
                  businesses. Built with a powerful tech stack
                  including <em className="font-bold">Ember.js</em>,{' '}
                  <em className="font-bold">React.js</em>, and{' '}
                  <em className="font-bold">Node.js</em>, the platform
                  empowers advertisers with features like real-time
                  bidding, audience targeting, and comprehensive
                  campaign performance measurement.
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <ProjectButton link="https://www.advertising.yahooinc.com/our-dsp">
                View Project
              </ProjectButton>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="mt-16 space-y-8">
        <h2 className="font-oswald text-2xl font-bold tracking-tighter text-gray-950 dark:text-gray-200 md:text-3xl/tight lg:text-4xl">
          All Projects
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="flex flex-col h-full border-transparent rounded-lg overflow-hidden shadow-md hover:scale-105 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none will-change-transform">
            <CardContent className="flex-1 -p-6 max-h-60">
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
            <CardFooter className="dark:bg-gray-950 bg-linear-to-r from-blue-500/10 to-purple-500/10 text-gray-950 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
              <div className="flex flex-1 flex-start justify-between gap-2">
                <div className="space-y-2">
                  <h3 className="font-oswald bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight mb-1">
                    Barbenheimer VS Code Theme
                  </h3>
                  <p className="dark:text-gray-200">
                    A VS Code theme inspired by the Internet
                    phenomenon of the same name. It combines the pink
                    and playful aesthetics of Barbie with the dark and
                    dramatic tones of Oppenheimer.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <ProjectButton link="https://github.com/jayvicsanantonio/barbenheimer-vscode-theme">
                  <Github size={20} />
                  Github
                </ProjectButton>
                <ProjectButton link="https://marketplace.visualstudio.com/items?itemName=jayvicsanantonio.barbenheimer">
                  View Project
                </ProjectButton>
              </div>
            </CardFooter>
          </Card>
          <Card className="flex flex-col h-full border-transparent rounded-lg overflow-hidden shadow-md hover:scale-105 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none will-change-transform">
            <CardContent className="flex-1 -p-6 max-h-60">
              <Image
                alt="Web Development Hub"
                className="w-full h-full object-cover"
                height={225}
                src="/images/home/webdevhub.png"
                style={{
                  aspectRatio: '400/225',
                  objectFit: 'cover',
                }}
                width={400}
              />
            </CardContent>
            <CardFooter className="dark:bg-gray-950 bg-linear-to-r from-blue-500/10 to-purple-500/10 text-gray-950 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
              <div className="flex flex-1 flex-start justify-between gap-2">
                <div className="space-y-2">
                  <h3 className="font-oswald bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight mb-1">
                    Web Development Hub
                  </h3>
                  <p className="dark:text-gray-200">
                    An extensive library of categorized links tailored
                    for web developers, featuring curated resources on
                    learning, developer tools, frameworks, libraries,
                    blogs and communities.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <ProjectButton link="https://github.com/jayvicsanantonio/web-development-hub">
                  <Github size={20} />
                  Github
                </ProjectButton>
                <ProjectButton link="https://webdevhub.link/">
                  View Project
                </ProjectButton>
              </div>
            </CardFooter>
          </Card>
          <Card className="flex flex-col h-full border-transparent rounded-lg overflow-hidden shadow-md hover:scale-105 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none will-change-transform">
            <CardContent className="flex-1 -p-6 max-h-60">
              <Image
                alt="Malayang Mananampalataya Church"
                className="w-full h-full object-cover"
                height={225}
                src="/images/home/mm-church.webp"
                style={{
                  aspectRatio: '400/225',
                  objectFit: 'cover',
                }}
                width={400}
              />
            </CardContent>
            <CardFooter className="dark:bg-gray-950 bg-linear-to-r from-blue-500/10 to-purple-500/10 text-gray-950 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
              <div className="flex flex-1 flex-start justify-between gap-2">
                <div className="space-y-2">
                  <h3 className="font-oswald bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight mb-1">
                    Malayang Mananampalataya Church
                  </h3>
                  <p className="dark:text-gray-200">
                    Built with React.js, this Philippines church
                    website fosters a strong connection between the
                    church and its congregation. Easy navigation
                    allows users to explore sermons, ministries, and
                    events. Responsive design ensures the website
                    looks great and is accessible across desktops,
                    tablets, and smartphones.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <ProjectButton link="https://github.com/nesceal/mmchurch">
                  <Github size={20} />
                  Github
                </ProjectButton>
                <ProjectButton link="https://mmchurch.ph/">
                  View Project
                </ProjectButton>
              </div>
            </CardFooter>
          </Card>
          <Card className="flex flex-col h-full border-transparent rounded-lg overflow-hidden shadow-md hover:scale-105 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none will-change-transform">
            <CardContent className="flex-1 -p-6 max-h-60">
              <Image
                alt="Barbenheimer VS Code Theme"
                className="w-full h-full object-cover"
                height={225}
                src="/images/projects/barbenheimer-zed-theme.webp"
                style={{
                  aspectRatio: '400/225',
                  objectFit: 'cover',
                }}
                width={400}
              />
            </CardContent>
            <CardFooter className="dark:bg-gray-950 bg-linear-to-r from-blue-500/10 to-purple-500/10 text-gray-950 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
              <div className="flex flex-1 flex-start justify-between gap-2">
                <div className="space-y-2">
                  <h3 className="font-oswald bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight mb-1">
                    Barbenheimer Zed Theme
                  </h3>
                  <p className="dark:text-gray-200">
                    A zed theme inspired by the "Barbenheimer"
                    cultural phenomenon, offering distinct styles that
                    capture the essence of both Barbie and
                    Oppenheimer. While each theme leans towards a
                    different aesthetic, they share a cohesive color
                    palette with subtle nods to both films, creating a
                    balanced and unified experience.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <ProjectButton link="https://github.com/jayvicsanantonio/barbenheimer-zed-theme">
                  <Github size={20} />
                  Github
                </ProjectButton>
                <ProjectButton link="https://zed.dev/extensions?query=Barbenheimer">
                  View Project
                </ProjectButton>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
