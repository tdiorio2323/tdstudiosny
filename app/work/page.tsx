import PortfolioClientPage from './portfolio-client-page'
import { JsonLd } from '@/components/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio | TD Studios NY',
  description: 'Explore our portfolio of luxury brand and web projects. See real results from e-commerce, creative agencies, and high-growth startups.',
  alternates: {
    canonical: 'https://tdstudiosdigital.com/work',
  },
}

export default function PortfolioPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "TD Studios Portfolio",
    "description": "Explore our portfolio of premium brand and website projects across industries.",
    "url": "https://tdstudiosdigital.com/work",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "CreativeWork",
          "name": "Client Success Stories",
          "description": "Discover how we've transformed brands through strategic design and development"
        }
      ]
    }
  }

  return (
    <>
      <JsonLd data={collectionSchema} />
      <PortfolioClientPage />
    </>
  )
}
