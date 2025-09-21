import Link from 'next/link'
import type React from 'react'

export default function ProjectLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const isExternal =
    href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')

  const cls = [
    'inline-flex h-9 gap-2 px-3 text-sm items-center justify-center rounded-full isolate overflow-hidden',
    // Pure Tailwind glass approximation
    'border border-white/30 bg-white/15 backdrop-blur-lg backdrop-saturate-150 shadow-lg',
    // Interaction states
    'transition ease-out duration-200 hover:border-white/50 hover:shadow-xl',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
  ].join(' ')

  if (isExternal) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <Link href={href} className={cls} prefetch>
      {children}
    </Link>
  )
}
