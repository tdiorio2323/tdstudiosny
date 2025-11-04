import { describe, it, expect } from "vitest"
import { ZodError } from "zod"
import { contactSchema } from "@/features/contact/lib/contact-schema"

const base = {
  fullName: "Test User",
  email: "t@e.co",
  company: "X",
  phone: "123",
  service: "web",
  budget: "5k-10k",
  timeline: "<1m",
  details: "This is a longer message with more than 10 characters",
  contactType: "email",
  website: "", // honeypot empty
}

describe("contact schema", () => {
  it("accepts valid payload", () => {
    expect(contactSchema.parse(base)).toBeTruthy()
  })

  it("accepts honeypot field (validation happens in route handler)", () => {
    const result = contactSchema.parse({ ...base, website: "http://spam" })
    expect(result.website).toBe("http://spam")
  })

  it("requires required fields", () => {
    expect(() => contactSchema.parse({ email: "test@example.com" })).toThrow(ZodError)
  })
})
