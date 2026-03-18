// "use client"

// import { motion } from "framer-motion"
// // import type { BlogPost as BlogPostType } from "@/app/actions/blog"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { useEffect, useState } from "react"
// import ReactMarkdown from "react-markdown"
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
// import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

// export default function BlogPost({ post }: { post: BlogPostType }) {
//   const [formattedDate, setFormattedDate] = useState<string>("")

//   useEffect(() => {
//     setFormattedDate(
//       new Date(post.published_at).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       }),
//     )
//   }, [post.published_at])

//   return (
//     <section className="py-12 md:py-20 relative">
//       <div className="container px-4 md:px-6 max-w-4xl">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-8"
//         >
//           <Button variant="ghost" size="sm" className="group mb-6" asChild>
//             <Link href="/blog">
//               <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
//               Back to Blog
//             </Link>
//           </Button>

//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
//           <p className="text-muted-foreground">{formattedDate}</p>
//         </motion.div>

//         {post.cover_image && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="relative mb-12 rounded-xl overflow-hidden"
//           >
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-30"></div>
//             <div className="relative rounded-xl overflow-hidden">
//               <Image
//                 src={post.cover_image || "/placeholder.svg"}
//                 alt={post.title}
//                 width={1200}
//                 height={600}
//                 className="w-full h-auto object-cover"
//               />
//             </div>
//           </motion.div>
//         )}

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="prose prose-lg dark:prose-invert max-w-none"
//         >
//           <ReactMarkdown
//             components={{
//               code({ node, inline, className, children, ...props }) {
//                 const match = /language-(\w+)/.exec(className || "")
//                 return !inline && match ? (
//                   <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" {...props}>
//                     {String(children).replace(/\n$/, "")}
//                   </SyntaxHighlighter>
//                 ) : (
//                   <code className={className} {...props}>
//                     {children}
//                   </code>
//                 )
//               },
//             }}
//           >
//             {post.content}
//           </ReactMarkdown>
//         </motion.div>
//       </div>
//     </section>
//   )
// }
