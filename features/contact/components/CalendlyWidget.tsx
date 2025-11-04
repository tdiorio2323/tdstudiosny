"use client"

import { useState, useEffect } from "react"
import { InlineWidget } from "react-calendly"

interface CalendlyWidgetProps {
  url: string
  className?: string
}

export function CalendlyWidget({ url, className = "" }: CalendlyWidgetProps) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    // Set a timeout to detect if widget fails to load
    const timer = setTimeout(() => {
      setFailed(true)
    }, 15000) // 15 second timeout

    return () => clearTimeout(timer)
  }, [])

  if (failed) {
    return (
      <div
        className={`${className} p-8 bg-neutral-900/70 border border-white/20 rounded-lg text-center`}
      >
        <p className="text-white mb-4">Calendar failed to load.</p>
        <p className="text-white/80 text-sm">
          Please email us directly at{" "}
          <a
            className="underline text-white hover:text-white/80 min-h-[44px]"
            href="mailto:tyler@tdstudiosny.com"
          >
            tyler@tdstudiosny.com
          </a>{" "}
          or call{" "}
          <a
            className="underline text-white hover:text-white/80 min-h-[44px]"
            href="tel:347-485-9935"
          >
            347-485-9935
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      <InlineWidget
        url={url}
        styles={{
          height: "700px",
          width: "100%",
        }}
        pageSettings={{
          backgroundColor: "0F0F10",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "ffffff",
          textColor: "ffffff",
        }}
      />
    </div>
  )
}
