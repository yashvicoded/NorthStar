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
    loading && setLoading(false)
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
    /* Increased max-w to 5xl so a grid of squares has room to breathe side-by-side */
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <motion.div initial="initial" animate="animate" variants={staggerContainer}>
        <motion.div variants={fadeInUp} className="mb-6">
          <h1 className="text-xl font-semibold tracking-tight">Opportunities</h1>
          <p className="text-sm text-muted-foreground">Curated opportunities matched to your interests</p>
        </motion.div>

        {/* CHANGES MADE HERE:
          1. Turned the wrapper into a responsive grid layout (1 col on mobile, 2 on tablet, 3 on desktop)
          2. Added `mb-12` to create distinct breathing space between the grid and the Tips card.
        */}
        <motion.div variants={fadeInUp} className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mb-12">
          {OPPORTUNITIES.map((opp) => (
            <Card 
              key={opp.id} 
              className="card-hover overflow-hidden aspect-square flex flex-col justify-between"
            >
              {/* Card Header gets flex-1 to push the Content container cleanly to the absolute bottom */}
              <CardHeader className="p-4 pb-2 flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-1.5">
                      <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                      <div className="min-w-0 flex-1">
                        {/* Title & Badge block */}
                        <div className="flex flex-col items-start gap-1.5">
                          <CardTitle className="text-sm line-clamp-1 w-full" title={opp.title}>
                            {opp.title}
                          </CardTitle>
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-medium capitalize text-primary whitespace-nowrap">
                            {opp.type.replace('-', ' ')}
                          </span>
                        </div>
                        {/* Description with line-clamping so it does not overflow the square layout */}
                        <CardDescription className="mt-2 text-xs line-clamp-3">
                          {opp.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-shrink-0 items-center gap-0.5">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleSave(opp.id)}>
                      {saved.includes(opp.id) ? (
                        <Bookmark className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <BookmarkPlus className="h-3.5 w-3.5" />
                      )}
                    </Button>
                    {opp.link && (
                      <a href={opp.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="h-7 w-7" title="Visit">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </CardHeader>

              {/* Card Footer tags explicitly bound inside padding at the bottom */}
              <CardContent className="p-4 pt-0">
                <div className="flex flex-wrap items-center gap-1.5 w-full">
                  {opp.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2 py-0.5 text-[9px] text-muted-foreground whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[9px] capitalize whitespace-nowrap',
                      difficultyStyles[opp.difficultyLevel] ?? 'bg-muted text-muted-foreground'
                    )}
                  >
                    {opp.difficultyLevel}
                  </span>
                  {opp.deadline && (
                    <span className="mt-1 text-[9px] text-muted-foreground w-full block text-left">
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

        {/* Tips Section */}
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