import Link from "next/link"
import { Section } from "@/components/section"
import { GlassCard } from "@/components/glass-card"
import { JsonLd } from "@/components/json-ld"
import { HeroSection } from "@/components/hero-section"
import heroImage from "@/public/main-background.webp"

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TD Studios",
    "alternateName": "TD Studios NY",
    "url": "https://tdstudiosdigital.com",
    "logo": "https://tdstudiosdigital.com/logo.png",
    "description": "High-end websites, branding, and marketing systems engineered for creators and ambitious brands.",
    "foundingDate": "2023",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressRegion": "NY"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "url": "https://tdstudiosdigital.com/contact",
      "email": "hello@tdstudiosny.com"
    },
    "serviceArea": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web Design & Development",
          "description": "Custom websites and web applications"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Brand Identity Design",
          "description": "Complete brand identity and visual design systems"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Social Media Marketing",
          "description": "Social media strategy and content creation"
        }
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "ratingCount": "15"
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TD Studios",
    "url": "https://tdstudiosdigital.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://tdstudiosdigital.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <main id="main-content" className="flex flex-col">
      {/* Hero Section with Fade-on-Scroll Effect */}
      <HeroSection heroImage={heroImage} />

      {/* What We Do */}
      <Section innerClassName="text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-white">What We Do</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Web", href: "/web", desc: "Website design and marketing experiences." },
            { name: "Dev", href: "/dev", desc: "Platform and system development." },
            { name: "Social", href: "/social", desc: "Content and social media growth systems." },
            { name: "Design", href: "/design", desc: "Branding and visual identity design." },
          ].map((s) => (
            <GlassCard key={s.name} className="luxury-glass transition-transform hover:scale-105">
              <div className="stack-sm text-left">
                <h3 className="text-2xl font-bold text-white">{s.name}</h3>
                <p className="text-sm text-white/80">{s.desc}</p>
                <Link
                  href={s.href}
                  className="inline-block text-sm text-white/90 transition-colors hover:text-white hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Why TD Studios */}
      <Section className="bg-black/20" innerClassName="text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-semibold text-white">Why TD Studios</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Luxury Execution",
              text: "Every detail is refined for precision and impact. Presentation matters.",
            },
            {
              title: "System-Driven Design",
              text: "Our framework scales your business across platforms and automations.",
            },
            {
              title: "Proven Results",
              text: "Projects that convert, perform, and grow your brand's authority.",
            },
          ].map((x) => (
            <GlassCard key={x.title} className="luxury-glass text-left">
              <div className="stack-sm">
                <h3 className="text-xl font-bold text-white">{x.title}</h3>
                <p className="text-white/80">{x.text}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-24" innerClassName="text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-white">Bring Your Vision to Life</h2>
        <Link
          href="/contact"
          className="inline-block rounded-full border border-white/30 bg-gradient-to-r from-white/20 to-white/10 px-10 py-4 text-sm font-medium tracking-wide text-white transition hover:from-white/30 hover:to-white/20"
        >
          Start a Project
        </Link>
      </Section>
    </main>
    </>
  )
}
