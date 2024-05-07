import Link from "next/link";

export default function ViewProjectButton({ link }: { link: string }) {
  return (
    <Link
      className="inline-flex items-center justify-center rounded-md bg-gray-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950 hover:animate-pulse"
      href={link}
      target="_blank"
    >
      View Project
    </Link>
  );
}
