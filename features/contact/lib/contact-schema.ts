import { z } from "zod"

export const contactSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().min(1).max(100),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  details: z.string().min(10).max(5000),
  contactType: z.string().optional(),
  website: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
