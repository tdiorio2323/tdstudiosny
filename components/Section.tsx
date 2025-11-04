import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  id?: string
  title?: string
  children: ReactNode
  className?: string
  innerClassName?: string
}

export function Section({ id, title, children, className, innerClassName }: SectionProps) {
  return (
    <section id={id} className={cn("py-12 md:py-20", className)}>
      <div className={cn("container-max stack-lg", innerClassName)}>
        {title && <h2 className="text-2xl md:text-4xl font-bold text-center">{title}</h2>}
        {children}
      </div>
    </section>
  )
}
