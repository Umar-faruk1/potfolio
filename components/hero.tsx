"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import ParticleBackground from "./particle-background"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      <div className="container relative z-10 px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-left"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              className="inline-block mb-4"
            >
              <div className="relative inline-flex items-center justify-center p-1 overflow-hidden text-sm font-medium rounded-full group bg-gradient-to-br from-purple-600 to-blue-500">
                <span className="relative px-5 py-1.5 transition-all ease-in duration-75 bg-background dark:bg-background rounded-full">
                  Frontend Developer
                </span>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Umar Faruk
            </motion.h1>

            <motion.p
              className="max-w-[500px] text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Detail oriented Software Developer with strong expertise in building responsive, user-friendly,
               and scalable web applications. Skilled in translating UI/UX designs into interactive applications, 
               integrating APIs, and improving digital experiences.
               Passionate about leveraging modern technologies to create impactful digital solutions.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Button size="lg" className="group relative overflow-hidden" asChild>
                <a href="#contact">
                  <span className="relative z-10">Let&apos;s Talk</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <Sparkles className="ml-2 h-4 w-4 group-hover:animate-pulse" />
                </a>
              </Button>

              <Button variant="outline" size="lg" className="group" asChild>
                <a href="#projects">
                  View Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>

            </motion.div>
          </motion.div>

          {/* Right column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-30 animate-pulse"></div>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="relative w-45 rounded-2xl overflow-hidden border border-purple-500/20 bg-background/80 backdrop-blur-sm shadow-xl"
            >
              <Image
                src="/image1.jpg"
                width={600}
                height={600}
                alt="Umar Faruk - Frontend Developer"
                className="w-full h-auto"
                priority
              />

              {/* Magical overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background/20"></div>

              {/* Sparkle effects */}
              <motion.div
                className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-purple-500"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
              <motion.div
                className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-blue-500"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 0.5,
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-primary flex justify-center items-start p-1">
              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="w-1 h-1 bg-primary rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
