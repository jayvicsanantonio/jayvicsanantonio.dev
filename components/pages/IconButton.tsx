import Link from "next/link";
import { usePathname } from "next/navigation";

export default function IconButton({
  Icon,
  link,
  children,
}: {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  link: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link href={link} passHref legacyBehavior>
      <a
        href={link}
        className={`flex items-center p-1 rounded-lg text-lg cursor-pointer border-none hover:text-violet-600 transition-colors duration-200 ${
          pathname === link ? "text-violet-600" : "text-white"
        }`}
      >
        <span className="flex justify-center items-center rounded ">
          <Icon strokeWidth={1.5} />
        </span>
        <span className="px-4 py-0">{children}</span>
      </a>
    </Link>
  );
}
