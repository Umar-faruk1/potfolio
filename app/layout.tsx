import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Nav from "@/components/nav"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Umar Faruk - Software Engineer & Magic Maker",
  description: "Portfolio of Umar Faruk, a software engineer specializing in creating magical digital experiences.",
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Toaster position="top-right" />
          <Nav />
          <div className="pt-16">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'