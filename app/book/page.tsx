import { Metadata } from "next"
import { PageTitle } from "@/components/page-title"
import { CalendlyEmbed } from "@/components/calendly-embed"
import { JsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Book a Consultation | TD Studios",
  description: "Schedule a free 30-minute consultation with TD Studios. Discuss your web design, development, or branding project with our team. No commitment required.",
  alternates: {
    canonical: "https://tdstudiosny.com/book",
  },
  openGraph: {
    title: "Book a Consultation | TD Studios",
    description: "Schedule a free 30-minute consultation with TD Studios. Discuss your web design, development, or branding project with our team. No commitment required.",
    url: "https://tdstudiosny.com/book",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Consultation | TD Studios",
    description: "Schedule a free 30-minute consultation with TD Studios. Discuss your web design, development, or branding project with our team. No commitment required.",
  },
}

export default function BookPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://tdstudiosny.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Book",
        "item": "https://tdstudiosny.com/book",
      },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="min-h-screen py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <PageTitle
            eyebrow="Let's Talk"
            title="Book a Free Consultation"
            subtitle="Schedule a 30-minute call to discuss your project goals, timeline, and budget. No commitment required."
          />

          <div className="bg-neutral-900/70 backdrop-blur-sm border border-white/10 rounded-lg p-4 md:p-8">
            <CalendlyEmbed
              url="https://calendly.com/tyler-tdstudiosny/consultation-call"
              height={760}
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/80 text-sm">
              Prefer to email? Reach us at{" "}
              <a href="mailto:hello@tdstudiosny.com" className="text-white underline hover:text-white/80 min-h-[44px]">
                hello@tdstudiosny.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
