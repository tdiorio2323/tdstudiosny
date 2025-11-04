import type { Metadata } from "next"
import { clients } from "@/features/clients/lib/clients-data"
import { JsonLd } from "@/features/seo/components/JsonLd"
import PortfolioClientPage from "./portfolio-client-page"

export const metadata: Metadata = {
  title: "Portfolio | TD Studios NY",
  description:
    "Explore our portfolio of luxury brand and web projects. See real results from e-commerce, creative agencies, and high-growth startups.",
  alternates: {
    canonical: "https://tdstudiosdigital.com/work",
  },
}

export default function PortfolioPage() {
  const itemListElement = clients.slice(0, 6).map((client, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: client.name,
      description: client.description,
      url: `https://tdstudiosdigital.com/work/${client.slug}`,
      industry: client.industry,
      datePublished: client.year ? `${client.year}-01-01` : undefined,
    },
  }))

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TD Studios Portfolio",
    description: "Explore our portfolio of premium brand and website projects across industries.",
    url: "https://tdstudiosdigital.com/work",
    mainEntity: {
      "@type": "ItemList",
      itemListElement,
    },
  }

  return (
    <>
      <JsonLd data={collectionSchema} />
      <PortfolioClientPage />
    </>
  )
}
