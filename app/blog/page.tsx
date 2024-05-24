import Link from "next/link";
import Image from "next/image";
import CalendarIcon from "@/components/icons/calendar";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <section className="w-full  bg-gray-950 text-gray-200">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <div className="font-oswald uppercase inline-block rounded-lg bg-gray-800 px-3 py-1">
            Blog Posts
          </div>
          <h2 className="font-oswald text-2xl font-bold tracking-tighter text-gray-200 md:text-3xl/tight lg:text-4xl">
            Exploring My Thought
          </h2>
          <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Welcome to my blog! Here, I delve into the exciting world of web
            development with insightful articles, tips, and behind-the-scenes
            experiences.
          </p>
        </div>
        <div className="flex flex-col gap-8 py-12  bg-gray-950 text-gray-200">
          <div className="space-y-8">
            <article className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg border border-gray-800 p-6 shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-gray-800 w-full"
                height={160}
                src="/images/blog/from-ember-to-next.png"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2">
                <Link
                  className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight hover:underline hover:text-violet-600"
                  href="/blog/from-ember-to-next"
                >
                  From Ember.js to Next.js: A Tale of Two Frameworks
                </Link>
                <div className="text-gray-400 flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>May 7, 2024</span>
                </div>
                <p className="text-gray-300 line-clamp-3">
                  Explore the differences and surprising similarities between
                  Ember.js and Next.js, two powerful contenders in the web
                  development world.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge className="text-sm" variant="secondary">
                    EmberJS
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    NextJS
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    Lessons Learned
                  </Badge>
                </div>
              </div>
            </article>
            <article className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg border border-gray-800 p-6 shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-gray-800 w-full"
                height={160}
                src="/images/blog/the-typescript-tightrope.png"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2">
                <Link
                  className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight hover:underline hover:text-violet-600"
                  href="/blog/the-typescript-tightrope"
                >
                  The Typescript Tightrope: A Love-Hate Journey
                </Link>
                <div className="text-gray-400 flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>May 4, 2024</span>
                </div>
                <p className="text-gray-300 line-clamp-3">
                  My journey from TypeScript skeptic to enthusiast - how static
                  typing transformed my code and why I believe it's the future.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge className="text-sm" variant="secondary">
                    Web Development
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    TypeScript
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    Lessons Learned
                  </Badge>
                </div>
              </div>
            </article>
            <article className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg border border-gray-800 p-6 shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-gray-800 w-full"
                height={160}
                src="/images/blog/building-my-developer-playground.png"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2">
                <Link
                  className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight hover:underline hover:text-violet-600"
                  href="/blog/building-my-developer-playground"
                >
                  Building My Developer Playground
                </Link>
                <div className="text-gray-400 flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>May 1, 2024</span>
                </div>
                <p className="text-gray-300 line-clamp-3">
                  Dive into the code behind the scenes! Explore the decisions
                  and thought process behind building my personal website.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge className="text-sm" variant="secondary">
                    Web Development
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    NextJS
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    React
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    Tailwind CSS
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    TypeScript
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    Vercel
                  </Badge>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
