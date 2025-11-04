import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

// Validation schema for client intake data
const IntakeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand/business name is required"),
  goals: z.string().min(1, "Project goals are required"),
  budget: z.string().min(1, "Budget range is required"),
  email: z.string().email().optional(),
  source: z.enum(["agent", "site"]).default("agent"),
})

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      const body = await request.json()
      return NextResponse.json({
        success: true,
        data: {
          id: `demo-${Date.now()}`,
          createdAt: new Date().toISOString(),
          note: "Demo mode - Supabase not configured",
          receivedData: body,
        },
      })
    }

    const body = await request.json()
    const parseResult = IntakeSchema.safeParse(body)

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parseResult.error.errors },
        { status: 400 }
      )
    }

    const validatedData = parseResult.data
    const { data, error } = await supabaseAdmin
      .from("client_intake")
      .insert([validatedData])
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to save client intake", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: data.id,
        createdAt: data.created_at,
      },
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
