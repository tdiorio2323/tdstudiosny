import { Metadata } from "next"

interface ClientSignInLayoutProps {
  params: Promise<{
    client: string
  }>
}

export async function generateMetadata({ params }: ClientSignInLayoutProps): Promise<Metadata> {
  const { client } = await params
  
  return {
    title: `Client Access | ${client.charAt(0).toUpperCase() + client.slice(1)} | TD Studios`,
    description: `Secure client portal access for ${client}. Enter your access code to view project files and resources.`,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `https://tdstudiosdigital.com/${client}/signin`,
    },
    openGraph: {
      title: `Client Access | ${client.charAt(0).toUpperCase() + client.slice(1)} | TD Studios`,
      description: `Secure client portal access for ${client}. Enter your access code to view project files and resources.`,
      url: `https://tdstudiosdigital.com/${client}/signin`,
      siteName: "TD Studios",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `Client Access | ${client.charAt(0).toUpperCase() + client.slice(1)} | TD Studios`,
      description: `Secure client portal access for ${client}. Enter your access code to view project files and resources.`,
    },
  }
}

export default function ClientSignInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}