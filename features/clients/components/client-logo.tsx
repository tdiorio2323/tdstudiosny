"use client"

import Image from "next/image"
import { useState } from "react"

interface ClientLogoProps {
  src?: string | null
  alt: string
  fallbackText: string
  containerClassName?: string
  imageClassName?: string
  sizes?: string
}

export function ClientLogo({
  src,
  alt,
  fallbackText,
  containerClassName = "",
  imageClassName = "",
  sizes = "96px",
}: ClientLogoProps) {
  const [errored, setErrored] = useState(false)

  const showImage = !!src && !errored

  return (
    <div className={containerClassName}>
      {showImage ? (
        <Image
          src={src as string}
          alt={alt}
          fill
          sizes={sizes}
          className={imageClassName}
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="flex h-full items-center justify-center px-2 text-center text-xs font-semibold text-white">
          {fallbackText}
        </div>
      )}
    </div>
  )
}
