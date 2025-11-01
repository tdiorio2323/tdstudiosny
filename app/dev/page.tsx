import { Code, Database, Globe, Layers, Shield, Zap, Settings, BarChart3 } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import { FrostedButton } from "@/components/FrostedButton"
import { GlassCard } from "@/components/GlassCard"
import { Section } from "@/components/Section"
import { JsonLd } from "@/features/seo/components/JsonLd"

export const metadata: Metadata = {
  title: "Product & Platform Development | TD Studios",
  description:
    "Full-stack development for platforms, SaaS apps, and digital products. React, Next.js, TypeScript, Supabase, and modern tech stacks built to scale.",
  alternates: {
    canonical: "https://tdstudiosdigital.com/dev",
  },
  openGraph: {
    title: "Product & Platform Development | TD Studios",
    description:
      "Full-stack development for platforms, SaaS apps, and digital products. React, Next.js, TypeScript, Supabase, and modern tech stacks built to scale.",
    url: "https://tdstudiosdigital.com/dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product & Platform Development | TD Studios",
    description:
      "Full-stack development for platforms, SaaS apps, and digital products. React, Next.js, TypeScript, Supabase, and modern tech stacks built to scale.",
  },
}

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

export default function DevPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://tdstudiosdigital.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Development",
        item: "https://tdstudiosdigital.com/dev",
      },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/design-hero.jpg"
              alt="Full-stack product and platform development"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Full-Stack Development
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Custom web applications, APIs, databases, and scalable solutions built with modern
              tech stacks.
            </p>
            <FrostedButton
              href="/contact"
              analyticsLabel="Dev - Book Sprint"
              analyticsPosition="Hero CTA"
            >
              Book a build sprint
            </FrostedButton>
          </div>
        </section>

        {/* Services Grid */}
        <Section id="services" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Build</h2>
              <p className="text-white/80 text-lg">
                End-to-end product development for ambitious teams
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <GlassCard className="luxury-glass">
                <h3 className="text-xl font-semibold mb-4">Product Discovery</h3>
                <p className="text-white text-sm">
                  Rapid architecture mapping, user flows, and proof-of-concept builds to de-risk
                  your roadmap and align teams quickly.
                </p>
              </GlassCard>

              <GlassCard className="luxury-glass">
                <h3 className="text-xl font-semibold mb-4">Full-stack Delivery</h3>
                <p className="text-white text-sm">
                  TypeScript-first stacks, API design, data modeling, automated QA, and CI/CD across
                  web and mobile surfaces.
                </p>
              </GlassCard>

              <GlassCard className="luxury-glass">
                <h3 className="text-xl font-semibold mb-4">Growth & Iteration</h3>
                <p className="text-white text-sm">
                  Analytics instrumentation, experiment support, and performance tuning to sustain
                  shipping velocity post-launch.
                </p>
              </GlassCard>
            </div>
          </div>
        </Section>

        {/* Tech Stack */}
        <Section id="tech" className="py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
              Modern stack expertise
            </h3>
            <p className="text-white/80 mb-12 text-center max-w-2xl mx-auto text-lg">
              React 18, Vite, Expo, Supabase, PostgreSQL, serverless edge, plus observability and
              error budgets by default.
            </p>

            <div className="grid grid-cols-3 md:grid-cols-9 gap-6 max-w-5xl mx-auto">
              {techStack.map((tech, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-neutral-900/70 border border-white/20 rounded-lg flex items-center justify-center mb-2 hover:bg-neutral-900/90 transition-colors">
                    <tech.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-white/80 text-center">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Process Breakdown */}
        <Section id="process" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
              <p className="text-white/80 text-lg">Agile delivery with quality built in</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <GlassCard className="luxury-glass">
                <h3 className="text-xl font-semibold mb-6">Delivery rhythm</h3>
                <ul className="space-y-3">
                  {deliveryRhythm.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-white/60 mr-3">•</span>
                      <span className="text-white/90 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="luxury-glass">
                <h3 className="text-xl font-semibold mb-6">Quality & security</h3>
                <ul className="space-y-3">
                  {qualitySecurity.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-white/60 mr-3">•</span>
                      <span className="text-white/90 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section id="cta" className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold mb-6">Ready to build your product?</h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Let's scope your project and get your development roadmap started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <FrostedButton href="/contact" className="btn-primary">
                Start Your Project
              </FrostedButton>
              <FrostedButton href="/work" className="btn-secondary">
                View Our Work
              </FrostedButton>
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}
