"use client"

import { X, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { FrostedButton } from "@/components/FrostedButton"
import { GlassCard } from "@/components/GlassCard"
import { CaseStudyDetailContent } from "@/features/clients/components/CaseStudyDetailContent"
import { ClientLogo } from "@/features/clients/components/client-logo"
import { clients, type Client } from "@/features/clients/lib/clients-data"

export default function PortfolioClientPage() {
  const [selectedProject, setSelectedProject] = useState<Client | null>(null)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://i.imgur.com/a1bXC5y.png"
            alt="Portfolio Hero"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40 md:bg-black/40 hero-overlay-mobile"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-white">
            Client Success Stories
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Discover how we've transformed brands and businesses through strategic design and
            development.
          </p>
        </div>
      </section>

      {/* Client Logo Grid */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Featured Clients</h2>
            <p className="text-white text-lg">
              Click any logo to explore the project details and results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client) => (
              <GlassCard
                key={client.id}
                className="group cursor-pointer hover:bg-neutral-900/80 transition-all duration-300 p-8 text-center"
                onClick={() => setSelectedProject(client)}
              >
                <ClientLogo
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fallbackText={client.name}
                  sizes="96px"
                  containerClassName={`relative w-24 h-24 mx-auto mb-6 overflow-hidden ${client.logoBgColor || "bg-neutral-900/80"} border border-white/20 rounded-full group-hover:bg-neutral-900/90 transition-colors`}
                  imageClassName={`${client.id === "serious-inquiries-only" ? "object-cover" : "object-contain p-4"} ${client.logoInvert ? "invert" : ""}`}
                />
                <h3 className="text-xl font-semibold mb-2 text-white">{client.name}</h3>
                <p className="text-white text-sm mb-4">
                  {client.industry} • {client.year}
                </p>
                {client.services.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {client.services.slice(0, 2).map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 bg-neutral-900/80 border border-white/20 rounded-full text-xs text-white"
                      >
                        {service}
                      </span>
                    ))}
                    {client.services.length > 2 && (
                      <span className="px-3 py-1 bg-neutral-900/80 border border-white/20 rounded-full text-xs text-white">
                        +{client.services.length - 2} more
                      </span>
                    )}
                  </div>
                )}
                <div className="mt-4 flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  View Case Study <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 px-6">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 text-white">{clients.length}+</div>
              <div className="text-white text-sm">Clients Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-white">50+</div>
              <div className="text-white text-sm">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-white">300%</div>
              <div className="text-white text-sm">Avg. Conversion Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-white">100%</div>
              <div className="text-white text-sm">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <GlassCard className="p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-white text-lg mb-8">
              Let's create something extraordinary together. Contact us to discuss your vision and
              bring it to life.
            </p>
            <FrostedButton href="/contact">Start Your Project</FrostedButton>
          </GlassCard>
        </div>
      </section>

      {/* Modal for Project Details */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-black/90 border border-white/20 rounded-2xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <ClientLogo
                    src={selectedProject.logo}
                    alt={`${selectedProject.name} logo`}
                    fallbackText={selectedProject.name}
                    sizes="(max-width: 640px) 48px, 64px"
                    containerClassName="relative w-12 h-12 sm:w-16 sm:h-16 overflow-hidden bg-neutral-900/80 border border-white/20 rounded-lg"
                    imageClassName={`object-contain p-2 ${selectedProject.logoInvert ? "invert" : ""}`}
                  />
                  <div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                      {selectedProject.name}
                    </h2>
                    <p className="text-white text-sm sm:text-base">
                      {selectedProject.industry} • {selectedProject.year}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 bg-neutral-900/70 hover:bg-neutral-900/80 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Client Details (Reusable Component) */}
              <CaseStudyDetailContent client={selectedProject} isModal={true} />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <FrostedButton
                  href={`/work/${selectedProject.slug}`}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  View Full Project <ArrowRight className="w-4 h-4" />
                </FrostedButton>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 px-6 py-3 bg-neutral-900/70 border border-white/20 rounded-lg text-white hover:bg-neutral-900/80 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
