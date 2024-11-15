"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const router = useRouter();

  return (
    <section className="w-full  dark:bg-gray-950 text-gray-200">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <div className="font-oswald uppercase inline-block rounded-lg bg-gray-800 px-3 py-1">
            Blog Posts
          </div>
          <h2 className="font-oswald text-2xl font-bold tracking-tighter text-gray-950 dark:text-gray-200 md:text-3xl/tight lg:text-4xl">
            Exploring My Thought
          </h2>
          <p className="max-w-[600px] text-gray-950/70 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Welcome to my blog! Here, I delve into the exciting world of web
            development with insightful articles, tips, and behind-the-scenes
            experiences.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="space-y-8">
            <button
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg dark:bg-gray-950 text-gray-950 dark:text-gray-400 border border-transparent p-6 shadow-2xl transition bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:scale-110 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none"
              onClick={() => {
                router.push("/blog/from-ember-to-next");
              }}
            >
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-transparent w-full bg-gray-950"
                height={160}
                src="/images/blog/from-ember-to-next.png"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2 text-left">
                <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  From Ember.js to Next.js: A Tale of Two Frameworks
                </h3>
                <div className="dark:text-gray-400 flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>May 7, 2024</span>
                </div>
                <p className="dark:text-gray-300 line-clamp-3">
                  Explore the differences and surprising similarities between
                  Ember.js and Next.js, two powerful contenders in the web
                  development world.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    EmberJS
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    NextJS
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Lessons Learned
                  </Badge>
                </div>
              </div>
            </button>
            <button
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg dark:bg-gray-950 text-gray-950 dark:text-gray-400 border border-transparent p-6 shadow-2xl transition bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:scale-110 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none"
              onClick={() => {
                router.push("/blog/the-typescript-tightrope");
              }}
            >
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-transparent w-full"
                height={160}
                src="/images/blog/the-typescript-tightrope.png"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2 text-left">
                <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  The Typescript Tightrope: A Love-Hate Journey
                </h3>
                <div className="dark:text-gray-400 flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>May 4, 2024</span>
                </div>
                <p className="dark:text-gray-300 line-clamp-3">
                  My journey from TypeScript skeptic to enthusiast - how static
                  typing transformed my code and why I believe it's the future.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Web Development
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    TypeScript
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Lessons Learned
                  </Badge>
                </div>
              </div>
            </button>
            <button
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg dark:bg-gray-950 text-gray-950 dark:text-gray-400 border border-transparent p-6 shadow-2xl transition bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:scale-110 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none"
              onClick={() => {
                router.push("/blog/building-my-developer-playground");
              }}
            >
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-transparent w-full"
                height={160}
                src="/images/blog/building-my-developer-playground.png"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2 text-left">
                <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Building My Developer Playground
                </h3>
                <div className="dark:text-gray-400 flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>May 1, 2024</span>
                </div>
                <p className="dark:text-gray-300 line-clamp-3">
                  Dive into the code behind the scenes! Explore the decisions
                  and thought process behind building my personal website.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Web Development
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    NextJS
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    React
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Tailwind CSS
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    TypeScript
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Vercel
                  </Badge>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
