import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import GithubButton from "@/components/pages/home/GithubButton";
import ViewProjectButton from "@/components/pages/home/ViewProjectButton";

export default function Page() {
  return (
    <section className="w-full  bg-gray-950 text-gray-50">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-gray-800 px-3 py-1 text-sm">
            Projects
          </div>
          <h2 className="text-2xl font-bold tracking-tighter text-gray-50 md:text-3xl/tight lg:text-4xl">
            Featured
          </h2>
          <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Here's a showcase of some of the projects I've worked on. Each one
            represents a unique challenge and learning experience.
          </p>
        </div>
        <Card className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
          <CardFooter className="bg-gray-900 px-8 py-6 flex flex-col flex-1 space-between">
            <div className="flex flex-1 flex-start justify-between gap-2">
              <div>
                <h3 className="text-lg text-white font-semibold mb-1">
                  Yahoo DSP
                </h3>
                <p className="text-gray-400 text-sm">
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
              <GithubButton link={null} />
              <ViewProjectButton link="https://www.advertising.yahooinc.com/our-dsp" />
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold tracking-tighter text-gray-50 md:text-3xl/tight lg:text-4xl">
          All Projects
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex-1 -p-6 max-h-60">
              <Image
                alt="Yahoo DSP"
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
            <CardFooter className="bg-gray-900 px-8 py-6 flex flex-col flex-1 space-between">
              <div className="flex flex-1 flex-start justify-between gap-2">
                <div>
                  <h3 className="text-lg text-white font-semibold mb-1">
                    Barbenheimer VS Code Theme
                  </h3>
                  <p className="text-gray-400 text-sm">
                    A VS Code theme inspired by the Internet phenomenon of the
                    same name. It combines the pink and playful aesthetics of
                    Barbie with the dark and dramatic tones of Oppenheimer.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <GithubButton link="https://github.com/jpsanantonio/barbenheimer-vscode-theme" />
                <ViewProjectButton link="https://marketplace.visualstudio.com/items?itemName=jayvicsanantonio.barbenheimer" />
              </div>
            </CardFooter>
          </Card>
          <Card className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex-1 -p-6 max-h-60">
              <Image
                alt="Yahoo DSP"
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
            <CardFooter className="bg-gray-900 px-8 py-6 flex flex-col flex-1 space-between">
              <div className="flex flex-1 flex-start justify-between gap-2">
                <div>
                  <h3 className="text-lg text-white font-semibold mb-1">
                    Malayang Mananampalataya Church
                  </h3>
                  <p className="text-gray-400 text-sm">
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
                <GithubButton link="https://github.com/nesceal/mmchurch" />
                <ViewProjectButton link="https://mmchurch.ph/" />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
