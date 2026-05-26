'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Zap, Target, Rocket, Award, TrendingUp } from 'lucide-react'
import { formatDate } from '@/lib/utils'

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

const TIMELINE_EVENTS = [
  {
    id: '1',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    type: 'milestone',
    icon: Rocket,
    title: 'Started MERN Hackathon Prep',
    description: 'Committed to building a study group platform for the hackathon',
    tags: ['hackathon', 'project'],
  },
  {
    id: '2',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    type: 'achievement',
    icon: Award,
    title: 'Completed JavaScript Deep Dive',
    description: 'Mastered closures, async/await, and prototypal inheritance',
    tags: ['learning', 'javascript'],
  },
  {
    id: '3',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    type: 'goal',
    icon: Target,
    title: 'Goal: Build Full-Stack Project',
    description: 'Set goal to ship a complete full-stack application by end of month',
    tags: ['goal', 'full-stack'],
  },
  {
    id: '4',
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    type: 'project',
    icon: TrendingUp,
    title: 'Portfolio Website Launch',
    description: 'Deployed personal portfolio showcasing 3 projects',
    tags: ['portfolio', 'deployment'],
  },
  {
    id: '5',
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    type: 'milestone',
    icon: Zap,
    title: 'Overcame Tutorial Loop',
    description: 'Started shipping real projects instead of following tutorials',
    tags: ['breakthrough', 'mindset'],
  },
]

export default function TimelinePage() {
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
          <h1 className="text-3xl font-bold">Your Engineering Journey</h1>
          <p className="text-muted-foreground">
            A visual timeline of your growth and achievements
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div variants={fadeInUp}>
          <div className="relative space-y-8 pl-6">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary to-transparent" />

            {/* Events */}
            {TIMELINE_EVENTS.map((event, index) => {
              const Icon = event.icon

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Dot */}
                  <div className="absolute -left-3 top-2 h-4 w-4 rounded-full border-2 border-background bg-primary" />

                  {/* Content */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-primary" />
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                          </div>
                          <CardDescription className="mt-1">
                            {formatDate(event.date)}
                          </CardDescription>
                        </div>
                        <span
                          className="whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize"
                        >
                          {event.type}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{event.description}</p>

                      {event.tags && (
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-secondary/50 px-2 py-1 text-xs text-secondary-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeInUp}
          className="grid gap-4 md:grid-cols-3"
        >
          {[
            { label: 'Days Learning with Northstar', value: '45' },
            { label: 'Mentorship Sessions', value: '12' },
            { label: 'Projects Completed', value: '4' },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardHeader>
                <CardDescription>{stat.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Milestones section */}
        <motion.div variants={fadeInUp}>
          <Card className="border-blue-200 bg-blue-50 dark:border-blue-900/30 dark:bg-blue-950/10">
            <CardHeader>
              <CardTitle className="text-blue-900 dark:text-blue-100">Upcoming Milestones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                'Ship first full-stack project to production',
                'Get accepted into a hackathon',
                'Land first internship',
                'Contribute to open source',
              ].map((milestone) => (
                <div
                  key={milestone}
                  className="flex items-center gap-2 text-blue-900 dark:text-blue-100"
                >
                  <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                  {milestone}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
