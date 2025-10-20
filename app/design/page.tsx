import { Metadata } from "next"
import Image from "next/image"
import { PageTitle } from "@/components/page-title"
import { Section } from "@/components/section"
import { GlassCard } from "@/components/glass-card"
import { FrostedButton } from "@/components/frosted-button"
import { JsonLd } from "@/components/json-ld"
import { Palette, Image as ImageIcon, Layout, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Graphic Design & Brand Identity | TD Studios",
  description: "Luxury brand identity and visual design. Logo design, brand guidelines, color systems, and typography for premium brands seeking market differentiation.",
  alternates: {
    canonical: "https://tdstudiosdigital.com/design",
  },
  openGraph: {
    title: "Graphic Design & Brand Identity | TD Studios",
    description: "Luxury brand identity and visual design. Logo design, brand guidelines, color systems, and typography for premium brands seeking market differentiation.",
    url: "https://tdstudiosdigital.com/design",
  },
  twitter: {
    card: "summary_large_image",
    title: "Graphic Design & Brand Identity | TD Studios",
    description: "Luxury brand identity and visual design. Logo design, brand guidelines, color systems, and typography for premium brands seeking market differentiation.",
  },
}

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

export default function DesignPage() {
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
        "name": "Graphic Design",
        "item": "https://tdstudiosdigital.com/design",
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
              src="/design-showcase-1.jpg"
              alt="Luxury brand design and identity"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Luxury Brand Design
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Premium brand identity and visual design that elevates your market position and builds lasting customer connections.
            </p>
            <FrostedButton href="/contact" analyticsLabel="Design - Start Transformation" analyticsPosition="Hero CTA">
              Start your brand transformation
            </FrostedButton>
          </div>
        </section>

        {/* Services Grid */}
        <Section id="services" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Create</h2>
              <p className="text-white/80 text-lg">Comprehensive visual identity systems for premium brands</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <GlassCard className="luxury-glass">
                <Sparkles className="w-10 h-10 text-white mb-4" />
                <h3 className="text-xl font-semibold mb-4">Brand Identity Systems</h3>
                <p className="text-white text-sm">
                  Brand identity systems, logo design, and visual language that communicates premium positioning and builds trust.
                </p>
              </GlassCard>

              <GlassCard className="luxury-glass">
                <Palette className="w-10 h-10 text-white mb-4" />
                <h3 className="text-xl font-semibold mb-4">Luxury Branding</h3>
                <p className="text-white text-sm">
                  Color palettes, typography, iconography, and brand guidelines crafted for sophisticated market positioning.
                </p>
              </GlassCard>

              <GlassCard className="luxury-glass">
                <ImageIcon className="w-10 h-10 text-white mb-4" />
                <h3 className="text-xl font-semibold mb-4">Digital Assets</h3>
                <p className="text-white text-sm">
                  Marketing materials, social media templates, and digital brand assets optimized for consistent brand experiences.
                </p>
              </GlassCard>
            </div>
          </div>
        </Section>

        {/* Brand Philosophy */}
        <Section id="philosophy" className="py-20 bg-black/20">
          <div className="max-w-4xl mx-auto px-6">
            <GlassCard className="luxury-glass p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">Timeless Design Philosophy</h3>
              <p className="text-white/90 text-lg leading-relaxed mb-6">
                We believe great design transcends trends. Every brand identity we create is built on strategic foundations—understanding your audience, market position, and business goals before a single pixel is placed.
              </p>
              <p className="text-white/80 text-base leading-relaxed">
                The result: visual systems that feel both contemporary and enduring, communicating luxury and authority without ever feeling dated.
              </p>
            </GlassCard>
          </div>
        </Section>

        {/* Process Breakdown */}
        <Section id="process" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
              <p className="text-white/80 text-lg">From discovery to delivery, every step is intentional</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <GlassCard className="luxury-glass">
                <h3 className="text-xl font-semibold mb-6">Design Process</h3>
                <ul className="space-y-3">
                  {designProcess.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-white/60 mr-3">•</span>
                      <span className="text-white/90 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="luxury-glass">
                <h3 className="text-xl font-semibold mb-6">Brand Deliverables</h3>
                <ul className="space-y-3">
                  {brandDeliverables.map((item, index) => (
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

        {/* Featured Work Preview */}
        <Section id="featured" className="py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Brand Work</h2>
              <p className="text-white/80 text-lg">See how we've transformed brands across industries</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <GlassCard className="overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="aspect-square bg-neutral-900/50 relative">
                  <Image
                    src="/design-showcase-2.jpg"
                    alt="Brand identity showcase"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2">Premium E-Commerce</h4>
                  <p className="text-white/80 text-sm">Full brand identity and digital asset library</p>
                </div>
              </GlassCard>

              <GlassCard className="overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="aspect-square bg-neutral-900/50 relative">
                  <Image
                    src="/design-showcase-3.jpg"
                    alt="Brand identity showcase"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2">Tech Startup</h4>
                  <p className="text-white/80 text-sm">Modern brand system with scalable components</p>
                </div>
              </GlassCard>

              <GlassCard className="overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="aspect-square bg-neutral-900/50 relative">
                  <Image
                    src="/modern-design-system-interface.png"
                    alt="Brand identity showcase"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2">Luxury Service</h4>
                  <p className="text-white/80 text-sm">Sophisticated identity for premium positioning</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section id="cta" className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold mb-6">Ready to elevate your brand?</h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Let's create a visual identity that communicates your value and resonates with your ideal customers.
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
