"use client"

interface CalendlyEmbedProps {
  url: string
  height?: number
}

export function CalendlyEmbed({ url, height = 760 }: CalendlyEmbedProps) {
  return (
    <div className="relative w-full rounded-lg overflow-hidden" style={{ height: `${height}px` }}>
      <iframe
        src={url}
        width="100%"
        height="100%"
        frameBorder="0"
        title="Schedule a consultation with TD Studios"
        className="absolute inset-0"
      />
    </div>
  )
}
