"use client"

import { useEffect, useRef } from "react"
import { Nav } from "@/features/layout/components/Nav"

const setHeaderHeight = (element: HTMLElement | null) => {
  if (!element) return
  const height = element.offsetHeight
  document.documentElement.style.setProperty("--header-h", `${height}px`)
}

export function StickyHeader() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const updateHeight = () => setHeaderHeight(ref.current)
    updateHeight()

    window.addEventListener("resize", updateHeight, { passive: true })

    let resizeObserver: ResizeObserver | undefined
    if (typeof ResizeObserver !== "undefined" && ref.current) {
      resizeObserver = new ResizeObserver(() => updateHeight())
      resizeObserver.observe(ref.current)
    }

    return () => {
      window.removeEventListener("resize", updateHeight)
      resizeObserver?.disconnect()
    }
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 h-[72px] bg-black/70 backdrop-blur border-b border-white/10 md:h-[84px]"
    >
      <Nav />
    </div>
  )
}
