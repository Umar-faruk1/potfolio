// "use server"

// import { createServerClient } from "@/lib/supabase"

// export type BlogPost = {
//   id: number
//   title: string
//   slug: string
//   excerpt: string | null
//   content: string
//   cover_image: string | null
//   published_at: string
//   updated_at: string
//   is_published: boolean
// }

// export async function getBlogPosts() {
//   const supabase = createServerClient()

//   const { data, error } = await supabase
//     .from("blog_posts")
//     .select("*")
//     .eq("is_published", true)
//     .order("published_at", { ascending: false })

//   if (error) {
//     console.error("Error fetching blog posts:", error)
//     return []
//   }

//   return data as BlogPost[]
// }

// export async function getBlogPostBySlug(slug: string) {
//   const supabase = createServerClient()

//   const { data, error } = await supabase
//     .from("blog_posts")
//     .select("*")
//     .eq("slug", slug)
//     .eq("is_published", true)
//     .single()

//   if (error) {
//     console.error("Error fetching blog post:", error)
//     return null
//   }

//   return data as BlogPost
// }
