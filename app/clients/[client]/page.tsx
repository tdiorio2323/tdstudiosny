import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { clientAccessProfiles } from "@/lib/client-access"
import { verifySession } from "@/lib/utils/auth"

interface ClientPortalPageProps {
  params: Promise<{
    client: string
  }>
}

const sections = [
  {
    id: "files",
    title: "Files",
    description: "Brand guidelines, photos, videos, and editable templates ready for use.",
    cta: "Open Library",
  },
  {
    id: "clients",
    title: "Clients",
    description: "Testimonials, case studies, and collaboration notes for upcoming launches.",
    cta: "View Partners",
  },
  {
    id: "schedule",
    title: "Schedule",
    description: "Production calendar, shoot dates, and live campaign checkpoints.",
    cta: "See Timeline",
  },
  {
    id: "vault",
    title: "Vault",
    description: "Secure space for contracts, API keys, and credentials managed by TD Studios.",
    cta: "Access Vault",
  },
]

export default async function ClientPortalPage({ params }: ClientPortalPageProps) {
  const { client } = await params

  // Authentication disabled - direct access allowed
  const profile = clientAccessProfiles[client?.toLowerCase()]

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-center text-sm tracking-wide uppercase">Client portal unavailable</p>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${profile.backgroundPath})` }}
    >
      <div className="min-h-screen bg-black/70 backdrop-blur-md">
        <header className="border-b border-white/10 bg-white/90 backdrop-blur flex flex-col items-center px-6 py-8">
          <div className="relative h-20 w-20 mb-4">
            <Image
              src={profile.logoPath}
              alt={`${profile.displayName} logo`}
              fill
              sizes="80px"
              priority
              className="object-contain"
            />
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-xs md:text-sm tracking-[0.4em] uppercase text-black/80">
            {sections.map((section) => (
              <Link key={section.id} href={`#${section.id}`} className="hover:text-black transition-colors">
                {section.title}
              </Link>
            ))}
          </nav>
        </header>

        <main className="px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
            {sections.map((section) => (
              <section
                id={section.id}
                key={section.id}
                className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
              >
                <h1 className="text-2xl font-semibold text-white mb-4 tracking-wide">{section.title}</h1>
                <p className="text-white/80 text-sm leading-relaxed mb-6">{section.description}</p>
                <button className="inline-flex items-center justify-center rounded-full border border-yellow-300/60 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 px-5 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-black shadow-[0_12px_32px_rgba(255,200,60,0.45)] transition-all duration-200 hover:from-yellow-400 hover:to-yellow-400 active:scale-[0.98] min-h-[44px] px-4 py-3">
                  {section.cta}
                </button>
              </section>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-5xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 text-white shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
            <h3 className="text-xl font-semibold mb-4 tracking-wide">Account Notes</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              TD Studios manages credentials and sensitive integrations on your behalf. When you need to add or update
              anything in the vault, drop us a line and we\'ll secure it immediately.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
