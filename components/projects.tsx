"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ExternalLink, Github, X } from "lucide-react"
import Image from "next/image"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  githubUrl: string
  longDescription: string
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: "Enchanted E-Commerce",
      description: "A magical shopping experience with animations and microinteractions",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "Next.js", "Framer Motion", "Tailwind CSS"],
      demoUrl: "#",
      githubUrl: "#",
      longDescription:
        "Enchanted E-Commerce is a full-featured online store with a magical twist. The project features custom animations for product reveals, an enchanted shopping cart experience, and spellbinding checkout flow. Built with performance and accessibility in mind, it delivers a seamless shopping experience across all devices.",
    },
    {
      id: 2,
      title: "Spellbook Dashboard",
      description: "Admin dashboard with magical data visualizations and interactions",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "TypeScript", "D3.js", "Tailwind CSS"],
      demoUrl: "#",
      githubUrl: "#",
      longDescription:
        "Spellbook Dashboard transforms complex data into intuitive visualizations with magical interactions. The dashboard features real-time updates, customizable widgets, and interactive charts that respond to user gestures like they're casting spells. The project demonstrates advanced state management and optimization techniques.",
    },
    {
      id: 3,
      title: "Potion Maker",
      description: "Interactive web app for creating and sharing virtual potions",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "Three.js", "WebGL", "Firebase"],
      demoUrl: "#",
      githubUrl: "#",
      longDescription:
        "Potion Maker is an interactive web application that allows users to create, customize, and share virtual potions. The app features realistic fluid simulations using WebGL, particle effects for magical interactions, and a community feature for sharing creations. The project showcases advanced 3D rendering techniques and real-time database integration.",
    },
    {
      id: 4,
      title: "Wizard's Weather",
      description: "Weather forecast app with magical themed visualizations",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "OpenWeather API", "Canvas API", "Tailwind CSS"],
      demoUrl: "#",
      githubUrl: "#",
      longDescription:
        "Wizard's Weather transforms ordinary weather forecasts into magical experiences. The app features custom animations for different weather conditions, location-based forecasts, and interactive elements that respond to the current weather. The project demonstrates API integration, geolocation features, and advanced canvas animations.",
    },
    {
      id: 5,
      title: "Scroll Enchantment",
      description: "Library for creating magical scroll-based animations",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["JavaScript", "TypeScript", "Animation", "Open Source"],
      demoUrl: "#",
      githubUrl: "#",
      longDescription:
        "Scroll Enchantment is a lightweight JavaScript library that makes it easy to create magical scroll-based animations. The library provides a simple API for triggering animations based on scroll position, with support for parallax effects, reveal animations, and scroll-linked interactions. The project is fully documented and includes extensive examples.",
    },
    {
      id: 6,
      title: "Magical Music Player",
      description: "Audio visualizer with enchanted interactions and effects",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "Web Audio API", "Canvas", "Styled Components"],
      demoUrl: "#",
      githubUrl: "#",
      longDescription:
        "Magical Music Player transforms audio into visual magic with real-time visualizations that respond to music. The player features custom waveform displays, frequency visualizations with magical particles, and interactive controls that feel enchanted. The project demonstrates advanced audio processing and canvas rendering techniques.",
    },
  ]

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
              Magical Creations
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
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
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
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border border-purple-500/20">
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
                <div className="p-6">
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
                  <DialogDescription className="mt-4 text-base">{selectedProject.longDescription}</DialogDescription>
                  <div className="flex justify-between mt-6">
                    <Button asChild>
                      <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">
                        Live Demo
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
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
