import { useEffect, useState } from "react";

export default function useScreenSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize(event: Event) {
      const { innerWidth, innerHeight } = event.target as Window;
      setSize({ width: innerWidth, height: innerHeight });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}
