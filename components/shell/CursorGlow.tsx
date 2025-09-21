'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const glowRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const dot = dotRef.current
    const glow = glowRef.current
    if (!dot || !glow) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerFine = window.matchMedia('(pointer: fine)')

    // Respect preference and input modality
    if (prefersReduced.matches || !pointerFine.matches) return

    let raf = 0
    let started = false
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const loop = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      glow.style.transform = `translate3d(${currentX - 60}px, ${currentY - 60}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      dot.style.transform = `translate3d(${targetX - 3}px, ${targetY - 3}px, 0)`
      if (!started) {
        started = true
        raf = requestAnimationFrame(loop)
      }
    }

    const onChange = () => {
      // Stop and detach if preferences change at runtime
      if (prefersReduced.matches || !pointerFine.matches) {
        window.removeEventListener('mousemove', onMove)
        if (raf) cancelAnimationFrame(raf)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    if (prefersReduced.addEventListener) {
      prefersReduced.addEventListener('change', onChange)
      pointerFine.addEventListener('change', onChange)
    } else {
      // Safari fallback
      prefersReduced.addListener(onChange)
      pointerFine.addListener(onChange)
    }

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (prefersReduced.removeEventListener) {
        prefersReduced.removeEventListener('change', onChange)
        pointerFine.removeEventListener('change', onChange)
      } else {
        prefersReduced.removeListener(onChange)
        pointerFine.removeListener(onChange)
      }
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed z-[60] h-[120px] w-[120px] rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(59,130,246,0.25),rgba(168,85,247,0.25),rgba(34,211,238,0.2),rgba(59,130,246,0.25))] opacity-40 blur-2xl [transition:transform_60ms_linear]"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed z-[61] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_2px_rgba(34,211,238,0.6)] [transition:transform_40ms_linear]"
      />
    </>
  )
}
