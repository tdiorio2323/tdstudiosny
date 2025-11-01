import { SignJWT, type JWTPayload, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

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

const isExpired = (timestamp: number): boolean => Date.now() > timestamp

const encodePayload = (payload: SessionPayload): JWTPayload => ({
  clientSlug: payload.clientSlug,
  expiresAt: payload.expiresAt,
})

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(encodePayload(payload))
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret)
}

export async function decrypt(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] })
    const { clientSlug, expiresAt } = payload

    if (typeof clientSlug !== "string" || typeof expiresAt !== "number") {
      return null
    }

    return { clientSlug, expiresAt }
  } catch (error) {
    console.error("Failed to verify token:", error)
    return null
  }
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

export async function verifySession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (!cookie) {
    return null
  }

  const session = await decrypt(cookie)

  if (!session || isExpired(session.expiresAt)) {
    return null
  }

  return session
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function updateSession(request: NextRequest): Promise<NextResponse> {
  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value
  const response = NextResponse.next()

  if (!cookie) {
    return response
  }

  const session = await decrypt(cookie)

  if (!session) {
    response.cookies.delete(SESSION_COOKIE_NAME)
    return response
  }

  if (isExpired(session.expiresAt)) {
    response.cookies.delete(SESSION_COOKIE_NAME)
    return response
  }

  const refreshed = await encrypt({ ...session, expiresAt: Date.now() + SESSION_DURATION_MS })

  response.cookies.set(SESSION_COOKIE_NAME, refreshed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + SESSION_DURATION_MS),
    sameSite: "lax",
    path: "/",
  })

  return response
}

export function getPasscodeForClient(clientSlug: string): string | null {
  const envKey = `CLIENT_${clientSlug.toUpperCase()}_PASSCODE`
  return process.env[envKey] ?? null
}
