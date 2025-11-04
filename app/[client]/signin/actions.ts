"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const createSupabaseServerClient = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase environment variables not configured.")
  }

  const cookieStore = await cookies()
  type CookieOptions = Parameters<typeof cookieStore.set>[2]

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: (name: string) => cookieStore.get(name)?.value,
      set: (name: string, value: string, options?: CookieOptions) => {
        if (options) {
          cookieStore.set(name, value, options)
        } else {
          cookieStore.set(name, value)
        }
      },
      remove: (name: string, options?: CookieOptions) => {
        if (options) {
          cookieStore.set(name, "", options)
        } else {
          cookieStore.set(name, "")
        }
      },
    },
  })
}

export async function signIn(formData: FormData) {
  const email = formData.get("email")
  const password = formData.get("password")

  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Email and password are required.")
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    throw new Error(error.message)
  }

  redirect("/dashboard")
}
