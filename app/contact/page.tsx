
"use client"
import MobileCta from "@/components/MobileCta";

import type React from "react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { GlassCard } from "@/components/glass-card"
import { FrostedButton } from "@/components/frosted-button"
import { CalendlyWidget } from "@/components/calendly-widget"
import { JsonLd } from "@/components/json-ld"
import { Mail, Clock, MapPin } from "lucide-react"

const services = [
  "Web Experience",
  "Product & Platform Development",
  "Social & Content Systems",
  "Brand & Identity",
  "Digital Assets",
  "Partnerships",
]

const budgetRanges = ["$10K - $25K", "$25K - $50K", "$50K - $100K", "$100K+"]

const timelines = ["2-4 weeks", "1-2 months", "3-4 months", "6+ months"]

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope. Logo designs typically take 1-2 weeks, while complete brand identities can take 3-4 weeks. We always provide detailed timelines during consultation.",
  },
  {
    question: "Do you work with different industries?",
    answer:
      "Absolutely. We collaborate with consumer brands, product companies, and service teams seeking premium, luxury solutions.",
  },
  {
    question: "What file formats do you provide?",
    answer:
      "We provide all source files including AI, PSD, PNG, JPG, PDF, and vector formats. You'll receive everything needed for print and digital use.",
  },
  {
    question: "Do you offer rush delivery?",
    answer:
      "Yes, we can accommodate rush projects with additional fees. Contact us to discuss your timeline and we'll find a solution.",
  },
]

export default function ContactPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "TD Studios NY",
    "image": "https://tdstudiosny.com/logo.png",
    "@id": "https://tdstudiosny.com/contact",
    "url": "https://tdstudiosny.com/contact",
    "telephone": "+1-212-555-0199",
  }
  const [contactType, setContactType] = useState<string | null>(null)
  interface ContactFormData {
    fullName: string
    email: string
    company: string
    phone: string
    service: string
    budget: string
    timeline: string
    details: string
  }

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    timeline: "",
    details: "",
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const initialFieldErrors: Record<keyof ContactFormData, string> = {
    fullName: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    details: '',
  }
  const initialTouched: Record<keyof ContactFormData, boolean> = {
    fullName: false,
    email: false,
    company: false,
    phone: false,
    service: false,
    budget: false,
    timeline: false,
    details: false,
  }
  const [fieldErrors, setFieldErrors] = useState<Record<keyof ContactFormData, string>>(initialFieldErrors)
  const [touched, setTouched] = useState<Record<keyof ContactFormData, boolean>>(initialTouched)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const type = urlParams.get('type')
    if (type) {
      setContactType(type)
    }
  }, [])

  useEffect(() => {
    setStatus('idle')
    setStatusMessage(null)
  }, [contactType])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields before submission
    const newErrors: Record<string, string> = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) newErrors[key] = error
    })

    setFieldErrors({ ...initialFieldErrors, ...newErrors })
    setTouched({
      fullName: true,
      email: true,
      company: true,
      phone: true,
      service: true,
      budget: true,
      timeline: true,
      details: true,
    })

    // Don't submit if there are validation errors
    if (Object.values(newErrors).some(error => error)) {
      setStatus('error')
      setStatusMessage('Please fix the errors above before submitting.')
      return
    }

    setStatus('submitting')
    setStatusMessage(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          contactType
        })
      })

      if (!response.ok) {
        // Track failed submission
        if (typeof window !== 'undefined') {
          import('@/lib/analytics').then(({ trackFormSubmission }) => {
            trackFormSubmission(contactType || 'contact', false)
          })
        }
        throw new Error('Request failed')
      }

      setStatus('success')
      setStatusMessage('Thanks for reaching out. We\'ll get back to you within one business day.')
      setFormData({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        budget: "",
        timeline: "",
        details: "",
      })
      // Track successful submission
      if (typeof window !== 'undefined') {
        import('@/lib/analytics').then(({ trackFormSubmission }) => {
          trackFormSubmission(contactType || 'contact', true)
        })
      }
    } catch (error) {
      // Track error
      if (typeof window !== 'undefined') {
        import('@/lib/analytics').then(({ trackFormSubmission }) => {
          trackFormSubmission(contactType || 'contact', false)
        })
      }
      console.error('Error submitting contact form:', error)
      setStatus('error')
      setStatusMessage('We couldn\'t send your message. Email tyler@tdstudiosny.com and we\'ll help right away.')
    }
  }

  // Real-time validation function
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required'
        if (value.length < 2) return 'Full name must be at least 2 characters'
        if (value.length > 100) return 'Full name must be less than 100 characters'
        break
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address'
        break
      case 'service':
        if (!value.trim()) return 'Please select a service'
        break
      case 'details':
        if (!contactType || contactType === 'project') {
          if (!value.trim()) return 'Project details are required'
          if (value.length < 10) return 'Please provide at least 10 characters of detail'
        }
        if (value.length > 5000) return 'Details must be less than 5000 characters'
        break
    }
    return ''
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    setFormData({
      ...formData,
      [name]: value,
    })

    // Real-time validation for touched fields
    if (Object.prototype.hasOwnProperty.call(touched, name) && touched[name as keyof ContactFormData]) {
      const error = validateField(name, value)
      setFieldErrors(prev => ({
        ...prev,
        [name]: error
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))

    const error = validateField(name, value)
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  return (
    <main className="min-h-dvh bg-background">
      <JsonLd data={localBusinessSchema} />
      {/* Hero Section */}
      <section className="relative min-h-screen md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 aspect-video">
          <Image
            src="/contact-hero-image.jpg"
            alt="Contact Hero"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40 md:bg-black/40 hero-overlay-mobile"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-white">Let's Create Something Extraordinary</h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Ready to elevate your brand with premium design solutions? Let's discuss your project and bring your vision to life.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-black/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">What We Specialize In</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Premium design and development services tailored for ambitious brands and forward-thinking companies.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <GlassCard key={index} className="text-center">
                <h3 className="text-xl font-semibold text-white mb-3">{service}</h3>
                <p className="text-white/70 text-sm">
                  {service === "Web Experience" && "Custom websites and digital experiences that convert visitors into customers."}
                  {service === "Product & Platform Development" && "Full-stack applications and platforms built for scale and performance."}
                  {service === "Social & Content Systems" && "Brand storytelling and content strategies that drive engagement."}
                  {service === "Brand & Identity" && "Visual identity systems that establish authority and build trust."}
                  {service === "Digital Assets" && "Graphics, animations, and digital content optimized for all platforms."}
                  {service === "Partnerships" && "Strategic collaboration and white-label services for agencies and teams."}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-24 bg-black/40">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Start Your Project</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Tell us about your project and we'll create a custom proposal tailored to your needs and timeline.
            </p>
          </div>

          <GlassCard>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact type selection */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setContactType('project')}
                  className={`p-6 rounded-lg border transition-all duration-300 ${
                    contactType === 'project'
                      ? 'border-white/30 bg-white/10'
                      : 'border-white/10 bg-transparent hover:border-white/20'
                  }`}
                >
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white mb-2">New Project</h3>
                    <p className="text-white/70 text-sm">
                      Brand identity, website, or digital platform development
                    </p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setContactType('consultation')}
                  className={`p-6 rounded-lg border transition-all duration-300 ${
                    contactType === 'consultation'
                      ? 'border-white/30 bg-white/10'
                      : 'border-white/10 bg-transparent hover:border-white/20'
                  }`}
                >
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white mb-2">Free Consultation</h3>
                    <p className="text-white/70 text-sm">
                      Strategy discussion and project scoping session
                    </p>
                  </div>
                </button>
              </div>

              {contactType && (
                <>
                  {/* Basic Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-white font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                          fieldErrors.fullName && touched.fullName ? 'border-red-400' : 'border-white/20'
                        }`}
                        placeholder="Your full name"
                        // TODO: Restore aria-invalid after accessibility review
                        aria-describedby={fieldErrors.fullName && touched.fullName ? 'fullName-error' : undefined}
                      />
                      {fieldErrors.fullName && touched.fullName && (
                        <p id="fullName-error" role="alert" className="mt-1 text-sm text-red-400">
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                          fieldErrors.email && touched.email ? 'border-red-400' : 'border-white/20'
                        }`}
                        placeholder="your@email.com"
                        // TODO: Restore aria-invalid after accessibility review
                        aria-describedby={fieldErrors.email && touched.email ? 'email-error' : undefined}
                      />
                      {fieldErrors.email && touched.email && (
                        <p id="email-error" role="alert" className="mt-1 text-sm text-red-400">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-white font-medium mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="Your company (optional)"
                        // TODO: Restore aria-invalid after accessibility review
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-white font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="(555) 123-4567"
                        // TODO: Restore aria-invalid after accessibility review
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label htmlFor="service" className="block text-white font-medium mb-2">
                      Service Needed *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 ${
                        fieldErrors.service && touched.service ? 'border-red-400' : 'border-white/20'
                      }`}
                      // TODO: Restore aria-invalid after accessibility review
                      aria-describedby={fieldErrors.service && touched.service ? 'service-error' : undefined}
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service} className="bg-black text-white">
                          {service}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.service && touched.service && (
                      <p id="service-error" role="alert" className="mt-1 text-sm text-red-400">
                        {fieldErrors.service}
                      </p>
                    )}
                  </div>

                  {contactType === 'project' && (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="budget" className="block text-white font-medium mb-2">
                            Budget Range
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                            // TODO: Restore aria-invalid after accessibility review
                          >
                            <option value="">Select budget</option>
                            {budgetRanges.map((budget, index) => (
                              <option key={index} value={budget} className="bg-black text-white">
                                {budget}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="timeline" className="block text-white font-medium mb-2">
                            Timeline
                          </label>
                          <select
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                            // TODO: Restore aria-invalid after accessibility review
                          >
                            <option value="">Select timeline</option>
                            {timelines.map((timeline, index) => (
                              <option key={index} value={timeline} className="bg-black text-white">
                                {timeline}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label htmlFor="details" className="block text-white font-medium mb-2">
                      {contactType === 'project' ? 'Project Details *' : 'What would you like to discuss?'}
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={5}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none ${
                        fieldErrors.details && touched.details ? 'border-red-400' : 'border-white/20'
                      }`}
                      placeholder={
                        contactType === 'project'
                          ? "Tell us about your project goals, target audience, and any specific requirements..."
                          : "What questions do you have about our services or your potential project?"
                      }
                      // TODO: Restore aria-invalid after accessibility review
                      aria-describedby={fieldErrors.details && touched.details ? 'details-error' : undefined}
                    />
                    {fieldErrors.details && touched.details && (
                      <p id="details-error" role="alert" className="mt-1 text-sm text-red-400">
                        {fieldErrors.details}
                      </p>
                    )}
                  </div>

                  {/* Status Messages */}
                  {statusMessage && (
                    <div
                      className={`p-4 rounded-lg ${
                        status === 'success'
                          ? 'bg-green-900/50 border border-green-500/30 text-green-100'
                          : 'bg-red-900/50 border border-red-500/30 text-red-100'
                      }`}
                      role="alert"
                    >
                      {statusMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <FrostedButton
                    type="submit"
                    disabled={status === 'submitting'}
                    loading={status === 'submitting'}
                    className="w-full py-4 text-lg font-semibold"
                    analyticsLabel={contactType === 'project' ? 'Submit Project Form' : 'Submit Consultation Form'}
                    analyticsPosition="contact-form"
                  >
                    {status === 'submitting'
                      ? 'Sending...'
                      : contactType === 'project'
                      ? 'Submit Project Request'
                      : 'Request Consultation'}
                  </FrostedButton>
                </>
              )}
            </form>
          </GlassCard>
        </div>
      </section>

      {/* Schedule Consultation Section */}
      <section className="py-24 bg-black/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Schedule a Free Consultation</h2>
              <p className="text-white/80 text-lg mb-8">
                Prefer to speak directly? Book a 30-minute consultation to discuss your project goals, timeline, and how we can help bring your vision to life.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">30-Minute Strategy Session</h3>
                    <p className="text-white/70">
                      We'll discuss your project scope, timeline, budget, and create a customized roadmap for success.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Custom Proposal</h3>
                    <p className="text-white/70">
                      Within 24 hours, receive a detailed proposal with timeline, deliverables, and transparent pricing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Based in NYC</h3>
                    <p className="text-white/70">
                      Headquartered in New York City, serving ambitious brands and teams worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <GlassCard>
                <CalendlyWidget url="https://calendly.com/td-studios/30min" />
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-black/40">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <GlassCard key={index}>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">{faq.question}</h3>
                  <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                </div>
              </GlassCard>
            ))}
          </div>
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold mb-4 text-white">Ready to get started?</h3>
            <p className="text-white/80 mb-8">
              Let's create something extraordinary together. Schedule your free consultation today.
            </p>
            <FrostedButton
              href="/contact#contact-form"
              className="px-8 py-4 text-lg font-semibold"
              analyticsLabel="Get Started CTA"
              analyticsPosition="faq-section"
            >
              Start Your Project
            </FrostedButton>
          </div>
        </div>
      </section>

      <MobileCta />
    </main>
  )
}
