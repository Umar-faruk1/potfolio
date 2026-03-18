"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const schema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  longDescription: z.string().optional(),
  demoUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  tags: z.string().optional(),
  image: z
    .any()
    .refine((files) => !files || (typeof files === "object" && "length" in files && (files as FileList).length <= 1), "Upload up to one image")
    .optional(),
})

type FormValues = z.infer<typeof schema>

export default function NewProjectPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)
      const form = new FormData()
      form.append("title", values.title)
      form.append("description", values.description)
      if (values.longDescription) form.append("longDescription", values.longDescription)
      if (values.demoUrl) form.append("demoUrl", values.demoUrl)
      if (values.githubUrl) form.append("githubUrl", values.githubUrl)
      if (values.tags) form.append("tags", values.tags)
      const files = (values as any).image as FileList | undefined
      if (files && files.length > 0) {
        form.append("image", files[0])
      }

      const res = await fetch("/api/projects", {
        method: "POST",
        body: form,
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to create project")
      }
      toast.success("Project created")
      reset()
      router.push("/#projects")
    } catch (err: any) {
      toast.error(err.message || "Error creating project")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
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
              <Textarea rows={6} {...register("longDescription")} />
            </div>
            <div>
              <label className="block mb-2">Tags (comma separated)</label>
              <Input type="text" placeholder="React, Next.js, Tailwind" {...register("tags")} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Live Demo URL</label>
                <Input type="url" placeholder="https://..." {...register("demoUrl")} />
                {errors.demoUrl && <p className="text-sm text-red-500 mt-1">{errors.demoUrl.message}</p>}
              </div>
              <div>
                <label className="block mb-2">GitHub URL</label>
                <Input type="url" placeholder="https://github.com/..." {...register("githubUrl")} />
                {errors.githubUrl && <p className="text-sm text-red-500 mt-1">{errors.githubUrl.message}</p>}
              </div>
            </div>
            <div>
              <label className="block mb-2">Image</label>
              {(() => {
                const imageRegister = register("image")
                return (
                  <>
                    <Input
                      type="file"
                      accept="image/*"
                      {...imageRegister}
                      onChange={(e) => {
                        imageRegister.onChange(e)
                        const file = e.target.files && e.target.files[0]
                        if (file) {
                          const url = URL.createObjectURL(file)
                          setPreviewUrl((prev) => {
                            if (prev) URL.revokeObjectURL(prev)
                            return url
                          })
                        } else {
                          setPreviewUrl((prev) => {
                            if (prev) URL.revokeObjectURL(prev)
                            return null
                          })
                        }
                      }}
                    />
                    {previewUrl && (
                      <div className="mt-3">
                        <img src={previewUrl} alt="Preview" className="h-40 w-auto rounded-md border" />
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Create Project"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


