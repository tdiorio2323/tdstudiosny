"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { HeroVideo } from "@/components/hero-video"
import type { StaticImageData } from "next/image"

interface HeroSectionProps {
  heroImage: StaticImageData
}

export function HeroSection({ heroImage }: HeroSectionProps) {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bg = bgRef.current
    if (!bg) return

    const onScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const fadeThreshold = viewportHeight * 0.3

      // Fade out background as user scrolls past 30% of viewport height
      const opacity = scrollY > fadeThreshold ? 0 : 1 - (scrollY / fadeThreshold) * 0.3
      bg.style.opacity = opacity.toString()
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section className="relative isolate h-screen overflow-hidden">
      {/* Background Video with Fade Effect */}
      <div
        ref={bgRef}
        className="absolute inset-0 transition-opacity duration-500"
        style={{ willChange: "opacity" }}
      >
        <HeroVideo
          videoSrc="/hero-video.mp4"
          posterSrc="/main-background.webp"
          fallbackImageSrc={heroImage}
        />
      </div>

      {/* Gradient mask for readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"
      />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container-max">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/50 px-6 py-12 text-center shadow-2xl backdrop-blur-xl sm:px-10 md:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-60"
            />
            <div className="relative stack-md animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
                Design Your Success
              </h1>
              <p className="mx-auto max-w-2xl text-lg md:text-xl text-white/80">
                High-end websites, branding, and marketing systems engineered for creators and ambitious brands.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/work"
                  className="w-full min-h-[48px] rounded-full bg-white/90 px-6 py-3 text-base font-medium tracking-wide text-black transition-colors duration-300 hover:bg-white sm:w-auto"
                >
                  View Our Work
                </Link>
                <Link
                  href="/contact"
                  className="w-full min-h-[48px] rounded-full border border-white/30 bg-black/80 px-6 py-3 text-base font-medium tracking-wide text-white transition-colors duration-300 hover:bg-black sm:w-auto"
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
