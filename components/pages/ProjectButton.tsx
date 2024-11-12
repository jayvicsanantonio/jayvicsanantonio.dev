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
      className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-blue-500 to-purple-500 duration-300 inline-flex items-center justify-center rounded-md bg-gray-800 px-6 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}
