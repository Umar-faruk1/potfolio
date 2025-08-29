import type React from "react"
import Link from "next/link"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <aside className="md:col-span-3 lg:col-span-2">
          <nav className="sticky top-20 space-y-2">
            <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Admin</div>
            <ul className="space-y-1">
              <li>
                <Link href="/admin/projects" className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/admin/projects/new" className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">
                  Add New Project
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="md:col-span-9 lg:col-span-10">{children}</main>
      </div>
    </div>
  )
}


