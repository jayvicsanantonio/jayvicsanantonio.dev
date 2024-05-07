import Link from "next/link";
import Image from "next/image";
import CalendarIcon from "@/components/icons/calendar";

export default function Component() {
  return (
    <section className="w-full  bg-gray-950 text-gray-50">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-gray-800 px-3 py-1 text-sm">
            Blog Posts
          </div>
          <h2 className="text-2xl font-bold tracking-tighter text-gray-50 md:text-3xl/tight lg:text-4xl">
            Exploring My Thought
          </h2>
          <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Welcome to my blog! Here, I delve into the exciting world of web
            development with insightful articles, tips, and behind-the-scenes
            experiences.
          </p>
        </div>
        <div className="flex flex-col gap-8 py-12  bg-gray-950 text-gray-50">
          <div className="space-y-8">
            <article className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg border border-gray-800 p-6 shadow-sm transition-all hover:border-gray-700 hover:shadow-md">
              <img
                alt="Blog Post Image"
                className="rounded-lg object-cover"
                height={150}
                src="/images/home/placeholder-image.png"
                style={{
                  aspectRatio: "200/150",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2">
                <Link
                  className="text-gray-50 font-bold text-lg hover:underline"
                  href="#"
                >
                  The Future of Web Development: Trends and Innovations
                </Link>
                <div className="text-gray-400 text-sm">
                  <span>May 4, 2024</span>
                </div>
                <p className="text-gray-300 line-clamp-3">
                  Explore the latest trends and innovations shaping the future
                  of web development, from AI-powered tools to serverless
                  architectures and beyond.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    className="bg-gray-700 text-gray-400 px-3 py-1 rounded-full hover:bg-gray-600 hover:text-gray-50"
                    href="#"
                  >
                    Web Development
                  </Link>
                  <Link
                    className="bg-gray-700 text-gray-400 px-3 py-1 rounded-full hover:bg-gray-600 hover:text-gray-50"
                    href="#"
                  >
                    Trends
                  </Link>
                  <Link
                    className="bg-gray-700 text-gray-400 px-3 py-1 rounded-full hover:bg-gray-600 hover:text-gray-50"
                    href="#"
                  >
                    Innovations
                  </Link>
                </div>
              </div>
            </article>
            <article className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg border border-gray-800 p-6 shadow-sm transition-all hover:border-gray-700 hover:shadow-md">
              <img
                alt="Blog Post Image"
                className="rounded-lg object-cover"
                height={150}
                src="/images/home/placeholder-image.png"
                style={{
                  aspectRatio: "200/150",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2">
                <Link
                  className="text-gray-50 font-bold text-lg hover:underline"
                  href="#"
                >
                  Mastering Responsive Design: Techniques and Best Practices
                </Link>
                <div className="text-gray-400 text-sm">
                  <span>April 15, 2024</span>
                </div>
                <p className="text-gray-300 line-clamp-3">
                  Learn how to create responsive, mobile-friendly websites that
                  adapt seamlessly to different screen sizes and devices.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    className="bg-gray-700 text-gray-400 px-3 py-1 rounded-full hover:bg-gray-600 hover:text-gray-50"
                    href="#"
                  >
                    Responsive Design
                  </Link>
                  <Link
                    className="bg-gray-700 text-gray-400 px-3 py-1 rounded-full hover:bg-gray-600 hover:text-gray-50"
                    href="#"
                  >
                    Best Practices
                  </Link>
                  <Link
                    className="bg-gray-700 text-gray-400 px-3 py-1 rounded-full hover:bg-gray-600 hover:text-gray-50"
                    href="#"
                  >
                    Techniques
                  </Link>
                </div>
              </div>
            </article>
            <article className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg border border-gray-800 p-6 shadow-sm transition-all hover:border-gray-700 hover:shadow-md">
              <img
                alt="Blog Post Image"
                className="rounded-lg object-cover"
                height={150}
                src="/images/home/placeholder-image.png"
                style={{
                  aspectRatio: "200/150",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2">
                <Link
                  className="text-gray-50 font-bold text-lg hover:underline"
                  href="#"
                >
                  Unlocking the Power of React: A Comprehensive Guide
                </Link>
                <div className="text-gray-400 text-sm">
                  <span>March 28, 2024</span>
                </div>
                <p className="text-gray-300 line-clamp-3">
                  Dive deep into the world of React, the popular JavaScript
                  library for building user interfaces, and learn how to
                  leverage its powerful features.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    className="bg-gray-700 text-gray-400 px-3 py-1 rounded-full hover:bg-gray-600 hover:text-gray-50"
                    href="#"
                  >
                    React
                  </Link>
                  <Link
                    className="bg-gray-700 text-gray-400 px-3 py-1 rounded-full hover:bg-gray-600 hover:text-gray-50"
                    href="#"
                  >
                    JavaScript
                  </Link>
                  <Link
                    className="bg-gray-700 text-gray-400 px-3 py-1 rounded-full hover:bg-gray-600 hover:text-gray-50"
                    href="#"
                  >
                    Comprehensive Guide
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
