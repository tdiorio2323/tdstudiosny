"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import ShareButton from "@/features/marketing/components/ShareButton"
import { JsonLd } from "@/features/seo/components/JsonLd"
import { Design } from "./_components/Design"
import { Development } from "./_components/Development"
import { WebExperience } from "./_components/WebExperience"

type Tab = "design" | "dev" | "web"

export default function ServicesPage() {
  const searchParams = useSearchParams()
  const currentTab = (searchParams.get("tab") as Tab) || "design"

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: "design", label: "Design" },
    { id: "dev", label: "Development" },
    { id: "web", label: "Web Experience" },
  ]

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://tdstudiosdigital.com/services",
    name: "TD Studios Design & Development Services",
    description:
      "Comprehensive design and development services including branding, web development, and user experience design for premium brands.",
    provider: {
      "@type": "Organization",
      name: "TD Studios",
      url: "https://tdstudiosdigital.com",
    },
    serviceType: ["Brand Design", "Web Development", "User Experience Design"],
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "TD Studios Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Brand Identity Design",
            description:
              "Complete visual identity systems including logos, color palettes, and brand guidelines",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            description: "Custom websites and web applications built with modern technologies",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "User Experience Design",
            description: "User-centered design and interface optimization for digital products",
          },
        },
      ],
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://tdstudiosdigital.com/contact",
    },
  }

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
        name: "Services",
        item: "https://tdstudiosdigital.com/services",
      },
    ],
  }

  return (
    <>
      <ShareButton />
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-neutral-900/70 backdrop-blur-sm rounded-lg p-1 border border-white/10">
              {tabs.map((tab) => (
                <Link
                  key={tab.id}
                  href={`/services?tab=${tab.id}`}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    currentTab === tab.id ? "bg-white text-black" : "text-white/80 hover:text-white"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="transition-opacity duration-300">
            {currentTab === "design" && <Design />}
            {currentTab === "dev" && <Development />}
            {currentTab === "web" && <WebExperience />}
          </div>
        </div>
      </div>
    </>
  )
}
