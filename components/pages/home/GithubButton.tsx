import Link from "next/link";
import GithubIcon from "@/components/icons/github";

export default function GithubButton({ link }: { link: string | null }) {
  if (!link) return null;

  return (
    <Link
      className="inline-flex items-center justify-center rounded-md bg-gray-800 px-6 py-3 text-sm font-medium text-gray-200 transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950 "
      href={link}
      target="_blank"
    >
      <GithubIcon className="w-5 h-5" />
      Github
    </Link>
  );
}
