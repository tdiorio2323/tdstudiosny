import { clsx, type ClassValue } from "clsx"
import type { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate metadata with canonical URL for a given page path
 * @param path - The page path (e.g., '/work', '/contact')
 * @param metadata - Additional metadata to merge
 * @returns Metadata object with canonical URL
 */
export function createMetadata(path: string, metadata?: Partial<Metadata>): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tdstudiosdigital.com"
  const canonicalUrl = `${baseUrl}${path}`

  return {
    ...metadata,
    alternates: {
      canonical: canonicalUrl,
      ...metadata?.alternates,
    },
  }
}
