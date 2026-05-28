'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ExternalLink, BookmarkPlus, Bookmark } from 'lucide-react'
import { OPPORTUNITIES } from '@/constants'
import { cn } from '@/lib/utils'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
}

const difficultyStyles: Record<string, string> = {
  beginner: 'bg-muted text-muted-foreground',
  intermediate: 'bg-primary/10 text-primary',
  advanced: 'bg-primary/20 text-primary font-medium',
}

export default function OpportunitiesPage() {
  const [saved, setSaved] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    loadSaved()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadSaved = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      setLoading(false)
      return
    }
    const { data } = await supabase
      .from('saved_opportunities')
      .select('opportunity_id')
      .eq('user_id', session.user.id)
    if (data) setSaved(data.map((s) => s.opportunity_id))
    setLoading(false)
  }

  const toggleSave = async (id: string) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    if (saved.includes(id)) {
      await supabase.from('saved_opportunities').delete().eq('opportunity_id', id).eq('user_id', session.user.id)
      setSaved((prev) => prev.filter((x) => x !== id))
    } else {
      await supabase.from('saved_opportunities').insert({ user_id: session.user.id, opportunity_id: id })
      setSaved((prev) => [...prev, id])
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <motion.div initial="initial" animate="animate" variants={staggerContainer}>
        <motion.div variants={fadeInUp}>
          <h1 className="text-xl font-semibold tracking-tight">Opportunities</h1>
          <p className="text-sm text-muted-foreground">Curated opportunities matched to your interests</p>
        </motion.div>

        <motion.div variants={fadeInUp} className="space-y-4">
          {OPPORTUNITIES.map((opp) => (
            <Card key={opp.id} className="card-hover overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <CardTitle className="text-sm">{opp.title}</CardTitle>
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium capitalize text-primary">
                            {opp.type.replace('-', ' ')}
                          </span>
                        </div>
                        <CardDescription className="mt-1 text-xs">{opp.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleSave(opp.id)}>
                      {saved.includes(opp.id) ? (
                        <Bookmark className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <BookmarkPlus className="h-3.5 w-3.5" />
                      )}
                    </Button>
                    {opp.link && (
                      <a href={opp.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="h-7 gap-1 px-2 text-xs">
                          Visit <ExternalLink className="h-3 w-3" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-1.5">
                  {opp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] capitalize',
                      difficultyStyles[opp.difficultyLevel] ?? 'bg-muted text-muted-foreground'
                    )}
                  >
                    {opp.difficultyLevel}
                  </span>
                  {opp.deadline && (
                    <span className="ml-auto text-[10px] text-muted-foreground">
                      Due{' '}
                      {new Date(opp.deadline).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="rounded-2xl border-border/80 bg-muted/30">
            <CardHeader>
              <CardTitle className="text-sm">Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 text-sm text-muted-foreground">
              <p>&bull; Start with 1-2 applications max per week. Quality over quantity.</p>
              <p>&bull; Apply early. Don&apos;t wait until the deadline.</p>
              <p>&bull; Discuss applications with your mentor for feedback.</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
