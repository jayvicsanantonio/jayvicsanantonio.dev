'use client'

import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'

import NavButton from '@/app/(home)/_components/NavButton'

export type PrimaryNavOverlayProps = {
  centerTop: string
  leftOffsetsPx: { projects: number; linkedin: number }
  rightOffsetsPx: { work: number; github: number }
  buttonSize: { w: number; h: number }
}

export default function PrimaryNavOverlay({
  centerTop,
  leftOffsetsPx,
  rightOffsetsPx,
  buttonSize,
}: PrimaryNavOverlayProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const startScroll = 1200
      const transitionLength = 800
      const progress = Math.max(0, Math.min(1, (scrollY - startScroll) / transitionLength))
      setScrollProgress(progress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[70] hidden sm:block will-change-transform"
      style={{
        transform: `translateY(${-scrollProgress * 100}vh)`,
        transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      <nav aria-label="Primary" className="hidden sm:block">
        <ul className="contents">
          <li className="contents">
            <NavButton
              href="/projects"
              ariaLabel="Projects"
              tooltip="Projects"
              side="left"
              offsetPx={leftOffsetsPx.projects}
              size={buttonSize}
              top={centerTop}
              className="vt-tag-projects"
            >
              <Icon
                icon="mdi:application-brackets"
                width={36}
                height={36}
                aria-hidden="true"
                style={{
                  transform:
                    'translate(calc(var(--mx, 0) * 12px), calc(var(--my, 0) * 12px)) rotate(calc(var(--mx, 0) * -6deg))',
                  transition: 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1)',
                  willChange: 'transform',
                }}
              />
            </NavButton>
          </li>
          <li className="contents">
            <NavButton
              href="https://www.linkedin.com/in/jayvicsanantonio/"
              ariaLabel="LinkedIn"
              tooltip="LinkedIn"
              side="left"
              offsetPx={leftOffsetsPx.linkedin}
              size={buttonSize}
              top={centerTop}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                icon="mdi:linkedin"
                width={40}
                height={40}
                aria-hidden="true"
                style={{
                  transform:
                    'translate(calc(var(--mx, 0) * 12px), calc(var(--my, 0) * 12px)) rotate(calc(var(--mx, 0) * -6deg))',
                  transition: 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1)',
                  willChange: 'transform',
                }}
              />
            </NavButton>
          </li>
          <li className="contents">
            <NavButton
              href="/work"
              ariaLabel="Work"
              tooltip="Work Experience"
              side="right"
              offsetPx={rightOffsetsPx.work}
              size={buttonSize}
              top={centerTop}
              className="vt-tag-work"
            >
              <Icon
                icon="mdi:timeline-text"
                width={36}
                height={36}
                aria-hidden="true"
                style={{
                  transform:
                    'translate(calc(var(--mx, 0) * 12px), calc(var(--my, 0) * 12px)) rotate(calc(var(--mx, 0) * -6deg))',
                  transition: 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1)',
                  willChange: 'transform',
                }}
              />
            </NavButton>
          </li>
          <li className="contents">
            <NavButton
              href="https://github.com/jayvicsanantonio"
              ariaLabel="GitHub"
              tooltip="GitHub"
              side="right"
              offsetPx={rightOffsetsPx.github}
              size={buttonSize}
              top={centerTop}
              target="_blank"
              rel="noopener noreferrer"
              transitionMs={140}
            >
              <Icon
                icon="mdi:github"
                width={40}
                height={40}
                aria-hidden="true"
                style={{
                  transform:
                    'translate(calc(var(--mx, 0) * 12px), calc(var(--my, 0) * 12px)) rotate(calc(var(--mx, 0) * -6deg))',
                  transition: 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1)',
                  willChange: 'transform',
                }}
              />
            </NavButton>
          </li>
        </ul>
      </nav>
    </div>
  )
}
