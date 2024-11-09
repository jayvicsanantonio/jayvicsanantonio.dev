import Link from "next/link";
import { usePathname } from "next/navigation";
import useBoop from "@/hooks/use-boop";
import { animated } from "react-spring";

export default function IconButton({
  Icon,
  link,
  callback = () => {},
  children,
}: {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  link: string;
  callback?: () => void;
  children: React.ReactNode;
}) {
  const [style, trigger] = useBoop({ rotation: 20, timing: 200 });
  const pathname = usePathname();

  return (
    <Link href={link} passHref legacyBehavior>
      <a
        href={link}
        className={`flex items-center p-1 rounded-lg text-lg cursor-pointer border-none hover:text-violet-600 transition-colors duration-200 ${
          pathname === link ? "text-violet-600" : "text-white"
        }`}
        onClick={() => callback()}
        tabIndex={0}
        onMouseEnter={trigger}
      >
        <animated.span
          style={style}
          className="flex justify-center items-center rounded "
        >
          <Icon strokeWidth={1.5} />
        </animated.span>
        <span className="px-4 py-0">{children}</span>
      </a>
    </Link>
  );
}
