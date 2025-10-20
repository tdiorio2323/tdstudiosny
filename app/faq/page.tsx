import { Metadata } from "next"
import { PageTitle } from "@/components/page-title"
import { Section } from "@/components/section"
import { GlassCard } from "@/components/glass-card"
import { FrostedButton } from "@/components/frosted-button"
import { JsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "FAQ | TD Studios",
  description: "Frequently asked questions about TD Studios services, pricing, process, and timelines. Learn about our web design, development, and branding services.",
  alternates: {
    canonical: "https://tdstudiosdigital.com/faq",
  },
  openGraph: {
    title: "FAQ | TD Studios",
    description: "Frequently asked questions about TD Studios services, pricing, process, and timelines. Learn about our web design, development, and branding services.",
    url: "https://tdstudiosdigital.com/faq",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | TD Studios",
    description: "Frequently asked questions about TD Studios services, pricing, process, and timelines. Learn about our web design, development, and branding services.",
  },
}

const faqCategories = [
  {
    category: "Services & Pricing",
    questions: [
      {
        question: "What services do you offer?",
        answer: "We offer four core services: Web Experience (marketing sites and landing pages), Product & Platform Development (full-stack apps), Social Media Marketing (content strategy and campaigns), and Graphic Design & Brand Identity (logos and visual systems).",
      },
      {
        question: "How much do your services cost?",
        answer: "Projects typically range from $15,000 for starter packages to $50,000+ for comprehensive solutions. We provide custom quotes based on your specific needs, timeline, and scope. Contact us for a detailed proposal.",
      },
      {
        question: "Do you offer payment plans?",
        answer: "Yes, we offer milestone-based payment plans. Typically 50% upfront, 25% at midpoint, and 25% at launch. For larger projects, we can discuss custom payment schedules.",
      },
      {
        question: "What's included in the pricing?",
        answer: "All packages include strategy, design, development, testing, and deployment. You own all deliverables and source code. Post-launch support is included based on your package tier.",
      },
    ],
  },
  {
    category: "Process & Timeline",
    questions: [
      {
        question: "How long does a typical project take?",
        answer: "Timelines vary by scope: Starter projects take 4-6 weeks, standard projects 8-12 weeks, and enterprise projects 12+ weeks. Logo designs typically take 1-2 weeks, while complete brand identities require 3-4 weeks.",
      },
      {
        question: "How involved do I need to be during the process?",
        answer: "We recommend weekly check-ins and expect timely feedback during review phases. Total time commitment is typically 2-4 hours per week depending on project complexity.",
      },
      {
        question: "What happens if we need to make changes mid-project?",
        answer: "We accommodate reasonable scope changes. Significant changes may affect timeline and budget, which we'll discuss transparently before proceeding.",
      },
      {
        question: "Do you work with our existing team?",
        answer: "Absolutely. We integrate seamlessly with your marketing, product, and engineering teams as needed, providing documentation and support for handoff.",
      },
    ],
  },
  {
    category: "Working Together",
    questions: [
      {
        question: "Do you work with different industries?",
        answer: "Yes. We collaborate with consumer brands, product companies, and service teams across various industries seeking premium, luxury solutions.",
      },
      {
        question: "What file formats do you provide?",
        answer: "We provide all source files including AI, PSD, Figma, PNG, JPG, PDF, and vector formats. You'll receive everything needed for print and digital use, plus brand guidelines.",
      },
      {
        question: "Do you offer rush delivery?",
        answer: "Yes, we can accommodate rush projects with additional fees and team availability permitting. Contact us to discuss your timeline and we'll find a solution.",
      },
      {
        question: "What if I need changes after launch?",
        answer: "All packages include post-launch support (30-90 days depending on tier). Additional changes and features can be handled on a retainer or project basis.",
      },
    ],
  },
  {
    category: "Technical & Design",
    questions: [
      {
        question: "What technologies do you use?",
        answer: "We specialize in React, Next.js, TypeScript, Vite, Expo, Supabase, and PostgreSQL. We choose the best stack for your specific needs and always prioritize maintainability and performance.",
      },
      {
        question: "Do you provide hosting and maintenance?",
        answer: "We deploy to Vercel, Netlify, or your preferred hosting provider. Ongoing maintenance and hosting can be included in retainer agreements or handled by your team.",
      },
      {
        question: "Will my website be mobile-responsive?",
        answer: "Yes, all our web projects are mobile-first and fully responsive across all devices. We test on iOS, Android, and all major browsers.",
      },
      {
        question: "Do you handle SEO?",
        answer: "Yes, all websites include technical SEO optimization, meta tags, structured data, and performance optimization. Advanced SEO strategy and content can be added as needed.",
      },
    ],
  },
]

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqCategories.flatMap((category) =>
      category.questions.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
        },
      }))
    ),
  }

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
        "name": "FAQ",
        "item": "https://tdstudiosdigital.com/faq",
      },
    ],
  }

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="min-h-screen py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <PageTitle
            eyebrow="Help Center"
            title="Frequently Asked Questions"
            subtitle="Get answers to common questions about our services, process, and how we work with clients."
          />

          {/* FAQ Sections */}
          {faqCategories.map((category, categoryIndex) => (
            <Section key={categoryIndex} id={category.category.toLowerCase().replace(/\s+/g, '-')} className="mt-16">
              <div className="mb-12">
                <h1 className="text-2xl md:text-3xl font-bold mb-8">{category.category}</h1>
                <div className="space-y-6">
                  {category.questions.map((item, index) => (
                    <GlassCard key={index} className="luxury-glass">
                      <h3 className="text-lg font-semibold mb-3">{item.question}</h3>
                      <p className="text-white/80 leading-relaxed">{item.answer}</p>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </Section>
          ))}

          {/* Still Have Questions CTA */}
          <Section id="contact-cta" className="mt-20">
            <GlassCard className="luxury-glass p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our team is here to help. Reach out and we'll get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <FrostedButton href="/contact" className="btn-primary">
                  Contact Us
                </FrostedButton>
                <FrostedButton href="/book" className="btn-secondary">
                  Book a Call
                </FrostedButton>
              </div>
            </GlassCard>
          </Section>
        </div>
      </div>
    </>
  )
}
