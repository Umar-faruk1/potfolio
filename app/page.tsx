import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
// import BlogPreview from "@/components/blog-preview"
import { Toaster } from "sonner"
// import { getBlogPosts } from "./actions/blog"

export default async function Home() {
  // const posts = await getBlogPosts()

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80 overflow-hidden">
      <Toaster position="top-center" />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      {/* <BlogPreview posts={posts} /> */}
      <Contact />
      <Footer />
    </main>
  )
}
