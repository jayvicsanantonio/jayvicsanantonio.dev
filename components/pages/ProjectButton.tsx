import Link from 'next/link';

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
      className="focus-visible:ring-offset-background inline-flex items-center justify-center rounded-lg bg-gray-200 from-blue-500/80 to-purple-500/80 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-linear-to-r hover:text-white focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[color:oklch(74%_0.16_276)]/60 focus-visible:ring-offset-2 dark:bg-gray-800 dark:text-white"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}
