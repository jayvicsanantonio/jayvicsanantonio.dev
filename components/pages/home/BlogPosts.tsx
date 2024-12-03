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
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.section
      ref={blogPostsRef}
      id="blog"
      className="relative scroll-mt-52 min-h-screen"
      style={{ opacity, scale }}
    >
      <div className="space-y-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-xl text-gray-950 dark:text-gray-200">
        <div className="flex gap-4">
          <div className="flex-1 space-y-4">
            <h2
              className="font-oswald text-2xl font-bold"
              id="blog-posts-heading"
            >
              Blog Posts
            </h2>
            <p className="dark:text-gray-400">
              Check out some of my insightful articles, tips, and
              behind-the-scenes experiences.
            </p>
          </div>
          <div className="self-end">
            <Link
              href="/blog"
              aria-label="View all blog posts"
              className="inline-flex items-center justify-center rounded-lg border border-gray-700 px-6 py-3 text-sm font-medium hover:border-t-purple-500 hover:border-r-purple-500 hover:border-b-blue-400 hover:border-l-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-600  dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950 "
            >
              View All
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="space-y-8">
            <motion.div
              className="will-change-transform"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg dark:bg-gray-950 bg-white border border-transparent shadow-2xl p-6"
                onClick={() => {
                  router.push(
                    "/blog/my-coding-christmas-four-advent-calendars"
                  );
                }}
              >
                <Image
                  alt="Blog Post Image"
                  className="rounded-lg object-cover w-full bg-gray-950"
                  height={160}
                  src="/images/blog/advent-calendars.webp"
                  style={{
                    aspectRatio: "200/160",
                    objectFit: "cover",
                  }}
                  width={200}
                />
                <div className="space-y-2 text-left">
                  <h3 className="font-oswald dark:text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    My Coding Christmas: Four Advent Calendars!
                  </h3>
                  <div className="dark:text-gray-400 flex items-center space-x-2">
                    <Calendar size={20} />
                    <span>December 2, 2024</span>
                  </div>
                  <p className="dark:text-gray-300 line-clamp-3">
                    This December, I'm diving into four coding Advent calendars
                    to learn more about HTML, CSS, Svelte, and TypeScript.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge
                      className="text-sm bg-gray-200 dark:bg-gray-800"
                      variant="secondary"
                    >
                      Others
                    </Badge>
                  </div>
                </div>
              </button>
            </motion.div>
            <motion.div
              className="will-change-transform"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg dark:bg-gray-950 bg-white border border-transparent shadow-2xl p-6"
                onClick={() => {
                  router.push("/blog/own-your-bluesky-identity");
                }}
              >
                <Image
                  alt="Blog Post Image"
                  className="rounded-lg object-cover w-full bg-gray-950"
                  height={160}
                  src="/images/blog/account-change-handle-bluesky.png"
                  style={{
                    aspectRatio: "200/160",
                    objectFit: "cover",
                  }}
                  width={200}
                />
                <div className="space-y-2 text-left">
                  <h3 className="font-oswald dark:text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Own Your Bluesky Identity
                  </h3>
                  <div className="dark:text-gray-400 flex items-center space-x-2">
                    <Calendar size={20} />
                    <span>November 23, 2024</span>
                  </div>
                  <p className="dark:text-gray-300 line-clamp-3">
                    Ditch the default ".bsky.social" and claim your own domain
                    as your Bluesky username! This easy guide shows you how to
                    get verified and own your online identity.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge
                      className="text-sm bg-gray-200 dark:bg-gray-800"
                      variant="secondary"
                    >
                      Others
                    </Badge>
                  </div>
                </div>
              </button>
            </motion.div>
            <motion.div
              className="will-change-transform"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg dark:bg-gray-950 bg-white border border-transparent shadow-2xl p-6"
                onClick={() => {
                  router.push("/blog/goodbye-twitter-x-hello-bluesky");
                }}
              >
                <Image
                  alt="Blog Post Image"
                  className="rounded-lg object-cover w-full bg-gray-950"
                  height={160}
                  src="/images/blog/goodbye-twitter-x-hello-bluesky.png"
                  style={{
                    aspectRatio: "200/160",
                    objectFit: "cover",
                  }}
                  width={200}
                />
                <div className="space-y-2 text-left">
                  <h3 className="font-oswald dark:text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Goodbye Twitter, Hello Bluesky!
                  </h3>
                  <div className="dark:text-gray-400 flex items-center space-x-2">
                    <Calendar size={20} />
                    <span>November 22, 2024</span>
                  </div>
                  <p className="dark:text-gray-300 line-clamp-3">
                    I finally said "goodbye" to Twitter/X and found my happy
                    place on Bluesky! This post explores why I made the switch
                    and what I'm loving about my new online home.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge
                      className="text-sm bg-gray-200 dark:bg-gray-800"
                      variant="secondary"
                    >
                      Others
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
