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
      className="hover:bg-linear-to-r from-blue-500/80 to-purple-500/80 inline-flex items-center justify-center rounded-lg dark:bg-gray-800 px-6 py-3 text-sm font-medium dark:text-white focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-[color:oklch(74%_0.16_276)]/60 bg-gray-200 text-gray-900 hover:text-white"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}
