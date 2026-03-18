"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { createBrowserClient } from "@/lib/supabase"
import { toast } from "sonner"

type Project = {
  id: number
  title: string
  description: string
  image: string | null
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const supabase = createBrowserClient()
      const { data, error } = await supabase.from("projects").select("id,title,description,image").order("id", { ascending: false })
      if (error) throw error
      setProjects((data as Project[]) || [])
    } catch (e: any) {
      toast.error(e.message || "Failed to load projects")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onDelete = async (id: number) => {
    if (!confirm("Delete this project?")) return
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Delete failed")
      toast.success("Deleted")
      load()
    } catch (e: any) {
      toast.error(e.message || "Delete failed")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button asChild>
          <Link href="/admin/projects/new">Add New</Link>
        </Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : projects.length === 0 ? (
        <div>No projects yet.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.map((p) => (
            <Card key={p.id}>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-16 relative rounded overflow-hidden bg-muted">
                    <Image src={p.image || "/placeholder.svg"} alt="thumb" fill className="object-cover" />
                  </div>
                  <CardTitle className="text-lg">{p.title}</CardTitle>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" asChild>
                    <Link href={`/admin/projects/${p.id}/edit`}>Edit</Link>
                  </Button>
                  <Button variant="destructive" onClick={() => onDelete(p.id)}>
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{p.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}


