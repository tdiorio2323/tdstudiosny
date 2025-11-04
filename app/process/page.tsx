import { Metadata } from "next"
import { FrostedButton } from "@/components/FrostedButton"
import { GlassCard } from "@/components/GlassCard"
import { Section } from "@/components/Section"
import { PageTitle } from "@/features/layout/components/PageTitle"
import { JsonLd } from "@/features/seo/components/JsonLd"

export const metadata: Metadata = {
  title: "Our Process | TD Studios",
  description:
    "Our proven 5-step process to turn your brand vision into a polished digital experience.",
  alternates: {
    canonical: "https://tdstudiosdigital.com/process",
  },
  openGraph: {
    title: "Our Process | TD Studios",
    description:
      "Our proven 5-step process to turn your brand vision into a polished digital experience.",
    url: "https://tdstudiosdigital.com/process",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Process | TD Studios",
    description:
      "Our proven 5-step process to turn your brand vision into a polished digital experience.",
  },
}

const processSteps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    duration: "1-2 weeks",
    description:
      "We begin with in-depth research into your business, competitors, and target audience. This phase includes stakeholder interviews, brand workshops, and technical architecture planning.",
    deliverables: [
      "Project brief and goals document",
      "Competitive analysis report",
      "Technical requirements specification",
      "Project timeline and milestones",
    ],
  },
  {
    number: "02",
    title: "Design & Prototyping",
    duration: "2-3 weeks",
    description:
      "Our design team creates wireframes, visual concepts, and interactive prototypes. We iterate based on your feedback to ensure the design aligns perfectly with your vision.",
    deliverables: [
      "Wireframes and user flows",
      "High-fidelity mockups",
      "Interactive prototype",
      "Design system and component library",
    ],
  },
  {
    number: "03",
    title: "Development & Build",
    duration: "4-6 weeks",
    description:
      "Our engineering team brings the designs to life with clean, scalable code. We follow agile methodologies with weekly check-ins and progress updates.",
    deliverables: [
      "Functional web application",
      "Mobile-responsive implementation",
      "CMS integration (if applicable)",
      "API and database setup",
    ],
  },
  {
    number: "04",
    title: "Testing & Refinement",
    duration: "1-2 weeks",
    description:
      "Rigorous quality assurance testing across devices, browsers, and use cases. We fix bugs, optimize performance, and ensure everything works flawlessly.",
    deliverables: [
      "QA testing report",
      "Performance optimization",
      "Accessibility audit",
      "Cross-browser compatibility check",
    ],
  },
  {
    number: "05",
    title: "Launch & Support",
    duration: "Ongoing",
    description:
      "We handle deployment, monitor performance, and provide post-launch support. Our team remains available to address any issues and implement enhancements.",
    deliverables: [
      "Production deployment",
      "Analytics and tracking setup",
      "Documentation and training",
      "30-90 day support period",
    ],
  },
]

const faqItems = [
  {
    question: "How involved do I need to be during the process?",
    answer:
      "We recommend weekly check-ins and expect timely feedback during review phases. Total time commitment is typically 2-4 hours per week.",
  },
  {
    question: "What happens if we need to make changes mid-project?",
    answer:
      "We accommodate reasonable scope changes. Significant changes may affect timeline and budget, which we'll discuss transparently.",
  },
  {
    question: "Do you work with our existing team?",
    answer:
      "Absolutely. We integrate seamlessly with your marketing, product, and engineering teams as needed.",
  },
]

export default function ProcessPage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "TD Studios 5-Step Design & Development Process",
    description: "A proven methodology that delivers exceptional results, from strategy to launch",
    totalTime: "P8W",
    step: processSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
      itemListElement: step.deliverables.map((deliverable) => ({
        "@type": "HowToTip",
        text: deliverable,
      })),
    })),
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
        name: "Process",
        item: "https://tdstudiosdigital.com/process",
      },
    ],
  }

  return (
    <>
      <JsonLd data={howToSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <PageTitle
            eyebrow="How We Work"
            title="Our 5-Step Process"
            subtitle="A proven methodology that delivers exceptional results, on time and on budget. From strategy to launch, we're with you every step of the way."
          />

          {/* Process Timeline */}
          <Section id="timeline">
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Timeline connector */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute left-12 top-24 bottom-0 w-px bg-white/20" />
                  )}

                  <GlassCard className="luxury-glass">
                    <div className="md:flex md:gap-8">
                      {/* Step Number */}
                      <div className="flex-shrink-0 mb-4 md:mb-0">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-neutral-900/70 border-2 border-white/30 rounded-full text-3xl font-bold">
                          {step.number}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-2xl md:text-3xl font-bold">{step.title}</h3>
                          <span className="text-sm text-white/60 whitespace-nowrap ml-4">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-white/80 mb-6">{step.description}</p>

                        <div>
                          <h4 className="text-lg font-semibold mb-3">Key Deliverables:</h4>
                          <ul className="grid md:grid-cols-2 gap-2">
                            {step.deliverables.map((deliverable, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-white/60 mr-2">•</span>
                                <span className="text-white/80 text-sm">{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </Section>

          {/* FAQ */}
          <Section id="faq" title="Process FAQs" className="mt-20">
            <div className="max-w-3xl mx-auto space-y-6">
              {faqItems.map((item, index) => (
                <GlassCard key={index}>
                  <h3 className="text-lg font-semibold mb-3">{item.question}</h3>
                  <p className="text-white/80">{item.answer}</p>
                </GlassCard>
              ))}
            </div>
          </Section>

          {/* CTA */}
          <div className="text-center mt-20">
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a custom timeline that works for you.
            </p>
            <FrostedButton href="/contact">Start Your Project</FrostedButton>
          </div>
        </div>
      </div>
    </>
  )
}
