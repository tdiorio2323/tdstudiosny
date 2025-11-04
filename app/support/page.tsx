"use client"

import { ChatKit, useChatKit } from "@openai/chatkit-react"
import Link from "next/link"
import { GlassCard } from "@/components/GlassCard"
import { JsonLd } from "@/features/seo/components/JsonLd"

const supportChannels = [
  {
    title: "Email Support",
    description:
      "Send project context, assets, or questions and expect a reply within one business day.",
    href: "mailto:hello@tdstudiosny.com",
    cta: "hello@tdstudiosny.com",
  },
  {
    title: "WhatsApp",
    description: "Perfect for quick updates and mobile-friendly collaboration.",
    href: "https://wa.me/13474859935",
    cta: "+1 347 485 9935",
  },
  {
    title: "Contact Form",
    description:
      "Share detailed requirements and attach files so we can prep before hopping on a call.",
    href: "/contact",
    cta: "Open contact form",
  },
] as const

export default function SupportChat() {
  const { control } = useChatKit({
    api: {
      async getClientSecret() {
        const res = await fetch("/api/chatkit/session", { method: "POST" })
        const { client_secret: clientSecret } = await res.json()
        return clientSecret
      },
    },
  })

  const supportSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "TD Studios Support",
    description:
      "Get technical and creative support from the TD Studios team. Connect via live chat, email, WhatsApp, or the contact form.",
    url: "https://tdstudiosdigital.com/support",
    mainEntity: {
      "@type": "ContactPoint",
      contactType: "customer support",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
      telephone: "+1-347-485-9935",
      email: "hello@tdstudiosny.com",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://tdstudiosdigital.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Support",
        item: "https://tdstudiosdigital.com/support",
      },
    ],
  }

  return (
    <>
      <JsonLd data={supportSchema} />
      <JsonLd data={breadcrumbSchema} />

      <main className="relative min-h-screen px-6 py-24 pb-48">
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">Support</p>
            <h1 className="text-4xl font-semibold text-white md:text-5xl">
              We’re here to keep your launch moving
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/75">
              Reach the TD Studios team through the live chat widget or your preferred channel
              below. We respond quickly and keep a tight pulse on in-flight work.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {supportChannels.map((channel) => (
              <GlassCard key={channel.title} className="h-full space-y-4 p-6 text-left">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white">{channel.title}</h2>
                  <p className="text-sm text-white/75">{channel.description}</p>
                </div>
                {channel.href.startsWith("http") || channel.href.startsWith("mailto") ? (
                  <a
                    href={channel.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-white/80"
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {channel.cta}
                    <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <Link
                    href={channel.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-white/80"
                  >
                    {channel.cta}
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </GlassCard>
            ))}
          </div>

          <GlassCard className="bg-black/70 p-8 text-left">
            <h2 className="text-2xl font-semibold text-white">Live chat availability</h2>
            <p className="mt-2 text-white/75">
              Live chat is staffed Monday through Friday from 9am to 6pm ET. Leave a note after
              hours and we’ll follow up as soon as we’re back online.
            </p>
          </GlassCard>
        </div>
      </main>

      <div className="fixed bottom-4 right-4 h-[600px] w-full max-w-[380px] rounded-2xl border border-white/10 bg-black/70 shadow-xl backdrop-blur-lg lg:bottom-6 lg:right-6">
        <ChatKit control={control} className="h-full w-full rounded-2xl" />
      </div>
    </>
  )
}
