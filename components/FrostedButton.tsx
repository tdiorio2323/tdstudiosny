"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { trackButtonClick, trackCTAPerformance } from "@/lib/analytics"

interface FrostedButtonProps {
  href?: string
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  loading?: boolean // Loading state support
  analyticsLabel?: string // Optional label for analytics tracking
  analyticsPosition?: string // Optional position for analytics
}

export function FrostedButton({
  href,
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  analyticsLabel,
  analyticsPosition,
}: FrostedButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-neutral-900/70 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium transition-all duration-300 mobile-touch-target mobile-btn-primary md:mobile-btn-primary focus:outline-none focus:ring-2 focus:ring-white/30 hover:bg-neutral-900/80 hover:border-white/30 hover:shadow-lg hover:transform hover:-translate-y-0.5 active:transform active:translate-y-0 active:shadow-md"

  const handleClick = () => {
    if (disabled || loading) return

    const buttonText = typeof children === "string" ? children : "Button"
    const label = analyticsLabel || buttonText
    const position = analyticsPosition || "unknown"

    trackButtonClick(label, position)
    trackCTAPerformance(label, position)

    if (onClick) {
      onClick()
    }
  }

  const disabledClasses =
    disabled || loading ? "opacity-60 pointer-events-none cursor-not-allowed" : "cursor-pointer"

  const buttonContent = (
    <>
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </>
  )

  if (href && !disabled && !loading) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${className} ${disabledClasses}`}
        onClick={handleClick}
      >
        {buttonContent}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${baseClasses} ${className} ${disabledClasses}`}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {buttonContent}
    </button>
  )
}
