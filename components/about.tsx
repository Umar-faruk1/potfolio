"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Briefcase, Sparkles, Lightbulb } from "lucide-react"

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  const skills = [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "Framer Motion",
    "GraphQL",
    "AWS",
    "Docker",
    "Git",
  ]

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 relative">
      <div className="container px-4 md:px-6">
        <motion.div style={{ opacity, y }} className="grid gap-12 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                  About Me
                </span>
                <Sparkles className="ml-2 h-5 w-5 text-purple-500" />
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="prose prose-lg dark:prose-invert"
            >
              <p>
                I'm a passionate software engineer with a flair for creating magical digital experiences. With over 5
                years of experience in web development, I specialize in building responsive, accessible, and performant
                applications.
              </p>
              <p>
                My journey in the world of programming began when I discovered the enchanting power of turning ideas
                into reality through code. Since then, I've been on a quest to master the arcane arts of modern web
                development.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 mt-6"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.1,
                    rotate: [-1, 1, -1, 0],
                    transition: { duration: 0.3 },
                  }}
                >
                  <Badge
                    variant="outline"
                    className="px-3 py-1 text-sm bg-background/50 backdrop-blur-sm border border-purple-500/20"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl -z-10 transform -rotate-3"></div>
              <Card className="overflow-hidden border border-purple-500/20 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-full bg-purple-500/10">
                      <Code className="h-5 w-5 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Development Philosophy</h3>
                  </div>
                  <p className="text-muted-foreground">
                    I believe in writing clean, maintainable code that balances innovation with reliability. My approach
                    combines technical excellence with creative problem-solving.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl -z-10 transform rotate-3"></div>
              <Card className="overflow-hidden border border-blue-500/20 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-full bg-blue-500/10">
                      <Briefcase className="h-5 w-5 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Work Approach</h3>
                  </div>
                  <p className="text-muted-foreground">
                    I thrive in collaborative environments where creativity meets technical challenges. I'm passionate
                    about creating intuitive user experiences that feel magical.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl -z-10 transform -rotate-2"></div>
              <Card className="overflow-hidden border border-purple-500/20 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-full bg-purple-500/10">
                      <Lightbulb className="h-5 w-5 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Continuous Learning</h3>
                  </div>
                  <p className="text-muted-foreground">
                    The tech world evolves rapidly, and I'm committed to staying at the forefront. I regularly explore
                    new technologies and techniques to enhance my craft.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
