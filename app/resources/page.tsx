import { BookOpen, Download, Lightbulb, TrendingUp, Users, Video } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import { FrostedButton } from "@/components/FrostedButton"
import { GlassCard } from "@/components/GlassCard"

export const metadata: Metadata = {
  title: "Resources | TD Studios",
  description:
    "Free design guides, case studies, templates, and webinars. Learn luxury brand psychology, color theory, typography, and conversion optimization strategies.",
  alternates: {
    canonical: "https://tdstudiosdigital.com/resources",
  },
  openGraph: {
    title: "Resources | TD Studios",
    description:
      "Free design guides, case studies, templates, and webinars. Learn luxury brand psychology, color theory, typography, and conversion optimization strategies.",
    url: "https://tdstudiosdigital.com/resources",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources | TD Studios",
    description:
      "Free design guides, case studies, templates, and webinars. Learn luxury brand psychology, color theory, typography, and conversion optimization strategies.",
  },
}

// Type definitions for different resource types
interface BaseResource {
  title: string
  description: string
  type: string
  featured?: boolean
}

interface PDFGuide extends BaseResource {
  type: "PDF Guide"
  downloadSize: string
  pages: string
}

interface VideoTutorial extends BaseResource {
  type: "Video"
  duration: string
  level: string
}

interface CaseStudy extends BaseResource {
  type: "Case Study"
  readTime: string
  industry: string
}

interface ToolResource extends BaseResource {
  type: "Checklist" | "Assets"
  format: string
  items: string
}

type ResourceItem = PDFGuide | VideoTutorial | CaseStudy | ToolResource

interface ResourceCategory {
  category: string
  icon: LucideIcon
  items: ResourceItem[]
}

// Helper functions to safely access properties
const getResourceMetric = (item: ResourceItem): string => {
  if ("pages" in item) return item.pages
  if ("readTime" in item) return item.readTime
  if ("duration" in item) return item.duration
  if ("items" in item) return item.items
  return ""
}

const getDownloadSize = (item: ResourceItem): string | undefined => {
  if ("downloadSize" in item) return item.downloadSize
  return undefined
}

const getIndustry = (item: ResourceItem): string | undefined => {
  if ("industry" in item) return item.industry
  return undefined
}

const resources: ResourceCategory[] = [
  {
    category: "Design Guides",
    icon: BookOpen,
    items: [
      {
        title: "Luxury Brand Psychology: The Complete Guide",
        description:
          "Understanding the psychology behind luxury consumer behavior and how to design for it",
        type: "PDF Guide",
        downloadSize: "2.5MB",
        pages: "25 pages",
        featured: true,
      },
      {
        title: "Color Psychology in Premium Design",
        description: "How to use colors to convey luxury, trust, and exclusivity in your brand",
        type: "PDF Guide",
        downloadSize: "1.8MB",
        pages: "18 pages",
      },
      {
        title: "Typography for Luxury Brands",
        description: "Font selection and pairing strategies for premium brand positioning",
        type: "PDF Guide",
        downloadSize: "2.1MB",
        pages: "22 pages",
      },
    ],
  },
  {
    category: "Video Tutorials",
    icon: Video,
    items: [
      {
        title: "Creating Glass Morphism Effects",
        description: "Step-by-step tutorial on implementing modern glass effects in your designs",
        type: "Video",
        duration: "12 min",
        level: "Intermediate",
      },
      {
        title: "Luxury Website Animation Principles",
        description: "Micro-interactions and animations that enhance premium user experience",
        type: "Video",
        duration: "18 min",
        level: "Advanced",
      },
    ],
  },
  {
    category: "Case Studies",
    icon: TrendingUp,
    items: [
      {
        title: "From Startup to Luxury: A $2M Brand Transformation",
        description: "How we helped a tech startup achieve luxury positioning and 400% growth",
        type: "Case Study",
        readTime: "8 min",
        industry: "Technology",
        featured: true,
      },
      {
        title: "E-commerce Conversion Optimization: 300% Increase",
        description:
          "Premium design strategies that tripled conversion rates for a luxury retailer",
        type: "Case Study",
        readTime: "6 min",
        industry: "E-commerce",
      },
    ],
  },
  {
    category: "Templates & Tools",
    icon: Download,
    items: [
      {
        title: "Luxury Brand Audit Checklist",
        description: "Comprehensive checklist to evaluate your brand's luxury positioning",
        type: "Checklist",
        format: "PDF",
        items: "50+ checkpoints",
      },
      {
        title: "Premium Color Palettes Collection",
        description: "Curated color schemes used by top luxury brands worldwide",
        type: "Assets",
        format: "Figma + Adobe",
        items: "25 palettes",
      },
    ],
  },
]

const webinars = [
  {
    title: "Luxury Design Trends 2025",
    date: "January 15, 2025",
    time: "2:00 PM EST",
    description: "Upcoming design trends and how to implement them for premium brands",
    registrations: 120,
    maxCapacity: 200,
  },
  {
    title: "Converting Visitors into Premium Clients",
    date: "January 28, 2025",
    time: "3:00 PM EST",
    description: "Psychology-driven design strategies for luxury market conversion",
    registrations: 85,
    maxCapacity: 150,
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/resources-hero.jpg"
            alt="Educational resources and design guides for luxury brands"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40 md:bg-black/40 hero-overlay-mobile"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="mobile-title md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-white">
            Design Resources & Education
          </h1>
          <p className="mobile-subtitle md:text-xl text-white mb-8 max-w-2xl mx-auto">
            Free guides, case studies, and premium design insights to elevate your brand
          </p>
          <FrostedButton
            href="#featured-resources"
            analyticsLabel="Get Free Resources"
            analyticsPosition="Hero CTA"
          >
            Explore Free Resources
          </FrostedButton>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="relative py-20 px-6" id="featured-resources">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Resources</h2>
            <p className="text-white text-lg">Our most popular guides and insights</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {resources.map((category) =>
              category.items
                .filter((item) => item.featured)
                .map((item, index) => (
                  <GlassCard key={index} className="luxury-glass">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center">
                        <category.icon className="w-6 h-6 text-black" />
                      </div>
                      <div className="flex-1">
                        <span className="text-luxury-gold text-sm font-medium">
                          {category.category}
                        </span>
                        <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-white text-sm mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-white/60 text-xs">{getResourceMetric(item)}</div>
                      <FrostedButton
                        href="/contact?type=guide"
                        className="btn-primary text-sm"
                        analyticsLabel={`Download ${item.title}`}
                        analyticsPosition="Featured Resources"
                      >
                        Request Access
                      </FrostedButton>
                    </div>
                    <p className="text-white/50 text-xs mt-3">
                      We send every resource straight to your inbox once you submit the request
                      form.
                    </p>
                  </GlassCard>
                ))
            )}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Resource Library</h2>
            <p className="text-white text-lg">Everything you need to build a luxury brand</p>
          </div>

          {resources.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="flex items-center mb-8">
                <category.icon className="w-8 h-8 text-luxury-gold mr-4" />
                <h3 className="text-2xl font-bold">{category.category}</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mobile-grid">
                {category.items.map((item, itemIndex) => (
                  <GlassCard key={itemIndex} className="glass-variable">
                    <div className="mb-4">
                      <span className="text-luxury-gold text-xs font-medium uppercase tracking-wider">
                        {item.type}
                      </span>
                      <h4 className="text-lg font-semibold mb-2 text-white">{item.title}</h4>
                      <p className="text-white text-sm mb-4">{item.description}</p>
                    </div>

                    <div className="flex items-center justify-between text-white/60 text-xs mb-4">
                      <span>{getResourceMetric(item)}</span>
                      {getDownloadSize(item) && <span>{getDownloadSize(item)}</span>}
                      {getIndustry(item) && <span>{getIndustry(item)}</span>}
                    </div>

                    <FrostedButton
                      href="/contact?type=guide"
                      className="w-full text-sm"
                      analyticsLabel={`Access ${item.title}`}
                      analyticsPosition={`${category.category} Section`}
                    >
                      Get Resource
                    </FrostedButton>
                  </GlassCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Webinars</h2>
            <p className="text-white text-lg">Live sessions with luxury design experts</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {webinars.map((webinar, index) => (
              <GlassCard key={index} className="luxury-glass">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-info rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-info text-sm font-medium mb-1">
                      {webinar.date} at {webinar.time}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{webinar.title}</h3>
                  </div>
                </div>
                <p className="text-white text-sm mb-4">{webinar.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white/60 text-xs">
                    {webinar.registrations}/{webinar.maxCapacity} registered
                  </div>
                  <div className="w-32 bg-neutral-800 rounded-full h-2">
                    <div
                      className="bg-info h-2 rounded-full"
                      style={{ width: `${(webinar.registrations / webinar.maxCapacity) * 100}%` }}
                    />
                  </div>
                </div>
                <FrostedButton
                  href="/contact?type=webinar"
                  className="w-full btn-primary"
                  analyticsLabel={`Register ${webinar.title}`}
                  analyticsPosition="Webinars Section"
                >
                  Register Free
                </FrostedButton>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <GlassCard className="glass-premium p-12">
            <Lightbulb className="w-16 h-16 text-luxury-gold mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Brand?</h2>
            <p className="text-white text-lg mb-8">
              Get personalized guidance on implementing these strategies for your specific brand and
              industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <FrostedButton
                href="/contact?type=consultation"
                className="btn-primary"
                analyticsLabel="Book Strategy Call"
                analyticsPosition="Resources CTA"
              >
                Book Strategy Call
              </FrostedButton>
              <FrostedButton
                href="/contact"
                className="btn-secondary"
                analyticsLabel="Start Project"
                analyticsPosition="Resources CTA"
              >
                Start Full Project
              </FrostedButton>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}
