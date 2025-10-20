import { Metadata } from "next"
import Image from "next/image"
import { PageTitle } from "@/components/page-title"
import { Section } from "@/components/section"
import { GlassCard } from "@/components/glass-card"
import { FrostedButton } from "@/components/frosted-button"
import { JsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Web Experience | TD Studios",
  description: "Premium website design and digital experiences built for conversion. Strategy, UX architecture, and marketing sites that turn visitors into customers.",
  alternates: {
    canonical: "https://tdstudiosdigital.com/web",
  },
  openGraph: {
    title: "Web Experience | TD Studios",
    description: "Premium website design and digital experiences built for conversion. Strategy, UX architecture, and marketing sites that turn visitors into customers.",
    url: "https://tdstudiosdigital.com/web",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Experience | TD Studios",
    description: "Premium website design and digital experiences built for conversion. Strategy, UX architecture, and marketing sites that turn visitors into customers.",
  },
}

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

export default function WebPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://tdstudiosdigital.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Web Experience",
        "item": "https://tdstudiosdigital.com/web",
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
              src="/web-hero.jpg"
              alt="Web experience design and development"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Website Design That Converts
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Premium website design with luxury aesthetics, conversion-focused UX, and stunning visual storytelling.
            </p>
            <FrostedButton href="/contact" analyticsLabel="Web - Start Project" analyticsPosition="Hero CTA">
              Start your project
            </FrostedButton>
          </div>
        </section>

        {/* Services Grid */}
        <Section id="services" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Build</h2>
              <p className="text-white/80 text-lg">Conversion-optimized web experiences for modern brands</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <GlassCard className="luxury-glass">
                <h3 className="text-xl font-semibold mb-4">Conversion-Ready Landers</h3>
                <p className="text-white text-sm">
                  Story-driven sections, SEO-focused architecture, and instrumented funnels built for measurable wins.
                </p>
              </GlassCard>

              <GlassCard className="luxury-glass">
                <h3 className="text-xl font-semibold mb-4">Scalable Marketing Sites</h3>
                <p className="text-white text-sm">
                  Modular content models, CMS-ready components, and asset optimization that keeps teams shipping fast.
                </p>
              </GlassCard>

              <GlassCard className="luxury-glass">
                <h3 className="text-xl font-semibold mb-4">Product Ecosystems</h3>
                <p className="text-white text-sm">
                  Unified brand, docs, and support surfaces powered by design systems and enterprise-grade hosting.
                </p>
              </GlassCard>
            </div>
          </div>
        </Section>

        {/* Outcome Focus */}
        <Section id="approach" className="py-20 bg-black/20">
          <div className="max-w-4xl mx-auto px-6">
            <GlassCard className="luxury-glass p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">Everything tied to outcomes</h3>
              <p className="text-white/90 text-lg leading-relaxed">
                We lead discovery, prototype reviews, and performance calibration alongside your marketing and product leads.
                Expect dependable handoff, documentation, and a roadmap for optimization.
              </p>
            </GlassCard>
          </div>
        </Section>

        {/* Process Breakdown */}
        <Section id="process" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
              <p className="text-white/80 text-lg">From discovery to launch, we handle every detail</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <GlassCard className="luxury-glass">
                <h3 className="text-xl font-semibold mb-6">Discovery checkpoints</h3>
                <ul className="space-y-3">
                  {discoveryCheckpoints.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-white/60 mr-3">•</span>
                      <span className="text-white/90 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="luxury-glass">
                <h3 className="text-xl font-semibold mb-6">Launch playbook</h3>
                <ul className="space-y-3">
                  {launchPlaybook.map((item, index) => (
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
            <h3 className="text-3xl font-bold mb-6">Ready to elevate your web presence?</h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss your project goals and create a website that drives results.
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
