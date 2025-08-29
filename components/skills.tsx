"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, Database, Globe, Layers, Cpu } from "lucide-react"

type SkillCategory = {
  id: number
  title: string
  icon: React.ReactNode
  skills: string[]
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  const skillCategories: SkillCategory[] = [
    {
      id: 1,
      title: "Frontend",
      icon: <Code className="h-6 w-6 text-purple-500" />,
      skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    },
    // {
    //   id: 2,
    //   title: "Design & Animation",
    //   icon: <Palette className="h-6 w-6 text-blue-500" />,
    //   skills: ["Framer Motion", "GSAP", "Three.js", "CSS Animations", "Figma", "UI/UX Design"],
    // },
    {
      id: 3,
      title: "Backend",
      icon: <Database className="h-6 w-6 text-purple-500" />,
      skills: [ "MySQL", "PostgreSQL", "GraphQL", "REST APIs"],
    },
    {
      id: 4,
      title: "Tools",
      icon: <Cpu className="h-6 w-6 text-blue-500" />,
      skills: ["Git", "GitHub", "Docker", "VS Code", "Vercel", "Netlify"],
    },
    // {
    //   id: 5,
    //   title: "Architecture",
    //   icon: <Layers className="h-6 w-6 text-purple-500" />,
    //   skills: ["Microservices", "JAMstack", "Serverless", "Progressive Web Apps", "SPA", "SSR"],
    // },
    {
      id: 6,
      title: "Languages",
      icon: <Globe className="h-6 w-6 text-blue-500" />,
      skills: ["JavaScript", "TypeScript", "Python", "HTML", "CSS"],
    },
  ]

  return (
    <section id="skills" ref={ref} className="py-20 md:py-32 relative">
      <div className="container px-4 md:px-6">
        <motion.div style={{ opacity, y }} className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                Magical Abilities
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The spells and enchantments I've mastered throughout my journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.id}
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
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Card className="overflow-hidden border border-purple-500/10 bg-background/80 backdrop-blur-sm h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-2 rounded-full bg-background border border-purple-500/20">{category.icon}</div>
                      <h3 className="text-xl font-bold">{category.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.li
                          key={skill}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.1 * skillIndex + 0.2,
                          }}
                          viewport={{ once: true }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                          <span>{skill}</span>
                          <motion.div
                            className="ml-auto h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.random() * 30 + 70}%` }}
                            transition={{ duration: 1, delay: 0.2 * skillIndex }}
                            viewport={{ once: true }}
                          />
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
