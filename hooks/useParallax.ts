"use client"

import { useEffect, useState } from "react"

export function useParallax() {
  const [scrollY, setScrollY] = useState(0)
  const [isHeroVisible, setIsHeroVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      // Hero is considered out of view when scrolled past viewport height
      const heroHeight = window.innerHeight
      setIsHeroVisible(currentScrollY < heroHeight * 0.8)
    }

    // Set initial scroll position
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return {
    scrollY,
    isHeroVisible,
    // Parallax transform values
    heroTransform: `translateY(${scrollY * 0.5}px)`,
    contentTransform: `translateY(${scrollY * 0.1}px)`,
    headerOpacity: isHeroVisible ? 0 : 1,
    headerTransform: isHeroVisible ? "translateY(-100%)" : "translateY(0)",
  }
}
