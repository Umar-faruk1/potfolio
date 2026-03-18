"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ExternalLink, Github, X } from "lucide-react"
import Image from "next/image"
import { createBrowserClient } from "@/lib/supabase"

type Project = {
  id: number
  title: string
  description: string
  image: string | null
  tags: string[]
  demo_url: string | null
  github_url: string | null
  long_description: string | null
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const supabase = createBrowserClient()
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("id", { ascending: false })
        if (error) throw error
        setProjects((data as Project[]) || [])
      } catch (e) {
        setProjects([])
      }
    }
    fetchProjects()
  }, [])

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              Projects
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my enchanted portfolio of projects, each crafted with care and a touch of magic.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 50,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105"></div>
              <Card className="overflow-hidden border border-purple-500/10 bg-background/80 backdrop-blur-sm h-full flex flex-col">
                <div className="relative overflow-hidden aspect-video">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-background/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between">
                  <Button variant="outline" size="sm" className="group" onClick={() => setSelectedProject(project)}>
                    View Details
                    <motion.span initial={{ scale: 1 }} whileHover={{ scale: 1.2 }} className="ml-2">
                      ✨
                    </motion.span>
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a href={project.github_url || "#"} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={project.demo_url || "#"} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Live Demo</span>
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="sm:max-w-[700px] md:max-w-[800px] w-[95vw] p-0 bg-background/95 backdrop-blur-xl border border-purple-500/20 max-h-[85vh] overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-video">
                  <Image
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    width={800}
                    height={600}
                    className="object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <div className="p-6 space-y-4">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedProject.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-background/50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </DialogHeader>
                  <DialogDescription className="text-base leading-relaxed">
                    {selectedProject.long_description}
                  </DialogDescription>
                  <div className="flex justify-between mt-6">
                    <Button asChild>
                      <a href={selectedProject.demo_url || "#"} target="_blank" rel="noopener noreferrer">
                        Live Demo
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={selectedProject.github_url || "#"} target="_blank" rel="noopener noreferrer">
                        View Code
                        <Github className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  )
}
