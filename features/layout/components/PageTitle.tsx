interface PageTitleProps {
  title: string
  subtitle?: string
  eyebrow?: string
}

export function PageTitle({ title, subtitle, eyebrow }: PageTitleProps) {
  return (
    <div className="text-center mb-12 md:mb-16">
      {eyebrow && (
        <p className="text-sm md:text-base text-white/60 uppercase tracking-wider mb-4">
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">{title}</h1>
      {subtitle && <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  )
}
