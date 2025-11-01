"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { trackPageView, trackScrollDepth, trackTimeOnPage } from "@/lib/analytics"

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view on route change
    trackPageView(pathname)

    // Track scroll depth
    let maxScroll = 0
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      )

      // Track scroll milestones (25%, 50%, 75%, 100%)
      if (scrollPercent >= 25 && maxScroll < 25) {
        trackScrollDepth(25)
        maxScroll = 25
      } else if (scrollPercent >= 50 && maxScroll < 50) {
        trackScrollDepth(50)
        maxScroll = 50
      } else if (scrollPercent >= 75 && maxScroll < 75) {
        trackScrollDepth(75)
        maxScroll = 75
      } else if (scrollPercent >= 100 && maxScroll < 100) {
        trackScrollDepth(100)
        maxScroll = 100
      }
    }

    // Track time on page
    const startTime = Date.now()
    const trackTime = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      trackTimeOnPage(timeSpent)
    }

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("beforeunload", trackTime)

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("beforeunload", trackTime)
    }
  }, [pathname])

  return <>{children}</>
}
