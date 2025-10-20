import { Metadata } from "next"
import { PageTitle } from "@/components/page-title"
import { Section } from "@/components/section"
import { GlassCard } from "@/components/glass-card"
import { JsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Legal | TD Studios",
  description: "Terms of Service and Privacy Policy for TD Studios. Our commitment to transparency, data protection, and client rights for all design and development services.",
  alternates: {
    canonical: "https://tdstudiosdigital.com/legal",
  },
  openGraph: {
    title: "Legal | TD Studios",
    description: "Terms of Service and Privacy Policy for TD Studios. Our commitment to transparency, data protection, and client rights for all design and development services.",
    url: "https://tdstudiosdigital.com/legal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal | TD Studios",
    description: "Terms of Service and Privacy Policy for TD Studios. Our commitment to transparency, data protection, and client rights for all design and development services.",
  },
}

export default function LegalPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://tdstudiosdigital.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Legal",
        "item": "https://tdstudiosdigital.com/legal",
      },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <PageTitle
            title="Legal Information"
            subtitle="Our commitment to transparency and protecting your rights"
          />

          {/* Terms of Service */}
          <Section id="terms" title="Terms of Service">
            <GlassCard className="luxury-glass">
              <div className="prose prose-invert max-w-none">
                <p className="text-white/80 mb-4">Last updated: January 2025</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h3>
                <p className="text-white/80 mb-4">
                  By accessing and using TD Studios' services, you accept and agree to be bound by the terms and provision of this agreement.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">2. Service Description</h3>
                <p className="text-white/80 mb-4">
                  TD Studios provides professional design, development, and consulting services. All services are provided "as is" and subject to the terms outlined in individual project agreements.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">3. Intellectual Property</h3>
                <p className="text-white/80 mb-4">
                  Upon full payment, clients receive full ownership of all deliverables created specifically for their project. TD Studios retains the right to showcase work in our portfolio unless otherwise agreed.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">4. Payment Terms</h3>
                <p className="text-white/80 mb-4">
                  Payment terms are specified in individual project agreements. Typical structure is 50% upfront, 25% at midpoint, and 25% upon completion. Late payments may incur fees.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">5. Project Timelines</h3>
                <p className="text-white/80 mb-4">
                  Project timelines are estimates based on agreed scope. Delays caused by client feedback or change requests may extend the timeline accordingly.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">6. Termination</h3>
                <p className="text-white/80 mb-4">
                  Either party may terminate the agreement with written notice. Client remains responsible for payment of work completed to date.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">7. Limitation of Liability</h3>
                <p className="text-white/80 mb-4">
                  TD Studios shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.
                </p>
              </div>
            </GlassCard>
          </Section>

          {/* Privacy Policy */}
          <Section id="privacy" title="Privacy Policy" className="mt-20">
            <GlassCard className="luxury-glass">
              <div className="prose prose-invert max-w-none">
                <p className="text-white/80 mb-4">Last updated: January 2025</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h3>
                <p className="text-white/80 mb-4">
                  We collect information you provide directly to us, including name, email, phone number, and project details when you contact us or use our services.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">2. How We Use Your Information</h3>
                <p className="text-white/80 mb-4">
                  We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">3. Information Sharing</h3>
                <p className="text-white/80 mb-4">
                  We do not sell or share your personal information with third parties except as necessary to provide our services or comply with legal requirements.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">4. Data Security</h3>
                <p className="text-white/80 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">5. Cookies and Tracking</h3>
                <p className="text-white/80 mb-4">
                  We use cookies and similar tracking technologies to analyze website traffic and improve user experience. You can control cookies through your browser settings.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">6. Your Rights</h3>
                <p className="text-white/80 mb-4">
                  You have the right to access, correct, or delete your personal information. Contact us at privacy@tdstudiosny.com to exercise these rights.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">7. Changes to Privacy Policy</h3>
                <p className="text-white/80 mb-4">
                  We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">8. Contact Us</h3>
                <p className="text-white/80 mb-4">
                  If you have questions about this privacy policy, please contact us at privacy@tdstudiosny.com or (347) 485-9935.
                </p>
              </div>
            </GlassCard>
          </Section>
        </div>
      </div>
    </>
  )
}
