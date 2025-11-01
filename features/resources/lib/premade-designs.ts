export type PremadeDesign = {
  id: string
  title: string
  slug: string
  price: number
  tags: string[]
  thumb: string
  description?: string
  files?: { label: string; url: string }[]
}

export const PREMADE: PremadeDesign[] = [
  {
    id: "qp-001",
    title: "Lightning Label Pack",
    slug: "lightning-label-pack",
    price: 89,
    tags: ["labels", "mylar", "print"],
    thumb: "/premade-designs/lightning-label-pack-thumb.jpg",
    description: "Professional mylar label designs for product packaging with print-ready files",
  },
  {
    id: "qp-002",
    title: "Luxury Business Card Set",
    slug: "luxury-bizcards",
    price: 49,
    tags: ["cards", "print", "branding"],
    thumb: "/premade-designs/luxury-bizcards-thumb.jpg",
    description: "Premium business card templates with sophisticated design aesthetics",
  },
  {
    id: "qp-003",
    title: "Social Media Kit Pro",
    slug: "social-media-kit-pro",
    price: 129,
    tags: ["social", "digital", "marketing"],
    thumb: "/premade-designs/social-media-kit-thumb.jpg",
    description: "Complete social media template pack with story frames and post templates",
  },
]
