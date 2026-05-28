'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  MessageSquare,
  TrendingUp,
  Zap,
  User,
  Calendar,
  ChevronDown,
  LogOut,
  Moon,
  Sun,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-content'
import { useEffect } from 'react'

const NAVIGATION_ITEMS = [
  { label: 'Mentor', href: '/dashboard/mentor', icon: MessageSquare },
  { label: 'This Week', href: '/dashboard/direction', icon: Calendar },
  { label: 'Opportunities', href: '/dashboard/opportunities', icon: Zap },
  { label: 'Timeline', href: '/dashboard/timeline', icon: TrendingUp },
  { label: 'Profile', href: '/dashboard/profile', icon: User },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mounted, setMounted] = useState(false)
  const { user, signOut } = useAuth()

  useEffect(() => {
    setMounted(true)
    // #region agent log
    fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
      body: JSON.stringify({
        sessionId: 'ce31a0',
        runId: 'pre-fix',
        hypothesisId: 'H4',
        location: 'src/app/dashboard/layout.tsx:useEffect',
        message: 'DashboardLayout mounted (theme snapshot)',
        data: {
          localStorageTheme: (() => {
            try { return localStorage.getItem('northstar-theme') } catch { return 'error' }
          })(),
          htmlHasDarkClass: document.documentElement.classList.contains('dark'),
          pathname,
          hasUser: Boolean(user),
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion
  }, [pathname, user])

  const toggleTheme = () => {
    const html = document.documentElement
    const isDark = html.classList.toggle('dark')
    localStorage.setItem('northstar-theme', isDark ? 'dark' : 'light')
  }

  const isDark = mounted && document.documentElement.classList.contains('dark')

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <motion.div
        className={cn(
          'm-3 mr-0 flex flex-col rounded-2xl border bg-card transition-all duration-300',
          sidebarOpen ? 'w-60' : 'w-16'
        )}
        layout
      >
        <div className="flex items-center justify-between border-b px-4 py-5">
          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            {sidebarOpen && <span className="text-sm font-semibold tracking-tight">Northstar</span>}
          </motion.div>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', sidebarOpen && '-rotate-90')} />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="border-t px-2 py-4 space-y-1">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {sidebarOpen && <span>{isDark ? 'Light mode' : 'Dark mode'}</span>}
            </button>
          )}
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            {sidebarOpen && <span>Sign out</span>}
          </button>
        </div>
      </motion.div>

      <div className="flex-1 overflow-y-auto p-3 pl-4">{children}</div>
    </div>
  )
}
