import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      {...props}
      className={cn(
        "bg-neutral-900/70 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 text-white",
        className
      )}
      suppressHydrationWarning
    >
      {children}
    </div>
  )
}
