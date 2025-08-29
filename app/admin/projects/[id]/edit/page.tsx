"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createBrowserClient } from "@/lib/supabase"
import { toast } from "sonner"

const schema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  long_description: z.string().optional().nullable(),
  demo_url: z.string().url().optional().or(z.literal("")).nullable(),
  github_url: z.string().url().optional().or(z.literal("")).nullable(),
  tags: z.string().optional(),
  image: z.string().optional().nullable(),
})

type FormValues = z.infer<typeof schema>

export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = Number(params.id)
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  useEffect(() => {
    const load = async () => {
      try {
        const supabase = createBrowserClient()
        const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()
        if (error) throw error
        reset({
          title: data.title || "",
          description: data.description || "",
          long_description: data.long_description || "",
          demo_url: data.demo_url || "",
          github_url: data.github_url || "",
          tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
          image: data.image || "",
        })
      } catch (e: any) {
        toast.error(e.message || "Failed to load project")
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id, reset])

  const onSubmit = async (values: FormValues) => {
    try {
      const payload = {
        title: values.title,
        description: values.description,
        long_description: values.long_description || null,
        demo_url: values.demo_url || null,
        github_url: values.github_url || null,
        tags: values.tags
          ? values.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        image: values.image || null,
      }
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Update failed")
      toast.success("Project updated")
      router.push("/admin/projects")
    } catch (e: any) {
      toast.error(e.message || "Update failed")
    }
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-2">Title</label>
              <Input type="text" {...register("title")} />
              {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <label className="block mb-2">Short Description</label>
              <Textarea rows={3} {...register("description")} />
              {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
            </div>
            <div>
              <label className="block mb-2">Long Description</label>
              <Textarea rows={6} {...register("long_description")} />
            </div>
            <div>
              <label className="block mb-2">Tags (comma separated)</label>
              <Input type="text" placeholder="React, Next.js, Tailwind" {...register("tags")} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Live Demo URL</label>
                <Input type="url" placeholder="https://..." {...register("demo_url")} />
              </div>
              <div>
                <label className="block mb-2">GitHub URL</label>
                <Input type="url" placeholder="https://github.com/..." {...register("github_url")} />
              </div>
            </div>
            <div>
              <label className="block mb-2">Image URL</label>
              <Input type="url" placeholder="https://..." {...register("image")} />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


