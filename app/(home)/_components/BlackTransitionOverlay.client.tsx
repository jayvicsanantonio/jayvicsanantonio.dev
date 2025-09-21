'use client'

// Black overlay component that covers hero elements from bottom to top during scroll
// Creates cinematic transition to AboutSection

import { useEffect, useState } from 'react'

export default function BlackTransitionOverlay() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      // Start transition after scrolling past initial hero section (around 1200px)
      // Complete transition over 800px of scroll
      const startScroll = 1200
      const transitionLength = 800

      const progress = Math.max(0, Math.min(1, (scrollY - startScroll) / transitionLength))
      setScrollProgress(progress)

      // Debug logging
      console.log('BlackTransition:', { scrollY, progress, transformY: 100 - progress * 100 })
    }

    // Check initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[200] bg-cyan-950 will-change-transform"
      style={{
        transform: `translateY(${100 - scrollProgress * 100}%)`,
        transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    />
  )
}
