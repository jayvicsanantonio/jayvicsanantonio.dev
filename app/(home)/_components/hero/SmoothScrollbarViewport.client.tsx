"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Scrollbar from "smooth-scrollbar";
import type { Scrollbar as SmoothScrollbar } from "smooth-scrollbar/interfaces/scrollbar";

type SmoothScrollbarViewportProps = {
  children: React.ReactNode;
  className?: string;
  damping: number;
  onInstance?: (instance: SmoothScrollbar | null) => void;
};

export default function SmoothScrollbarViewport({
  children,
  className,
  damping,
  onInstance,
}: SmoothScrollbarViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<SmoothScrollbar | null>(null);
  const onInstanceRef = useRef(onInstance);
  const [contentEl, setContentEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    onInstanceRef.current = onInstance;
  }, [onInstance]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const instance = Scrollbar.init(container, {
      damping,
      alwaysShowTracks: false,
      continuousScrolling: false,
      delegateTo: document,
      wheelEventTarget: document,
    });

    if (process.env.NODE_ENV !== "production") {
      console.debug("[SmoothScrollbarViewport] init", instance);
    }
    if (typeof window !== "undefined") {
      const win = window as typeof window & { __smoothInstances?: SmoothScrollbar[] };
      const store = (win.__smoothInstances ??= []);
      store.push(instance);
    }
    (container as HTMLElement & { __smoothInstance?: SmoothScrollbar }).__smoothInstance = instance;

    instanceRef.current = instance;
    setContentEl(instance.contentEl);
    onInstanceRef.current?.(instance);

    return () => {
      if ((container as HTMLElement & { __smoothInstance?: SmoothScrollbar }).__smoothInstance === instance) {
        delete (container as HTMLElement & { __smoothInstance?: SmoothScrollbar }).__smoothInstance;
      }
      if (typeof window !== "undefined") {
        const win = window as typeof window & { __smoothInstances?: SmoothScrollbar[] };
        if (win.__smoothInstances) {
          win.__smoothInstances = win.__smoothInstances.filter((existing) => existing !== instance);
        }
      }
      onInstanceRef.current?.(null);
      instanceRef.current = null;
      setContentEl(null);
      instance.destroy();
    };
  }, []);

  useEffect(() => {
    const instance = instanceRef.current;
    if (!instance) {
      return;
    }

    if (instance.options.damping !== damping) {
      instance.options.damping = damping;
      instance.update();
    }
  }, [damping]);

  useEffect(() => {
    const instance = instanceRef.current;
    if (instance) {
      instance.update();
    }
  }, [contentEl]);

  return (
    <div ref={containerRef} className={className}>
      {contentEl ? createPortal(children, contentEl) : null}
    </div>
  );
}
