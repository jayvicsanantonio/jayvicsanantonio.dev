"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BlogPosts({
  blogPostsRef,
}: {
  blogPostsRef: React.RefObject<HTMLElement>;
}) {
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: blogPostsRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.section
      ref={blogPostsRef}
      id="blog"
      className="relative scroll-mt-52 h-screen"
      style={{ opacity, scale }}
    >
      <div className="mt-72 space-y-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-xl">
        <div className="flex gap-4">
          <div className="flex-1 space-y-4">
            <h2 className="font-oswald text-2xl font-bold">Blog Posts</h2>
            <p className="text-gray-400">
              Check out some of my insightful articles, tips, and
              behind-the-scenes experiences.
            </p>
          </div>
          <div className="self-end">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-lg border border-gray-700 px-6 py-3 text-sm font-medium hover:border-t-purple-500 hover:border-r-purple-500 hover:border-b-blue-400 hover:border-l-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="space-y-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg bg-gray-950 border border-gray-800 p-6 shadow-sm transition-all"
                onClick={() => {
                  router.push("/blog/from-ember-to-next");
                }}
              >
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
                <div className="space-y-2 text-left">
                  <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    From Ember.js to Next.js: A Tale of Two Frameworks
                  </h3>
                  <div className="text-gray-400 flex items-center space-x-2">
                    <Calendar size={20} />
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
              </button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg bg-gray-950 border border-gray-800 p-6 shadow-sm transition-all"
                onClick={() => {
                  router.push("/blog/the-typescript-tightrope");
                }}
              >
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
                <div className="space-y-2 text-left">
                  <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight hover:underline bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    The Typescript Tightrope: A Love-Hate Journey
                  </h3>
                  <div className="text-gray-400 flex items-center space-x-2">
                    <Calendar size={20} />
                    <span>May 4, 2024</span>
                  </div>
                  <p className="text-gray-300 line-clamp-3">
                    My journey from TypeScript skeptic to enthusiast - how
                    static typing transformed my code and why I believe it's the
                    future.
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
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
