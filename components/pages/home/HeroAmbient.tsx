'use client';

import { useEffect, useRef } from 'react';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion';

export default function HeroAmbient() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      if (ctx) ctx.scale(dpr, dpr);
    }

    function gradientCircle(
      x: number,
      y: number,
      r: number,
      colors: [string, number][]
    ) {
      if (!ctx) return;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      colors.forEach(([c, stop]) => g.addColorStop(stop, c));
      ctx.fillStyle = g as any;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    let t = 0;
    function draw() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      const x1 = w * 0.35 + Math.sin(t * 0.0012) * 40;
      const y1 = h * 0.4 + Math.cos(t * 0.0014) * 30;
      const x2 = w * 0.65 + Math.cos(t * 0.0011) * 50;
      const y2 = h * 0.55 + Math.sin(t * 0.0013) * 40;

      gradientCircle(x1, y1, 180, [
        ['rgba(59,130,246,0.22)', 0],
        ['rgba(59,130,246,0)', 1],
      ]);
      gradientCircle(x2, y2, 160, [
        ['rgba(168,85,247,0.20)', 0],
        ['rgba(168,85,247,0)', 1],
      ]);
      gradientCircle((x1 + x2) / 2, (y1 + y2) / 2, 120, [
        ['rgba(34,211,238,0.16)', 0],
        ['rgba(34,211,238,0)', 1],
      ]);

      t += prefersReducedMotion ? 0 : 16;
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => {
      // reset transform to avoid cumulative scaling
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden />
    </div>
  );
}
