import type { NextRequest } from "next/server"
import { Resend } from "resend"
import { contactSchema } from "@/features/contact/lib/contact-schema"

const hits = new Map<string, { n: number; ts: number }>() // naive in-memory

function limited(ip: string, limit = 5, windowMs = 60_000) {
  const now = Date.now()
  const rec = hits.get(ip) ?? { n: 0, ts: now }
  if (now - rec.ts > windowMs) {
    rec.n = 0
    rec.ts = now
  }
  rec.n += 1
  hits.set(ip, rec)
  return rec.n > limit
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0"
  if (limited(ip)) return new Response("Too Many Requests", { status: 429 })

  const body = await req.json().catch(() => null)
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return new Response(JSON.stringify(parsed.error.flatten()), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }
  if (parsed.data.website) return new Response("OK", { status: 200 }) // spam bot

  // Send email via Resend
  const resend = new Resend(process.env.RESEND_API_KEY)
  const toEmail = process.env.CONTACT_TO_EMAIL || "tyler@tdstudiosny.com"

  try {
    await resend.emails.send({
      from: "TD Studios Contact Form <noreply@tdstudiosny.com>",
      to: toEmail,
      replyTo: parsed.data.email,
      subject: `New Contact Form Submission - ${parsed.data.service}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${parsed.data.fullName}</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
        ${parsed.data.company ? `<p><strong>Company:</strong> ${parsed.data.company}</p>` : ""}
        ${parsed.data.phone ? `<p><strong>Phone:</strong> ${parsed.data.phone}</p>` : ""}
        <p><strong>Service:</strong> ${parsed.data.service}</p>
        ${parsed.data.budget ? `<p><strong>Budget:</strong> ${parsed.data.budget}</p>` : ""}
        ${parsed.data.timeline ? `<p><strong>Timeline:</strong> ${parsed.data.timeline}</p>` : ""}
        ${parsed.data.contactType ? `<p><strong>Contact Type:</strong> ${parsed.data.contactType}</p>` : ""}
        <hr>
        <p><strong>Message:</strong></p>
        <p>${parsed.data.details.replace(/\n/g, "<br>")}</p>
      `,
    })

    return new Response("OK", { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return new Response("Failed to send email", { status: 500 })
  }
}
