import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ProjectButton from "@/components/pages/ProjectButton";
import GithubIcon from "@/components/icons/github";

export default function Page() {
  return (
    <section className="w-full  bg-gray-950 text-gray-200">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <div className="font-oswald uppercase inline-block rounded-lg bg-gray-800 px-3 py-1">
            Featured Projects
          </div>
          <h2 className="font-oswald text-2xl font-bold tracking-tighter text-gray-200 md:text-3xl/tight lg:text-4xl">
            Work Showcase
          </h2>
          <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Here's a showcase of some of the projects I've worked on. Each one
            represents a unique challenge and learning experience.
          </p>
        </div>
        <Card className="flex flex-col h-full border-gray-800 bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
          <CardContent className="flex-1 -p-6 max-h-60">
            <Image
              alt="Yahoo DSP"
              className="w-full h-full object-cover"
              height={125}
              src="/images/home/yahoo-dsp.png"
              style={{
                aspectRatio: "400/125",
                objectFit: "cover",
              }}
              width={400}
            />
          </CardContent>
          <CardFooter className="bg-gray-950 text-gray-2000 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
            <div className="flex flex-1 flex-start justify-between gap-2">
              <div className="space-y-2">
                <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight mb-1">
                  Yahoo DSP
                </h3>
                <p className="text-gray-200">
                  A cutting-edge programmatic advertising platform for
                  businesses. Built with a powerful tech stack including{" "}
                  <em className="font-bold">Ember.js</em>,{" "}
                  <em className="font-bold">React.js</em>, and{" "}
                  <em className="font-bold">Node.js</em>, the platform empowers
                  advertisers with features like real-time bidding, audience
                  targeting, and comprehensive campaign performance measurement.
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <ProjectButton link={null}>
                <GithubIcon className="w-5 h-5" />
                Github
              </ProjectButton>
              <ProjectButton link="https://www.advertising.yahooinc.com/our-dsp">
                View Project
              </ProjectButton>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="mt-16 space-y-8">
        <h2 className="font-oswald text-2xl font-bold tracking-tighter text-gray-200 md:text-3xl/tight lg:text-4xl">
          All Projects
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="flex flex-col h-full border-gray-800 bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
            <CardContent className="flex-1 -p-6 max-h-60">
              <Image
                alt="Barbenheimer VS Code Theme"
                className="w-full h-full object-cover"
                height={225}
                src="/images/home/barbenheimer.png"
                style={{
                  aspectRatio: "400/225",
                  objectFit: "cover",
                }}
                width={400}
              />
            </CardContent>
            <CardFooter className="bg-gray-950 text-gray-2000 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
              <div className="flex flex-1 flex-start justify-between gap-2">
                <div className="space-y-2">
                  <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight mb-1">
                    Barbenheimer VS Code Theme
                  </h3>
                  <p className="text-gray-200">
                    A VS Code theme inspired by the Internet phenomenon of the
                    same name. It combines the pink and playful aesthetics of
                    Barbie with the dark and dramatic tones of Oppenheimer.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <ProjectButton link="https://github.com/jpsanantonio/barbenheimer-vscode-theme">
                  <GithubIcon className="w-5 h-5" />
                  Github
                </ProjectButton>
                <ProjectButton link="https://marketplace.visualstudio.com/items?itemName=jayvicsanantonio.barbenheimer">
                  View Project
                </ProjectButton>
              </div>
            </CardFooter>
          </Card>
          <Card className="flex flex-col h-full border-gray-800 bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
            <CardContent className="flex-1 -p-6 max-h-60">
              <Image
                alt="Web Development Hub"
                className="w-full h-full object-cover"
                height={225}
                src="/images/home/webdevhub.png"
                style={{
                  aspectRatio: "400/225",
                  objectFit: "cover",
                }}
                width={400}
              />
            </CardContent>
            <CardFooter className="bg-gray-950 text-gray-2000 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
              <div className="flex flex-1 flex-start justify-between gap-2">
                <div className="space-y-2">
                  <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight mb-1">
                    Web Development Hub
                  </h3>
                  <p className="text-gray-200">
                    An extensive library of categorized links tailored for web
                    developers, featuring curated resources on learning,
                    developer tools, frameworks, libraries, blogs and
                    communities.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <ProjectButton link="https://github.com/jpsanantonio/web-development-hub">
                  <GithubIcon className="w-5 h-5" />
                  Github
                </ProjectButton>
                <ProjectButton link="https://www.webdevhub.link/">
                  View Project
                </ProjectButton>
              </div>
            </CardFooter>
          </Card>
          <Card className="flex flex-col h-full border-gray-800 bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
            <CardContent className="flex-1 -p-6 max-h-60">
              <Image
                alt="Malayang Mananampalataya Church"
                className="w-full h-full object-cover"
                height={225}
                src="/images/home/mm-church.png"
                style={{
                  aspectRatio: "400/225",
                  objectFit: "cover",
                }}
                width={400}
              />
            </CardContent>
            <CardFooter className="bg-gray-950 text-gray-2000 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
              <div className="flex flex-1 flex-start justify-between gap-2">
                <div className="space-y-2">
                  <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight mb-1">
                    Malayang Mananampalataya Church
                  </h3>
                  <p className="text-gray-200">
                    Built with React.js, this Philippines church website fosters
                    a strong connection between the church and its congregation.
                    Easy navigation allows users to explore sermons, ministries,
                    and events. Responsive design ensures the website looks
                    great and is accessible across desktops, tablets, and
                    smartphones.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <ProjectButton link="https://github.com/nesceal/mmchurch">
                  <GithubIcon className="w-5 h-5" />
                  Github
                </ProjectButton>
                <ProjectButton link="https://mmchurch.ph/">
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
