import { ReactNode } from "react"

interface SectionProps {
  id?: string
  title?: string
  children: ReactNode
  className?: string
  innerClassName?: string
}

export function Section({ id, title, children, className = "", innerClassName = "" }: SectionProps) {
  return (
    <section id={id} className={`py-12 md:py-20 ${className}`}>
      <div className={`container-max stack-lg ${innerClassName}`}>
        {title && (
          <h2 className="text-2xl md:text-4xl font-bold text-center">{title}</h2>
        )}
        {children}
      </div>
    </section>
  )
}
