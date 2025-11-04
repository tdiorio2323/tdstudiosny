import { FrostedButton } from "@/components/FrostedButton"
import { GlassCard } from "@/components/GlassCard"

export function Design() {
  const designProcess = [
    "Brand discovery and competitive analysis",
    "Concept development and mood boarding",
    "Visual identity design and refinement",
    "Brand guidelines and asset delivery",
  ]

  const brandDeliverables = [
    "Logo suite with variations and usage guidelines",
    "Color palette with accessibility considerations",
    "Typography system and hierarchy",
    "Brand guidelines document and asset library",
  ]

  return (
    <div className="space-y-12">
      {/* Hero Content */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Luxury Brand Design</h2>
        <p className="text-lg md:text-xl text-white/80 mb-8">
          Premium brand identity and visual design that elevates your market position and builds
          lasting customer connections.
        </p>
        <FrostedButton href="/contact">Start your brand transformation</FrostedButton>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <GlassCard>
          <h3 className="text-xl font-semibold mb-4">Brand Identity Systems</h3>
          <p className="text-white text-sm">
            Brand identity systems, logo design, and visual language that communicates premium
            positioning and builds trust.
          </p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-semibold mb-4">Luxury Branding</h3>
          <p className="text-white text-sm">
            Color palettes, typography, iconography, and brand guidelines crafted for sophisticated
            market positioning.
          </p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-semibold mb-4">Digital Assets</h3>
          <p className="text-white text-sm">
            Marketing materials, social media templates, and digital brand assets optimized for
            consistent brand experiences.
          </p>
        </GlassCard>
      </div>

      {/* Process Breakdown */}
      <div className="grid md:grid-cols-2 gap-8">
        <GlassCard className="luxury-glass">
          <h3 className="text-xl font-semibold mb-6">Design Process</h3>
          <ul className="space-y-3">
            {designProcess.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-white mr-3">•</span>
                <span className="text-white text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="luxury-glass">
          <h3 className="text-xl font-semibold mb-6">Brand Deliverables</h3>
          <ul className="space-y-3">
            {brandDeliverables.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-white mr-3">•</span>
                <span className="text-white text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  )
}
