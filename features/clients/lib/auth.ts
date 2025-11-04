import { SignJWT, type JWTPayload } from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.JWT_SECRET

if (!secretKey) {
  console.warn(
    "JWT_SECRET not set; using insecure fallback key. Configure JWT_SECRET for production usage."
  )
}

const secret = new TextEncoder().encode(secretKey ?? "insecure-development-secret-min-32-chars")

export interface SessionPayload {
  clientSlug: string
  expiresAt: number
}

const SESSION_DURATION_MS = 24 * 60 * 60 * 1000
const SESSION_COOKIE_NAME = "client_session"

const encodePayload = (payload: SessionPayload): JWTPayload => ({
  clientSlug: payload.clientSlug,
  expiresAt: payload.expiresAt,
})

async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(encodePayload(payload))
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret)
}

export async function createSession(clientSlug: string): Promise<void> {
  const expiresAt = Date.now() + SESSION_DURATION_MS
  const session = await encrypt({ clientSlug, expiresAt })

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(expiresAt),
    sameSite: "lax",
    path: "/",
  })
}

export function getPasscodeForClient(clientSlug: string): string | null {
  const envKey = `CLIENT_${clientSlug.toUpperCase()}_PASSCODE`
  return process.env[envKey] ?? null
}
