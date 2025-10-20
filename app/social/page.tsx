import { Metadata } from "next"
import Image from "next/image"
import { PageTitle } from "@/components/page-title"
import { Section } from "@/components/section"
import { GlassCard } from "@/components/glass-card"
import { FrostedButton } from "@/components/frosted-button"
import { JsonLd } from "@/components/json-ld"
import { Share2, TrendingUp, Users, Calendar, BarChart3, Target } from "lucide-react"

export const metadata: Metadata = {
  title: "Social Media Marketing | TD Studios",
  description: "Social media strategy, content creation, and community management. Instagram, LinkedIn, TikTok campaigns that drive engagement and conversions.",
  alternates: {
    canonical: "https://tdstudiosdigital.com/social",
  },
  openGraph: {
    title: "Social Media Marketing | TD Studios",
    description: "Social media strategy, content creation, and community management. Instagram, LinkedIn, TikTok campaigns that drive engagement and conversions.",
    url: "https://tdstudiosdigital.com/social",
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Marketing | TD Studios",
    description: "Social media strategy, content creation, and community management. Instagram, LinkedIn, TikTok campaigns that drive engagement and conversions.",
  },
}

const contentStrategy = [
  "Brand voice + messaging framework development",
  "Content calendar planning and editorial scheduling",
  "Platform-specific content adaptation and optimization",
  "Performance analytics and engagement tracking",
]

const campaignDeliverables = [
  "Campaign creative assets and template systems",
  "Social media kit with brand-consistent graphics",
  "Community management playbooks and response scripts",
  "Growth measurement dashboards and reporting",
]

const platforms = [
  { name: "Instagram", icon: Share2 },
  { name: "LinkedIn", icon: Users },
  { name: "Twitter/X", icon: TrendingUp },
  { name: "TikTok", icon: Target },
  { name: "Facebook", icon: Users },
  { name: "YouTube", icon: BarChart3 },
]

export default function SocialPage() {
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
        "name": "Social Media Marketing",
        "item": "https://tdstudiosdigital.com/social",
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
              src="/social-hero-image.jpg"
              alt="Social media marketing and content strategy"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Social Media That Converts
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Editorial programming, campaign kits, and community ops that sustain growth and build authentic connections.
            </p>
            <FrostedButton href="/contact" analyticsLabel="Social - Start Campaign" analyticsPosition="Hero CTA">
              Start your campaign
            </FrostedButton>
          </div>
        </section>

        {/* Services Grid */}
        <Section id="services" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Deliver</h2>
              <p className="text-white/80 text-lg">Comprehensive social media solutions for premium brands</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <GlassCard className="luxury-glass">
                <Share2 className="w-10 h-10 text-white mb-4" />
                <h3 className="text-xl font-semibold mb-4">Content Strategy & Planning</h3>
                <p className="text-white text-sm">
                  Brand voice development, editorial calendars, and platform-specific content strategies that align with your business goals.
                </p>
              </GlassCard>

              <GlassCard className="luxury-glass">
                <Target className="w-10 h-10 text-white mb-4" />
                <h3 className="text-xl font-semibold mb-4">Campaign Development</h3>
                <p className="text-white text-sm">
                  Multi-platform campaigns with cohesive creative assets, messaging frameworks, and performance tracking systems.
                </p>
              </GlassCard>

              <GlassCard className="luxury-glass">
                <Users className="w-10 h-10 text-white mb-4" />
                <h3 className="text-xl font-semibold mb-4">Community Management</h3>
                <p className="text-white text-sm">
                  Engagement strategies, response protocols, and relationship building that turn followers into brand advocates.
                </p>
              </GlassCard>
            </div>
          </div>
        </Section>

        {/* Platform Expertise */}
        <Section id="platforms" className="py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Platform Expertise</h3>
            <p className="text-white/80 mb-12 text-center max-w-2xl mx-auto text-lg">
              We create platform-native content that performs across all major social channels.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
              {platforms.map((platform, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-neutral-900/70 border border-white/20 rounded-lg flex items-center justify-center mb-2 hover:bg-neutral-900/90 transition-colors">
                    <platform.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-white/80 text-center">{platform.name}</span>
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
              <p className="text-white/80 text-lg">From strategy to execution, we handle every detail</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <GlassCard className="luxury-glass">
                <h3 className="text-xl font-semibold mb-6">Content Strategy</h3>
                <ul className="space-y-3">
                  {contentStrategy.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-white/60 mr-3">•</span>
                      <span className="text-white/90 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="luxury-glass">
                <h3 className="text-xl font-semibold mb-6">Campaign Deliverables</h3>
                <ul className="space-y-3">
                  {campaignDeliverables.map((item, index) => (
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

        {/* Results Focus */}
        <Section id="results" className="py-20 bg-black/20">
          <div className="max-w-4xl mx-auto px-6">
            <GlassCard className="luxury-glass p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">Measurement-Driven Approach</h3>
              <p className="text-white/90 text-lg leading-relaxed mb-6">
                Every campaign includes comprehensive analytics tracking, engagement metrics, and growth measurement. We optimize based on real performance data, not assumptions.
              </p>
              <p className="text-white/80 text-base leading-relaxed">
                Monthly reporting, A/B testing recommendations, and continuous content optimization keep your social presence growing sustainably.
              </p>
            </GlassCard>
          </div>
        </Section>

        {/* CTA */}
        <Section id="cta" className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold mb-6">Ready to grow your social presence?</h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Let's build a social media strategy that drives engagement and converts followers into customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <FrostedButton href="/contact" className="btn-primary">
                Start Your Campaign
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
