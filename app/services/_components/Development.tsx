import { Code, Database, Globe, Layers, Shield, Zap, Settings, BarChart3 } from "lucide-react"
import { FrostedButton } from "@/components/FrostedButton"
import { GlassCard } from "@/components/GlassCard"

const techStack = [
  { name: "REACT", icon: Code },
  { name: "NEXT.JS", icon: Globe },
  { name: "VITE", icon: Zap },
  { name: "EXPO", icon: Layers },
  { name: "SUPABASE", icon: Database },
  { name: "POSTGRES", icon: Database },
  { name: "EDGE", icon: Settings },
  { name: "PERF", icon: BarChart3 },
  { name: "RELIABILITY", icon: Shield },
]

export function Development() {
  const deliveryRhythm = [
    "Sprint planning + backlog grooming",
    "Design + engineering pairing sessions",
    "Weekly stakeholder reviews",
    "Retro + measurement cadence",
  ]

  const qualitySecurity = [
    "Automated QA suites + manual test plans",
    "Accessibility + performance budgets",
    "Security reviews + dependency scans",
    "Launch runbooks with rollback paths",
  ]

  return (
    <div className="space-y-12">
      {/* Hero Content */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Full-Stack Development</h2>
        <p className="text-lg md:text-xl text-white/80 mb-8">
          Custom web applications, APIs, databases, and scalable solutions built with modern tech
          stacks.
        </p>
        <FrostedButton href="/contact">Book a build sprint</FrostedButton>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <GlassCard>
          <h3 className="text-xl font-semibold mb-4">Product Discovery</h3>
          <p className="text-white text-sm">
            Rapid architecture mapping, user flows, and proof-of-concept builds to de-risk your
            roadmap and align teams quickly.
          </p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-semibold mb-4">Full-stack Delivery</h3>
          <p className="text-white text-sm">
            TypeScript-first stacks, API design, data modeling, automated QA, and CI/CD across web
            and mobile surfaces.
          </p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-semibold mb-4">Growth & Iteration</h3>
          <p className="text-white text-sm">
            Analytics instrumentation, experiment support, and performance tuning to sustain
            shipping velocity post-launch.
          </p>
        </GlassCard>
      </div>

      {/* Tech Stack */}
      <div>
        <h3 className="text-xl font-semibold mb-6 text-center">Modern stack expertise</h3>
        <p className="text-white mb-8 text-center max-w-2xl mx-auto">
          React 18, Vite, Expo, Supabase, PostgreSQL, serverless edge, plus observability and error
          budgets by default.
        </p>

        <div className="grid grid-cols-3 md:grid-cols-9 gap-6">
          {techStack.map((tech, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-neutral-900/70 border border-white/20 rounded-lg flex items-center justify-center mb-2">
                <tech.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-white text-center">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Process Breakdown */}
      <div className="grid md:grid-cols-2 gap-8">
        <GlassCard className="luxury-glass">
          <h3 className="text-xl font-semibold mb-6">Delivery rhythm</h3>
          <ul className="space-y-3">
            {deliveryRhythm.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-white mr-3">•</span>
                <span className="text-white text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="luxury-glass">
          <h3 className="text-xl font-semibold mb-6">Quality & security</h3>
          <ul className="space-y-3">
            {qualitySecurity.map((item, index) => (
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
