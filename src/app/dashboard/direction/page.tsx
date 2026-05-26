'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { TrendingUp, AlertCircle, Target, BookOpen } from 'lucide-react'

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

export default function DirectionPage() {
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - weekStart.getDay())
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 6)

  const direction = {
    week: weekStart.toISOString(),
    priorities: [
      'Finish the core features of your study group app',
      'Get comfortable with real-time database interactions',
      'Deploy a working prototype to get feedback early',
    ],
    focusSuggestions: [
      'Focus on user authentication and group creation first',
      'Keep the UI minimal but functional - design can come later',
      'Test with real users by midweek',
    ],
    roadmapAdjustments: [
      'Push the advanced features (algorithms, recommendations) to post-hackathon',
      'Focus on the core MVP: create group → browse groups → message members',
    ],
    projectGoals: [
      'Have a working signup + login',
      'Build the "create group" and "browse groups" features',
      'Implement basic in-app messaging',
    ],
    skillRecommendations: [
      'Socket.io for real-time messaging (do a quick tutorial)',
      'MongoDB queries for filtering groups',
    ],
    productivityWarnings: [
      'You mentioned perfectionism before - ship imperfect over perfect. Demo wins hackathons, not polish.',
      'Avoid the tutorial loop. When you get stuck, ship what you have and iterate.',
    ],
    nextSteps: [
      '1. Set up your project skeleton today',
      '2. Complete auth + basic UI by tomorrow',
      '3. Build core features by Wednesday',
      '4. Demo to someone by Thursday for feedback',
      '5. Polish and deploy Friday',
    ],
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <motion.div
        className="mx-auto max-w-4xl space-y-6 p-6"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <h1 className="text-3xl font-bold">This Week's Direction</h1>
          <p className="text-muted-foreground">
            Week of {weekStart.toLocaleDateString()} - {weekEnd.toLocaleDateString()}
          </p>
        </motion.div>

        {/* Priorities */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle>Your Priorities</CardTitle>
                  <CardDescription>Focus on these to move the needle forward</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {direction.priorities.map((priority, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {i + 1}
                    </span>
                    <span className="pt-1">{priority}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </motion.div>

        {/* Focus Suggestions */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle>Focus Areas</CardTitle>
                  <CardDescription>Where to concentrate your energy</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {direction.focusSuggestions.map((suggestion, i) => (
                  <div key={i} className="flex gap-3 rounded-lg border border-border/40 bg-muted/50 p-3">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <p className="text-sm">{suggestion}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skill Recommendations */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle>Skills to Level Up</CardTitle>
                  <CardDescription>Learn these to unblock your project</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {direction.skillRecommendations.map((skill, i) => (
                  <div key={i} className="rounded-lg border border-border/40 bg-card p-3">
                    <p className="text-sm font-medium">{skill}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Productivity Warnings */}
        <motion.div variants={fadeInUp}>
          <Card className="border-amber-200 bg-amber-50 dark:border-amber-900/30 dark:bg-amber-950/10">
            <CardHeader>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                <div>
                  <CardTitle className="text-amber-900 dark:text-amber-100">Watch Out For</CardTitle>
                  <CardDescription className="text-amber-800 dark:text-amber-200">
                    Common pitfalls based on your patterns
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {direction.productivityWarnings.map((warning, i) => (
                  <p key={i} className="text-sm text-amber-900 dark:text-amber-100">
                    <strong>•</strong> {warning}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Steps */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Your Next Steps</CardTitle>
              <CardDescription>A realistic roadmap for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {direction.nextSteps.map((step, i) => (
                  <div key={i} className="flex gap-3 rounded-lg border border-border/40 p-3">
                    <div className="h-6 w-6 rounded-full bg-primary text-xs font-semibold text-primary-foreground flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="pt-0.5 text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeInUp} className="flex gap-3">
          <Button>Start with Priority #1</Button>
          <Button variant="outline">Discuss with Mentor</Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
