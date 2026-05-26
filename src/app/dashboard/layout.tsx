'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageSquare, TrendingUp, Zap, User, Calendar, ChevronDown, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const NAVIGATION_ITEMS = [
  { label: 'Mentor', href: '/dashboard/mentor', icon: MessageSquare },
  { label: 'This Week', href: '/dashboard/direction', icon: Calendar },
  { label: 'Opportunities', href: '/dashboard/opportunities', icon: Zap },
  { label: 'Timeline', href: '/dashboard/timeline', icon: TrendingUp },
  { label: 'Profile', href: '/dashboard/profile', icon: User },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <motion.div
        className={cn(
          'border-r border-border/40 bg-card transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between border-b border-border/40 px-4 py-6">
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: sidebarOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700" />
              {sidebarOpen && <span className="font-semibold">Northstar</span>}
            </motion.div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <ChevronDown className={cn(
                'h-4 w-4 transition-transform',
                sidebarOpen ? 'rotate-90' : 'rotate-0'
              )} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto px-2 py-4">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={cn('w-full justify-start', !sidebarOpen && 'px-0')}
                  >
                    <Icon className="h-4 w-4" />
                    {sidebarOpen && <span className="ml-2">{item.label}</span>}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-border/40 px-2 py-4">
            <Button variant="ghost" className={cn('w-full justify-start', !sidebarOpen && 'px-0')}>
              <LogOut className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2 text-xs">Sign Out</span>}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
