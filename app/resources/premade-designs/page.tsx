import Image from "next/image"
import type { Metadata } from "next"
import { GlassCard } from "@/components/glass-card"
import { FrostedButton } from "@/components/frosted-button"
import { PREMADE, type PremadeDesign } from "@/lib/premade-designs"

export const metadata: Metadata = {
  title: "Premade Designs | TD Studios",
  description: "Ready-to-deploy design templates and assets for Quick Printz campaigns. Professional designs at affordable prices.",
  alternates: {
    canonical: "https://tdstudiosdigital.com/resources/premade-designs",
  },
  openGraph: {
    title: "Premade Designs | TD Studios",
    description: "Ready-to-deploy design templates and assets for Quick Printz campaigns. Professional designs at affordable prices.",
    url: "https://tdstudiosdigital.com/resources/premade-designs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premade Designs | TD Studios",
    description: "Ready-to-deploy design templates and assets for Quick Printz campaigns. Professional designs at affordable prices.",
  },
}

export default function PremadeDesignsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/design-hero.jpg"
            alt="Premade designs showcase"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40 hero-overlay-mobile" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Premade Designs</h1>
          <p className="text-white/90 text-lg">Curated, ready-to-deploy assets for Quick Printz campaigns.</p>
        </div>
      </section>

      {/* Design Catalog */}
      <section className="relative py-16 px-6">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {PREMADE.map((design: PremadeDesign) => (
              <GlassCard key={design.id} className="glass-mobile mobile-content-spacing">
                <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-neutral-900/70 border border-white/10 relative">
                  <Image
                    src={design.thumb}
                    alt={design.title}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{design.title}</h3>
                <p className="text-white text-sm mb-3">{design.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {design.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-neutral-900/70 border border-white/10 rounded text-xs text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-white font-bold text-xl mb-4">${design.price}</div>
                <div className="flex gap-2">
                  <FrostedButton href={`/contact?type=premade&design=${design.slug}`} className="flex-1">
                    Preview
                  </FrostedButton>
                  {/* TODO: Integrate Stripe/checkout for direct purchase */}
                  <FrostedButton href="/contact?type=premade" className="flex-1 btn-primary">
                    Contact
                  </FrostedButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

