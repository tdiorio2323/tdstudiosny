import type { Metadata } from "next"

interface SEOHeadProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  noindex?: boolean
  keywords?: string[]
}

/**
 * Generate SEO-optimized metadata for Next.js pages
 *
 * @param title - Page title (will be suffixed with " | TD Studios")
 * @param description - Meta description (140-160 characters recommended)
 * @param canonical - Canonical URL (optional, defaults to tdstudiosdigital.com + path)
 * @param ogImage - OpenGraph image URL (optional, defaults to /og-image.webp)
 * @param noindex - Set to true to prevent indexing (for client portals, etc.)
 * @param keywords - SEO keywords (optional, primarily for reference)
 *
 * @example
 * ```tsx
 * export const metadata = generateSEOMetadata({
 *   title: "Our Work",
 *   description: "Explore our portfolio of luxury brand and web projects.",
 *   canonical: "/work"
 * })
 * ```
 */
export function generateSEOMetadata({
  title,
  description,
  canonical,
  ogImage = "/og-image.webp",
  noindex = false,
  keywords = [],
}: SEOHeadProps): Metadata {
  const baseUrl = "https://tdstudiosdigital.com"
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : undefined
  const fullTitle = `${title} | TD Studios`
  const imageUrl = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: "TD Studios",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - TD Studios`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  }
}
