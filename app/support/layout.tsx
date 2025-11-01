import { generateSEOMetadata } from "@/features/seo/components/SeoHead"

export const metadata = generateSEOMetadata({
  title: "Support",
  description:
    "Get technical support, creative guidance, and project assistance from the TD Studios team. Live chat support for web design, development, and branding questions.",
  canonical: "/support",
})

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
