import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CodeIcon from "@/components/icons/code";
import GithubIcon from "@/components/icons/github";
import LinkedinIcon from "@/components/icons/linkedin";
import MenuIcon from "@/components/icons/menu";
import TwitterIcon from "@/components/icons/twitter";
import CalendarIcon from "@/components/icons/calendar";

export default function Component() {
  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between py-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <CodeIcon className="w-6 h-6" />
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            className="text-sm font-medium hover:underline hover:animate-pulse"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:underline hover:animate-pulse"
            href="/blog"
          >
            Blog
          </Link>
          <Link
            className="text-sm font-medium hover:underline hover:animate-pulse"
            href="/projects"
          >
            Projects
          </Link>
        </nav>
        <Button
          aria-label="Toggle navigation"
          className="md:hidden"
          size="icon"
          variant="ghost"
        >
          <MenuIcon className="w-6 h-6" />
        </Button>
      </header>
      <main className="flex-1 py-12 text-black">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                alt="Article Cover Image"
                className="w-full h-48 object-cover"
                height={400}
                src="/images/home/placeholder-image.png"
                style={{
                  aspectRatio: "600/400",
                  objectFit: "cover",
                }}
                width={600}
              />
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">
                  Mastering React: A Comprehensive Guide
                </h2>
                <p className="text-gray-600 mb-4">
                  Dive into the world of React and learn how to build powerful
                  web applications.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">May 4, 2024</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-300"
                      href="#"
                    >
                      React
                    </Link>
                    <Link
                      className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-300"
                      href="#"
                    >
                      JavaScript
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                alt="Article Cover Image"
                className="w-full h-48 object-cover"
                height={400}
                src="/images/home/placeholder-image.png"
                style={{
                  aspectRatio: "600/400",
                  objectFit: "cover",
                }}
                width={600}
              />
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">
                  Exploring the Power of Next.js
                </h2>
                <p className="text-gray-600 mb-4">
                  Learn how to build fast and scalable React applications with
                  Next.js.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">May 4, 2024</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-300"
                      href="#"
                    >
                      Next.js
                    </Link>
                    <Link
                      className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-300"
                      href="#"
                    >
                      React
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                alt="Article Cover Image"
                className="w-full h-48 object-cover"
                height={400}
                src="/images/home/placeholder-image.png"
                style={{
                  aspectRatio: "600/400",
                  objectFit: "cover",
                }}
                width={600}
              />
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">
                  Unleashing the Potential of TypeScript
                </h2>
                <p className="text-gray-600 mb-4">
                  Discover how TypeScript can improve your JavaScript
                  development experience.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">May 4, 2024</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-300"
                      href="#"
                    >
                      TypeScript
                    </Link>
                    <Link
                      className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-300"
                      href="#"
                    >
                      JavaScript
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                alt="Article Cover Image"
                className="w-full h-48 object-cover"
                height={400}
                src="/images/home/placeholder-image.png"
                style={{
                  aspectRatio: "600/400",
                  objectFit: "cover",
                }}
                width={600}
              />
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">
                  Optimizing Web Performance with Vite
                </h2>
                <p className="text-gray-600 mb-4">
                  Learn how to use Vite to build fast and efficient web
                  applications.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">May 4, 2024</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-300"
                      href="#"
                    >
                      Performance
                    </Link>
                    <Link
                      className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-300"
                      href="#"
                    >
                      Vite
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 px-8 py-6 text-sm text-gray-400">
        <div className="container mx-auto flex items-center justify-between">
          <p>© 2024 Jayvic San Antonio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              className="hover:text-gray-50 hover:animate-pulse"
              href="https://github.com/jpsanantonio"
              legacyBehavior
            >
              <a target="_blank">
                <GithubIcon className="w-5 h-5" />
              </a>
            </Link>
            <Link
              className="hover:text-gray-50 hover:animate-pulse"
              href="https://twitter.com/jpsanantonio"
              legacyBehavior
            >
              <a target="_blank">
                <TwitterIcon className="w-5 h-5" />
              </a>
            </Link>
            <Link
              className="hover:text-gray-50 hover:animate-pulse"
              href="https://www.linkedin.com/in/jayvicsanantonio/"
              legacyBehavior
            >
              <a target="_blank">
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
