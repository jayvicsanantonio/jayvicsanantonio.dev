import { MouseEventHandler, TouchEventHandler } from "react";
import { animated } from "react-spring";
import { ChevronDown } from "lucide-react";
import useBoop from "@/hooks/use-boop";

export default function ScrollDown({
  sectionRef,
  bottom = 52,
}: {
  sectionRef: React.RefObject<HTMLElement>;
  bottom?: number;
}) {
  const [style, trigger] = useBoop({
    y: 10,
    timing: 200,
  });

  const scrollToNextSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 bottom-40"
      style={{ bottom: `${bottom / 4}rem` }}
    >
      <animated.button
        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 rounded-full p-2"
        onClick={scrollToNextSection}
        onMouseEnter={trigger as MouseEventHandler<HTMLButtonElement>}
        onTouchStart={trigger as TouchEventHandler<HTMLButtonElement>}
        aria-label="Scroll to About section"
        style={style}
      >
        <ChevronDown size={40} />
      </animated.button>
    </div>
  );
}
