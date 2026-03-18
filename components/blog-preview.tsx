// "use client"

// import { motion } from "framer-motion"
// import type { BlogPost } from "@/app/actions/blog"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { ArrowRight } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { useEffect, useState } from "react"

// export default function BlogPreview({ posts }: { posts: BlogPost[] }) {
//   const [formattedDates, setFormattedDates] = useState<Record<number, string>>({})

//   useEffect(() => {
//     const dates: Record<number, string> = {}
//     posts.forEach((post) => {
//       dates[post.id] = new Date(post.published_at).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       })
//     })
//     setFormattedDates(dates)
//   }, [posts])

//   return (
//     <section id="blog" className="py-20 md:py-32 relative">
//       <div className="container px-4 md:px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
//               Magical Insights
//             </span>
//           </h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Thoughts, tutorials, and insights on web development, UI/UX design, and software engineering.
//           </p>
//         </motion.div>

//         {posts.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-muted-foreground">No blog posts found. Check back soon!</p>
//           </div>
//         ) : (
//           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//             {posts.slice(0, 3).map((post, index) => (
//               <motion.div
//                 key={post.id}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{
//                   duration: 0.5,
//                   delay: index * 0.1,
//                   type: "spring",
//                   stiffness: 50,
//                 }}
//                 viewport={{ once: true }}
//                 whileHover={{
//                   y: -10,
//                   transition: { duration: 0.3 },
//                 }}
//                 className="relative group"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105"></div>
//                 <Card className="overflow-hidden border border-purple-500/10 bg-background/80 backdrop-blur-sm h-full flex flex-col">
//                   <div className="relative overflow-hidden aspect-video">
//                     <Image
//                       src={post.cover_image || "/placeholder.svg?height=600&width=800"}
//                       alt={post.title}
//                       width={800}
//                       height={600}
//                       className="object-cover transition-transform duration-500 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   </div>
//                   <CardContent className="p-6 flex-grow flex flex-col">
//                     <div className="mb-4">
//                       <Badge variant="outline" className="bg-background/50">
//                         {formattedDates[post.id] || ""}
//                       </Badge>
//                     </div>
//                     <h2 className="text-xl font-bold mb-2">{post.title}</h2>
//                     <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
//                     <Button variant="ghost" size="sm" className="group w-fit mt-auto" asChild>
//                       <Link href={`/blog/${post.slug}`}>
//                         Read More
//                         <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//                       </Link>
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           viewport={{ once: true }}
//           className="flex justify-center mt-12"
//         >
//           <Button size="lg" variant="outline" className="group" asChild>
//             <Link href="/blog">
//               View All Posts
//               <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//             </Link>
//           </Button>
//         </motion.div>
//       </div>
//     </section>
//   )
// }
