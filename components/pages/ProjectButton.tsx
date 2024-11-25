import Link from "next/link";

export default function ProjectButton({
  link,
  children,
}: {
  link: string | null;
  children: React.ReactNode;
}) {
  if (!link) return null;

  return (
    <Link
      className="hover:bg-gradient-to-r from-blue-500/80 to-purple-500/80 duration-300 inline-flex items-center justify-center rounded-lg dark:bg-gray-800 px-6 py-3 text-sm font-medium transition-colors will-change-contents ease-out dark:text-white focus:outline-none focus:ring-2 dark:focus:ring-gray-400 focus:ring-offset-2 bg-gray-200 text-gray-900 hover:text-white focus:ring-gray-600 focus:ring-offset-gray-950"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}
