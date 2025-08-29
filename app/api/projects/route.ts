import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

type IncomingProject = {
  title: string
  description: string
  image?: string
  tags?: string[]
  demoUrl?: string
  githubUrl?: string
  longDescription?: string
}

function getServerClient() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY envs")
  }
  return createClient(url, key)
}

const STORAGE_BUCKET = process.env.SUPABASE_PROJECTS_BUCKET || "project-images"
const DEFAULT_IMAGE_URL = process.env.PROJECT_DEFAULT_IMAGE_URL || "/placeholder.svg"

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || ""
    const supabase = getServerClient()

    // Handle JSON body
    if (contentType.includes("application/json")) {
      const body = (await req.json()) as IncomingProject
      if (!body.title || !body.description) {
        return NextResponse.json({ error: "title and description are required" }, { status: 400 })
      }

      const { data, error } = await supabase
        .from("projects")
        .insert({
          title: body.title,
          description: body.description,
          image: body.image ?? null,
          tags: body.tags ?? [],
          demo_url: body.demoUrl ?? null,
          github_url: body.githubUrl ?? null,
          long_description: body.longDescription ?? null,
        })
        .select("*")
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({ project: data }, { status: 201 })
    }

    // Handle multipart/form-data with optional file upload
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData()
      const title = String(form.get("title") || "")
      const description = String(form.get("description") || "")
      const tagsString = String(form.get("tags") || "")
      const demoUrl = String(form.get("demoUrl") || "")
      const githubUrl = String(form.get("githubUrl") || "")
      const longDescription = String(form.get("longDescription") || "")
      const file = form.get("image") as File | null

      if (!title || !description) {
        return NextResponse.json({ error: "title and description are required" }, { status: 400 })
      }

      let imageUrl: string | null = null
      if (file && typeof file === "object") {
        const arrayBuffer = await file.arrayBuffer()
        const fileBytes = new Uint8Array(arrayBuffer)
        const path = `projects/${Date.now()}-${file.name}`
        let { data: uploadData, error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(path, fileBytes, {
            contentType: file.type || "application/octet-stream",
            upsert: false,
          })
        // If bucket is missing and we have a service role key, create it and retry once
        if (uploadError && (String(uploadError.message).toLowerCase().includes("bucket") || String(uploadError.message).toLowerCase().includes("not found"))) {
          const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
          if (serviceKey) {
            try {
              // create bucket (idempotent if already exists)
              // @ts-ignore - createBucket available with service role
              await (supabase.storage as any).createBucket(STORAGE_BUCKET, { public: true })
              const retry = await supabase.storage
                .from(STORAGE_BUCKET)
                .upload(path, fileBytes, {
                  contentType: file.type || "application/octet-stream",
                  upsert: false,
                })
              uploadData = retry.data
              uploadError = retry.error as any
            } catch (_) {
              // ignore and fall through to error response
            }
          }
        }
        if (uploadError || !uploadData) {
          const message = uploadError?.message || "No upload data returned"
          return NextResponse.json({ error: `Storage upload failed: ${message}. Ensure bucket '${STORAGE_BUCKET}' exists or set SUPABASE_PROJECTS_BUCKET.` }, { status: 500 })
        }
        const { data: publicUrl } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(uploadData.path)
        imageUrl = publicUrl.publicUrl
      }

      const tags = tagsString
        ? tagsString
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : []

      if (!imageUrl) {
        imageUrl = DEFAULT_IMAGE_URL || null
      }

      const { data, error } = await supabase
        .from("projects")
        .insert({
          title,
          description,
          image: imageUrl,
          tags,
          demo_url: demoUrl || null,
          github_url: githubUrl || null,
          long_description: longDescription || null,
        })
        .select("*")
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({ project: data }, { status: 201 })
    }

    return NextResponse.json({ error: "Unsupported content type" }, { status: 415 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Unknown error" }, { status: 500 })
  }
}



