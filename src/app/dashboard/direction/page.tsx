'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { TrendingUp, AlertCircle, Target, BookOpen, Sparkles, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
}

const weekStart = new Date()
weekStart.setDate(weekStart.getDate() - weekStart.getDay())
const weekEnd = new Date(weekStart)
weekEnd.setDate(weekEnd.getDate() + 6)

export default function DirectionPage() {
  const [direction, setDirection] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    loadDirection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadDirection = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    const { data } = await supabase
      .from('weekly_directions')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    if (data) setDirection(data)
    setLoading(false)
  }

  const generateDirection = async () => {
    setGenerating(true)
    try {
      const res = await fetch('/api/direction', { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setDirection(data.direction)
      }
    } catch {} finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!direction) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Sparkles className="mx-auto h-8 w-8 text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground mb-4">No weekly direction yet</p>
          <Button onClick={generateDirection} disabled={generating} size="sm" className="gap-1.5">
            <RefreshCw className={cn('h-3.5 w-3.5', generating && 'animate-spin')} />
            Generate Direction
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <motion.div initial="initial" animate="animate" variants={staggerContainer}>
        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">This Week</h1>
            <p className="text-sm text-muted-foreground">
              {weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} &mdash;{' '}
              {weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <Button onClick={generateDirection} disabled={generating} variant="outline" size="sm" className="gap-1.5">
            <RefreshCw className={cn('h-3.5 w-3.5', generating && 'animate-spin')} />
            Refresh
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <Target className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <CardTitle className="text-sm">Priorities</CardTitle>
                  <CardDescription>Focus on these to move forward</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {direction.priorities?.map((p: string, i: number) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {p}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <TrendingUp className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <CardTitle className="text-sm">Focus Areas</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {direction.focus_suggestions?.map((s: string, i: number) => (
                <div key={i} className="flex gap-2.5 rounded-lg border p-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-sm">{s}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <BookOpen className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <CardTitle className="text-sm">Skills to Build</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2">
              {direction.skill_recommendations?.map((s: string, i: number) => (
                <div key={i} className="rounded-lg border p-3 text-sm">{s}</div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {direction.productivity_warnings?.length > 0 && (
          <motion.div variants={fadeInUp}>
            <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-950/10">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                  <div>
                    <CardTitle className="text-sm text-amber-900 dark:text-amber-100">Watch Out For</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {direction.productivity_warnings?.map((w: string, i: number) => (
                  <p key={i} className="text-sm text-amber-800 dark:text-amber-200">&bull; {w}</p>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {direction.next_steps?.map((s: string, i: number) => (
                <div key={i} className="flex gap-3 rounded-lg border p-3 text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary flex-shrink-0">
                    {i + 1}
                  </span>
                  {s}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
