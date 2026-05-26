'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ExternalLink, BookmarkPlus, Zap } from 'lucide-react'
import { OPPORTUNITIES } from '@/constants'
import { cn } from '@/lib/utils'
import type { Opportunity } from '@/types'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Mock recommendations with scores
const RECOMMENDED_OPPORTUNITIES = OPPORTUNITIES.slice(0, 4).map((opp) => ({
  ...opp,
  matchScore: Math.floor(Math.random() * 40) + 70,
  matchReason:
    'Matches your interests in web development and startup environment',
}))

const OTHER_OPPORTUNITIES = OPPORTUNITIES.slice(4)

export default function OpportunitiesPage() {
  const [saved, setSaved] = useState<string[]>([])

  const toggleSave = (id: string) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const OpportunityCard = ({ opp, matchScore, matchReason }: any) => (
    <motion.div variants={fadeInUp}>
      <Card className="overflow-hidden hover:border-primary/50 transition-colors">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-start gap-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <div>
                  <CardTitle className="text-lg">{opp.title}</CardTitle>
                  <CardDescription className="mt-1">{opp.description}</CardDescription>
                </div>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              {matchScore && (
                <div className="text-sm font-semibold text-primary">{matchScore}% match</div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {matchReason && (
            <div className="rounded-lg border border-border/40 bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Why this matches:</strong> {matchReason}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {opp.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary/50 px-2 py-1 text-xs text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              {opp.deadline && (
                <p className="text-xs text-muted-foreground">
                  Deadline: {new Date(opp.deadline).toLocaleDateString()}
                </p>
              )}
              <p className={cn(
                'text-xs',
                opp.difficultyLevel === 'beginner' && 'text-green-600 dark:text-green-400',
                opp.difficultyLevel === 'intermediate' && 'text-yellow-600 dark:text-yellow-400',
                opp.difficultyLevel === 'advanced' && 'text-red-600 dark:text-red-400',
              )}>
                {opp.difficultyLevel.charAt(0).toUpperCase() + opp.difficultyLevel.slice(1)} Level
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleSave(opp.id)}
                className={saved.includes(opp.id) ? 'text-primary' : ''}
              >
                <BookmarkPlus className="h-4 w-4" />
              </Button>
              {opp.link && (
                <a href={opp.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    Learn More <ExternalLink className="h-3 w-3" />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="flex-1 overflow-y-auto">
      <motion.div
        className="mx-auto max-w-4xl space-y-8 p-6"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <h1 className="text-3xl font-bold">Opportunity Radar</h1>
          <p className="text-muted-foreground">
            Curated opportunities matched to your interests, level, and goals
          </p>
        </motion.div>

        {/* Recommended for you */}
        <motion.div variants={fadeInUp}>
          <div className="mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Perfect For You</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {RECOMMENDED_OPPORTUNITIES.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opp={opp}
                matchScore={(opp as any).matchScore}
                matchReason={(opp as any).matchReason}
              />
            ))}
          </div>
        </motion.div>

        {/* Other opportunities */}
        <motion.div variants={fadeInUp}>
          <h2 className="mb-4 text-xl font-semibold">Other Opportunities</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {OTHER_OPPORTUNITIES.map((opp) => (
              <OpportunityCard key={opp.id} opp={opp} />
            ))}
          </div>
        </motion.div>

        {/* Info section */}
        <motion.div variants={fadeInUp}>
          <Card className="border-blue-200 bg-blue-50 dark:border-blue-900/30 dark:bg-blue-950/10">
            <CardHeader>
              <CardTitle className="text-blue-900 dark:text-blue-100">Tips for Applying</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-blue-900 dark:text-blue-100">
              <p>
                <strong>•</strong> Start with 1-2 applications maximum per week. Quality over quantity.
              </p>
              <p>
                <strong>•</strong> Tailor your application to show how you relate to the problem they're solving.
              </p>
              <p>
                <strong>•</strong> Apply early. Don't wait until the deadline.
              </p>
              <p>
                <strong>•</strong> Discuss your applications with your mentor. They'll help you refine your approach.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
