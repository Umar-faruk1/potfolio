"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type ExperienceItem = {
  id: number
  title: string
  company: string
  period: string
  description: string
  skills: string[]
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Escript Solutions",
      period: "2021 - 2022",
      description:
        "Developed and implemented Python web scraping scripts using BeautifulSoup to efficiently retrieve images from various websites, enhancing data collection capabilities and reducing manual data entry time by 50%.",
      skills: ["Reactjs", "TypeScript", "Beautiful Soup", "Python"],
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Omni Strategies",
      period: "2024 - 2025",
description: `Contributing to the development and maintenance of internal software tools, focusing on functionality and user experience.
              Collaborating with senior developers to build scalable web applications and fix bugs.
              
`,
      skills: ["Reactjs", "JavaScript", "CSS", "Nextjs", "Docker"],
    },
    // {
    //   id: 3,
    //   title: "UI/UX Developer",
    //   company: "Spellbound Solutions",
    //   period: "2017 - 2019",
    //   description:
    //     "Designed and implemented user interfaces for mobile and web applications. Collaborated with designers to create seamless user experiences.",
    //   skills: ["HTML", "CSS", "JavaScript", "Figma"],
    // },
  ]

  return (
    <section id="experience" ref={ref} className="py-20 md:py-32 relative">
      <div className="container px-4 md:px-6">
        <motion.div style={{ opacity }} className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                Professional Journey
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My professional adventure through the realms of web development.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 to-blue-500 transform md:translate-x-[-0.5px]"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 50,
                  }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 w-6 h-6 rounded-full bg-background border-2 border-purple-500 transform translate-x-[-10px] md:translate-x-[-12px] z-10">
                    <motion.div
                      className="absolute inset-1 rounded-full bg-purple-500"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>

                  {/* Date for mobile */}
                  <div className="md:hidden pl-8 text-sm font-medium text-muted-foreground">{exp.period}</div>

                  {/* Content */}
                  <div className={`md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="hidden md:block text-sm font-medium text-muted-foreground mb-2">{exp.period}</div>
                    <Card className="overflow-hidden border border-purple-500/10 bg-background/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                        <p className="text-purple-500 mb-4">{exp.company}</p>
                        <p className="text-muted-foreground mb-4">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="bg-background/50">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Empty div for layout */}
                  <div className="hidden md:block md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
