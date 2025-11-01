import { NextRequest, NextResponse } from "next/server"
import { createSession, getPasscodeForClient } from "@/features/clients/lib/auth"
import { clientAccessProfiles } from "@/features/clients/lib/client-access"

// Rate limiting store (in-memory, resets on server restart)
// For production, use Redis or similar
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 5 // 5 attempts per window

function checkRateLimit(clientSlug: string): { allowed: boolean; remainingAttempts: number } {
  const now = Date.now()
  const record = rateLimitStore.get(clientSlug)

  if (!record || now > record.resetAt) {
    // Reset or create new record
    rateLimitStore.set(clientSlug, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    })
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS - 1 }
  }

  if (record.count >= MAX_ATTEMPTS) {
    return { allowed: false, remainingAttempts: 0 }
  }

  record.count++
  return { allowed: true, remainingAttempts: MAX_ATTEMPTS - record.count }
}

function resetRateLimit(clientSlug: string): void {
  rateLimitStore.delete(clientSlug)
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<{ clientSlug: string; passcode: string }>
    const { clientSlug, passcode } = body

    if (typeof clientSlug !== "string" || typeof passcode !== "string") {
      return NextResponse.json({ error: "Client slug and passcode are required" }, { status: 400 })
    }

    // Check if client exists
    const profile = clientAccessProfiles[clientSlug.toLowerCase()]
    if (!profile) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 })
    }

    // Check rate limit
    const rateLimit = checkRateLimit(clientSlug)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too many attempts. Please try again in 15 minutes.",
          remainingAttempts: 0,
        },
        { status: 429 }
      )
    }

    // Get passcode from environment variable
    const correctPasscode = getPasscodeForClient(clientSlug)

    // Fallback to hardcoded value if env var not set (for backward compatibility)
    const expectedPasscode = correctPasscode || profile.passcode

    // Validate passcode
    if (passcode !== expectedPasscode) {
      return NextResponse.json(
        {
          error: "Incorrect passcode",
          remainingAttempts: rateLimit.remainingAttempts,
        },
        { status: 401 }
      )
    }

    // Reset rate limit on successful authentication
    resetRateLimit(clientSlug)

    // Create session
    await createSession(clientSlug)

    return NextResponse.json({
      success: true,
      redirectUrl: `/clients/${profile.slug}`,
    })
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Authentication failed. Please try again." }, { status: 500 })
  }
}
