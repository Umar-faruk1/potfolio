import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getServerClient() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY envs")
  }
  return createClient(url, key)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = getServerClient()
    const id = Number(params.id)
    const { error } = await supabase.from("projects").delete().eq("id", id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Unknown error" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = getServerClient()
    const id = Number(params.id)
    const body = await req.json()
    const allowed = ["title", "description", "image", "tags", "demo_url", "github_url", "long_description"]
    const payload: Record<string, any> = {}
    for (const key of allowed) {
      if (key in body) payload[key] = body[key]
    }
    const { data, error } = await supabase.from("projects").update(payload).eq("id", id).select("*").single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ project: data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Unknown error" }, { status: 500 })
  }
}


