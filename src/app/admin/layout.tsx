'use client'

import '../globals.css'
import { Settings, LayoutDashboard, Type, Image as ImageIcon, LogOut, Globe, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  
  const isLoginPage = pathname === '/admin/login'

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  if (isLoginPage) {
    return (
      <html lang="tr" className="dark">
        <body className="antialiased min-h-screen bg-slate-900 text-slate-100">
          {children}
        </body>
      </html>
    )
  }

  return (
    <html lang="tr" className="dark">
      <body className="antialiased min-h-screen bg-slate-900 text-slate-100 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
          <div className="p-6">
            <h1 className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
              <Settings className="w-5 h-5 text-accent" />
              ADMIN PANEL
            </h1>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/content" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Type className="w-5 h-5" />
              <span>İçerik (CMS)</span>
            </Link>
            <Link href="/admin/media" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <ImageIcon className="w-5 h-5" />
              <span>Medya Yönetimi</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Globe className="w-5 h-5" />
              <span>Genel Ayarlar</span>
            </Link>
            <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Users className="w-5 h-5" />
              <span>Kullanıcılar</span>
            </Link>
          </nav>
          
          <div className="p-4 border-t border-slate-800">
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors w-full">
              <LogOut className="w-5 h-5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
