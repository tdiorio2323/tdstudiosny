// app/work/[slug]/page.tsx - Refactored Content

import { generateSEOMetadata } from "@/components/seo-head"
import { clients } from "@/lib/clients-data"
import { notFound } from "next/navigation"
import Image from "next/image"
import { FrostedButton } from "@/components/frosted-button"
import { GlassCard } from "@/components/glass-card"
import { ArrowLeft, Globe } from "lucide-react" // Only kept Globe, removed Social Icons
import Link from "next/link"
import { JsonLd } from "@/components/json-ld"
import { CaseStudyDetailContent } from "@/components/CaseStudyDetailContent" // New Import

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  return clients.map((client) => ({
    slug: client.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const client = clients.find((c) => c.slug === params.slug)
  if (!client) {
    return generateSEOMetadata({
      title: "Project Not Found",
      description: "The requested project could not be found.",
    })
  }
  // FIXED Template Literals using backticks (``)
  return generateSEOMetadata({
    title: `${client.name} - Case Study`,
    description: client.description || `Case study for ${client.name} by TD Studios.`,
    canonical: `/work/${client.slug}`,
    ogImage: client.gallery[0], // Pass the first image as ogImage
  })
}

export default function ClientCaseStudyPage({ params }: Props) {
  const client = clients.find((c) => c.slug === params.slug)

  if (!client) {
    notFound()
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://tdstudiosny.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Work",
        "item": "https://tdstudiosny.com/work",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": client.name,
        // FIXED Template Literal using backticks (``)
        "item": `https://tdstudiosny.com/work/${client.slug}`,
      },
    ],
  }

  return (
    <main className="min-h-dvh bg-background">
      <JsonLd data={breadcrumbSchema} />
      {/* Hero Section */}
      <section className="relative min-h-screen md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={client.heroImage || client.gallery[0] || "https://i.imgur.com/a1bXC5y.png"}
            alt={`${client.name} Hero Image`}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40 md:bg-black/40 hero-overlay-mobile"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-white">{client.name}</h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            {client.tagline || "A case study in premium design and development."}
          </p>
          <FrostedButton href="/contact" className="px-8 py-4 text-lg font-semibold">
            Start Your Project
          </FrostedButton>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-24 bg-black/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column: Overview (Static Info) */}
            <div className="lg:col-span-1">
              <GlassCard className="p-8 sticky top-24">
                <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
                <div className="space-y-4 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Client</h3>
                    <p className="text-white/80">{client.name}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Industry</h3>
                    <p className="text-white/80">{client.industry}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Year</h3>
                    <p className="text-white/80">{client.year}</p>
                  </div>
                  {client.websiteUrl && (
                    <div>
                      <h3 className="text-lg font-semibold text-white">Website</h3>
                      <a
                        href={client.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-luxury-gold hover:underline flex items-center gap-2"
                      >
                        Visit Website <Globe className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>

                {client.services.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">Services Provided</h3>
                    <div className="flex flex-wrap gap-2">
                      {client.services.map((service) => (
                        <span
                          key={service}
                          className="px-4 py-2 bg-neutral-900/80 border border-white/20 rounded-full text-sm text-white"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Link href="/work" className="text-luxury-gold hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back to Portfolio
                </Link>
              </GlassCard>
            </div>

            {/* Right Column: Uses reusable content component */}
            <div className="lg:col-span-2">
                <CaseStudyDetailContent client={client} />
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <GlassCard className="p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Elevate Your Brand?</h2>
            <p className="text-white text-lg mb-8">
              Let's discuss your vision and create a digital experience that stands out.
            </p>
            <FrostedButton href="/contact" className="px-8 py-4 text-lg font-semibold">
              Get in Touch
            </FrostedButton>
          </GlassCard>
        </div>
      </section>
    </main>
  )
}
