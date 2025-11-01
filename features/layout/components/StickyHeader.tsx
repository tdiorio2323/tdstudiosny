"use client"

import { Nav } from "@/features/layout/components/Nav"
import { useParallax } from "@/hooks/useParallax"

export function StickyHeader() {
  const { isHeroVisible, headerOpacity, headerTransform } = useParallax()

  return (
    <>
      {/* Skip to content link for keyboard accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[44px]"
      >
        Skip to content
      </a>
      <div
        className="fixed top-0 left-0 right-0 z-50 sticky-header"
        style={{
          opacity: isHeroVisible ? 1 : headerOpacity,
          transform: isHeroVisible ? "translateY(0)" : headerTransform,
        }}
      >
        <div className="bg-black/95 backdrop-blur-md border-b border-white/10">
          <Nav />
        </div>
      </div>
    </>
  )
}
