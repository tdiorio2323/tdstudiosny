"use client"

import Image from "next/image"
import type { StaticImageData } from "next/image"
import { useEffect, useRef, useState } from "react"

interface HeroVideoProps {
  videoSrc: string
  posterSrc: string
  fallbackImageSrc: StaticImageData
}

export function HeroVideo({ videoSrc, posterSrc, fallbackImageSrc }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)
  const [fallbackImage, setFallbackImage] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleMotionChange = () => {
      setShouldReduceMotion(mediaQuery.matches)
    }

    handleMotionChange()
    mediaQuery.addEventListener?.("change", handleMotionChange)

    return () => mediaQuery.removeEventListener?.("change", handleMotionChange)
  }, [])

  useEffect(() => {
    if (shouldReduceMotion) return

    const video = videoRef.current
    if (!video) return

    const handleCanPlay = async () => {
      setIsVideoLoaded(true)

      try {
        await video.play()
      } catch {
        setFallbackImage(true)
      }
    }

    const handleLoadedData = () => {
      setIsVideoLoaded(true)
    }

    const handleError = () => {
      setFallbackImage(true)
    }

    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("error", handleError)

    video.load()

    const tryPlay = async () => {
      try {
        await video.play()
      } catch {
        setFallbackImage(true)
      }
    }

    void tryPlay()

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("error", handleError)
    }
  }, [shouldReduceMotion])

  const renderFallbackImage = () => (
    <div className="absolute inset-0 h-full w-full">
      <Image
        src={fallbackImageSrc}
        alt="TD Studios Hero Background"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
    </div>
  )

  if (shouldReduceMotion || fallbackImage) {
    return <div className="absolute inset-0 h-full w-full bg-black">{renderFallbackImage()}</div>
  }

  return (
    <div className="absolute inset-0 h-full w-full bg-black">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={posterSrc}
        aria-label="TD Studios background video"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ opacity: isVideoLoaded ? 1 : 0 }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {!isVideoLoaded && renderFallbackImage()}
    </div>
  )
}
