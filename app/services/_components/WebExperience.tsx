import { FrostedButton } from "@/components/FrostedButton"
import { GlassCard } from "@/components/GlassCard"

export function WebExperience() {
  const discoveryCheckpoints = [
    "Kickoff audit + technical mapping",
    "Message architecture + content inventory",
    "Wireframes with rapid prototype review",
    "Analytics + measurement plan setup",
  ]

  const launchPlaybook = [
    "Component library + design tokens",
    "CMS schema and publishing workflows",
    "Performance + accessibility tuning",
    "Launch runbooks with rollback paths",
  ]

  return (
    <div className="space-y-12">
      {/* Hero Content */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Website Design That Converts</h2>
        <p className="text-lg md:text-xl text-white/80 mb-8">
          Premium website design with luxury aesthetics, conversion-focused UX, and stunning visual
          storytelling.
        </p>
        <FrostedButton href="/contact">Start your project</FrostedButton>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <GlassCard>
          <h3 className="text-xl font-semibold mb-4">Conversion-Ready Landers</h3>
          <p className="text-white text-sm">
            Story-driven sections, SEO-focused architecture, and instrumented funnels built for
            measurable wins.
          </p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-semibold mb-4">Scalable Marketing Sites</h3>
          <p className="text-white text-sm">
            Modular content models, CMS-ready components, and asset optimization that keeps teams
            shipping fast.
          </p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-semibold mb-4">Product Ecosystems</h3>
          <p className="text-white text-sm">
            Unified brand, docs, and support surfaces powered by design systems and enterprise-grade
            hosting.
          </p>
        </GlassCard>
      </div>

      {/* Outcome Focus */}
      <GlassCard className="luxury-glass">
        <h3 className="text-xl font-semibold mb-6">Everything tied to outcomes</h3>
        <p className="text-white">
          We lead discovery, prototype reviews, and performance calibration alongside your marketing
          and product leads. Expect dependable handoff, documentation, and a roadmap for
          optimization.
        </p>
      </GlassCard>

      {/* Process Breakdown */}
      <div className="grid md:grid-cols-2 gap-8">
        <GlassCard className="luxury-glass">
          <h3 className="text-xl font-semibold mb-6">Discovery checkpoints</h3>
          <ul className="space-y-3">
            {discoveryCheckpoints.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-white mr-3">•</span>
                <span className="text-white text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="luxury-glass">
          <h3 className="text-xl font-semibold mb-6">Launch playbook</h3>
          <ul className="space-y-3">
            {launchPlaybook.map((item, index) => (
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
