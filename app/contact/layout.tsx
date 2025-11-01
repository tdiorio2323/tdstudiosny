import { generateSEOMetadata } from "@/features/seo/components/SeoHead"

export const metadata = generateSEOMetadata({
  title: "Contact",
  description:
    "Start your luxury design project with TD Studios. Get quotes for web design, product development, branding, and social media marketing.",
  canonical: "/contact",
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
