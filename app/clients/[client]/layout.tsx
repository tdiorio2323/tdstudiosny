import { Metadata } from "next"

interface ClientPortalLayoutProps {
  params: Promise<{
    client: string
  }>
}

export async function generateMetadata({ params }: ClientPortalLayoutProps): Promise<Metadata> {
  const { client } = await params

  return {
    title: `Client Portal | ${client.charAt(0).toUpperCase() + client.slice(1)} | TD Studios`,
    description: `Private client portal for ${client}. Access your project files, resources, and collaboration tools.`,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `https://tdstudiosdigital.com/clients/${client}`,
    },
    openGraph: {
      title: `Client Portal | ${client.charAt(0).toUpperCase() + client.slice(1)} | TD Studios`,
      description: `Private client portal for ${client}. Access your project files, resources, and collaboration tools.`,
      url: `https://tdstudiosdigital.com/clients/${client}`,
      siteName: "TD Studios",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `Client Portal | ${client.charAt(0).toUpperCase() + client.slice(1)} | TD Studios`,
      description: `Private client portal for ${client}. Access your project files, resources, and collaboration tools.`,
    },
  }
}

export default function ClientPortalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
