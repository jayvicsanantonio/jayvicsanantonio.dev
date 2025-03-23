"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
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

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.section
      ref={blogPostsRef}
      id="blog"
      className="relative scroll-mt-52 min-h-screen"
      style={{ scale }}
    >
      <div className="space-y-12 bg-linear-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-xl text-gray-950 dark:text-gray-200">
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
              className="inline-flex items-center justify-center rounded-lg border border-gray-700 px-6 py-3 text-sm font-medium hover:border-t-purple-500 hover:border-r-purple-500 hover:border-b-blue-400 hover:border-l-blue-400 focus:outline-hidden focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-600  dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950 "
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
                  router.push("/blog/popover-api-explained");
                }}
              >
                <Image
                  alt="Blog Post Image"
                  className="rounded-lg object-cover w-full bg-gray-950"
                  height={160}
                  src="/images/blog/popover-api-explained.webp"
                  style={{
                    aspectRatio: "200/160",
                    objectFit: "cover",
                  }}
                  width={200}
                />
                <div className="space-y-2 text-left">
                  <h3 className="font-oswald dark:text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
                    Popover API Explained
                  </h3>
                  <div className="dark:text-gray-400 flex items-center space-x-2">
                    <Calendar size={20} />
                    <span>December 6, 2024</span>
                  </div>
                  <p className="dark:text-gray-300 line-clamp-3">
                    The Popover API lets you easily create and control those
                    handy content bubbles that pop up on webpages, offering
                    improved accessibility and standardization for a smoother
                    user experience.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge className="text-sm" variant="secondary">
                      Advent Calendar
                    </Badge>
                    <Badge className="text-sm" variant="secondary">
                      HTML
                    </Badge>
                    <Badge className="text-sm" variant="secondary">
                      JS
                    </Badge>
                    <Badge className="text-sm" variant="secondary">
                      CSS
                    </Badge>
                    <Badge className="text-sm" variant="secondary">
                      Web Development
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
                  router.push("/blog/css-user-valid-user-invalid-explained");
                }}
              >
                <Image
                  alt="Blog Post Image"
                  className="rounded-lg object-cover w-full bg-gray-950"
                  height={160}
                  src="/images/blog/css-user-valid-user-invalid-explained.webp"
                  style={{
                    aspectRatio: "200/160",
                    objectFit: "cover",
                  }}
                  width={200}
                />
                <div className="space-y-2 text-left">
                  <h3 className="font-oswald dark:text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
                    CSS{" "}
                    <span className="px-3 text-2xl bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
                      :user-valid
                    </span>{" "}
                    and{" "}
                    <span className="px-3 text-2xl bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
                      :user-invalid
                    </span>
                    Explained
                  </h3>
                  <div className="dark:text-gray-400 flex items-center space-x-2">
                    <Calendar size={20} />
                    <span>December 5, 2024</span>
                  </div>
                  <p className="dark:text-gray-300 line-clamp-3">
                    The :user-valid and :user-invalid CSS pseudo-classes give
                    instant visual feedback on form input, improving usability
                    and accessibility by highlighting correct and incorrect
                    entries.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge className="text-sm" variant="secondary">
                      Advent Calendar
                    </Badge>
                    <Badge className="text-sm" variant="secondary">
                      CSS
                    </Badge>
                    <Badge className="text-sm" variant="secondary">
                      Web Development
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
                  router.push("/blog/html-autofocus-explained");
                }}
              >
                <Image
                  alt="Blog Post Image"
                  className="rounded-lg object-cover w-full bg-gray-950"
                  height={160}
                  src="/images/blog/html-autofocus-explained.webp"
                  style={{
                    aspectRatio: "200/160",
                    objectFit: "cover",
                  }}
                  width={200}
                />
                <div className="space-y-2 text-left">
                  <h3 className="font-oswald dark:text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
                    HTML{" "}
                    <span className="px-3 text-2xl bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
                      autofocus
                    </span>{" "}
                    Explained
                  </h3>
                  <div className="dark:text-gray-400 flex items-center space-x-2">
                    <Calendar size={20} />
                    <span>December 3, 2024</span>
                  </div>
                  <p className="dark:text-gray-300 line-clamp-3">
                    Autofocus in HTML automatically places the cursor in a form
                    field, making user interaction smoother. Use it wisely,
                    though, as overuse can be annoying and even cause
                    accessibility issues.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge className="text-sm" variant="secondary">
                      Advent Calendar
                    </Badge>
                    <Badge className="text-sm" variant="secondary">
                      HTML
                    </Badge>
                    <Badge className="text-sm" variant="secondary">
                      Web Development
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
