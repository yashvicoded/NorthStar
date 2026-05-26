'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Zap, Target, Rocket, Award, TrendingUp, Sparkles } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
}

const FALLBACK_EVENTS = [
  {
    id: '1', date: new Date(Date.now() - 2 * 86400000), type: 'milestone', icon: Rocket,
    title: 'Started using Northstar', description: 'Began your mentorship journey',
    tags: ['milestone'],
  },
  {
    id: '2', date: new Date(Date.now() - 7 * 86400000), type: 'achievement', icon: Award,
    title: 'Set up your profile', description: 'Completed onboarding and defined your goals',
    tags: ['onboarding'],
  },
]

const ICONS: Record<string, any> = {
  milestone: Rocket, achievement: Award, goal: Target, project: TrendingUp, opportunity: Zap,
}

const ICON_COLORS: Record<string, string> = {
  milestone: 'text-sage-500', achievement: 'text-emerald-500', goal: 'text-amber-500',
  project: 'text-purple-500', opportunity: 'text-primary',
}

export default function TimelinePage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    loadTimeline()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadTimeline = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setEvents(FALLBACK_EVENTS); setLoading(false); return }
    const { data } = await supabase
      .from('timeline_events')
      .select('*')
      .eq('user_id', session.user.id)
      .order('date', { ascending: false })
    setEvents(data && data.length > 0 ? data : FALLBACK_EVENTS)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <motion.div initial="initial" animate="animate" variants={staggerContainer}>
        <motion.div variants={fadeInUp}>
          <h1 className="text-xl font-semibold tracking-tight">Your Journey</h1>
          <p className="text-sm text-muted-foreground">Your engineering growth timeline</p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <div className="relative space-y-6 pl-6">
            <div className="absolute left-[7px] top-2 bottom-0 w-px bg-gradient-to-b from-primary to-transparent" />

            {events.map((event: any, index: number) => {
              const Icon = ICONS[event.type] || Sparkles
              const colorClass = ICON_COLORS[event.type] || 'text-primary'

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="relative"
                >
                  <div className={cn('absolute -left-[22px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-background bg-primary')}>
                    <div className={cn('h-1 w-1 rounded-full bg-background')} />
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Icon className={cn('h-4 w-4', colorClass)} />
                          <CardTitle className="text-sm">{event.title}</CardTitle>
                        </div>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary capitalize whitespace-nowrap">
                          {event.type}
                        </span>
                      </div>
                      <CardDescription className="text-xs">{formatDate(event.date)}</CardDescription>
                    </CardHeader>
                    {event.description && (
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
