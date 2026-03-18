// import BlogPost from "@/components/blog-post"
// import { getBlogPostBySlug } from "../../actions/blog"
// import { notFound } from "next/navigation"

// export default async function BlogPostPage({ params }: { params: { slug: string } }) {
//   const post = await getBlogPostBySlug(params.slug)

//   if (!post) {
//     notFound()
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-background to-background/80 overflow-hidden">
//       <BlogPost post={post} />
//     </main>
//   )
// } 