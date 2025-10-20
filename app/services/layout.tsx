import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | TD Studios",
  description: "Web design, development, and brand services. From luxury websites to full-stack platforms and social systems - complete digital solutions for ambitious brands.",
  alternates: {
    canonical: "https://tdstudiosdigital.com/services",
  },
  openGraph: {
    title: "Services | TD Studios",
    description: "Web design, development, and brand services. From luxury websites to full-stack platforms and social systems - complete digital solutions for ambitious brands.",
    url: "https://tdstudiosdigital.com/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | TD Studios",
    description: "Web design, development, and brand services. From luxury websites to full-stack platforms and social systems - complete digital solutions for ambitious brands.",
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}