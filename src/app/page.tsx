'use client'

import Link from 'next/link'
import { ArrowRight, MessageSquare, TrendingUp, Zap, User, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sage-500 to-sage-700" />
              <span className="text-lg font-semibold tracking-tight">Northstar</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-24 sm:py-32 lg:py-40">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sage-50 via-transparent to-transparent dark:from-sage-950/20" />

        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            variants={fadeInUp}
          >
            Direction for ambitious builders.
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-muted-foreground sm:text-xl"
            variants={fadeInUp}
          >
            Northstar is an AI mentor that remembers your engineering journey, guides your next
            step, and helps ambitious students navigate tech without feeling lost or alone.
          </motion.p>

          <motion.div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center" variants={fadeInUp}>
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2">
                Start Your Journey <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </motion.div>

          {/* Preview */}
          <motion.div
            className="mt-16 rounded-2xl border border-border/40 bg-card p-8 shadow-lg"
            variants={fadeInUp}
          >
            <div className="aspect-video rounded-lg bg-gradient-to-br from-muted to-muted/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="border-t border-border/40 px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <motion.div initial="initial" whileInView="animate" variants={staggerContainer}>
            <motion.h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              variants={fadeInUp}
            >
              The Problem
            </motion.h2>

            <motion.p
              className="mt-4 text-lg text-muted-foreground"
              variants={fadeInUp}
            >
              Engineering students, especially from Tier-2 and Tier-3 colleges, face unique
              challenges:
            </motion.p>

            <motion.div className="mt-8 grid gap-6 sm:grid-cols-2" variants={staggerContainer}>
              {[
                { title: 'No Mentorship', desc: 'Limited access to experienced engineers' },
                { title: 'Tutorial Loop', desc: 'Endless tutorials without real direction' },
                { title: 'Information Overload', desc: 'Too many resources, unclear priorities' },
                { title: 'Isolated Journey', desc: 'Learning alone without peer circles' },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  className="rounded-lg border border-border/40 bg-card p-6"
                  variants={fadeInUp}
                >
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border/40 px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <motion.div initial="initial" whileInView="animate" variants={staggerContainer}>
            <motion.h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              variants={fadeInUp}
            >
              How Northstar Helps
            </motion.h2>

            <motion.div
              className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2"
              variants={staggerContainer}
            >
              {[
                {
                  icon: MessageSquare,
                  title: 'Persistent Mentor',
                  desc: 'An AI that remembers your journey, struggles, and dreams.',
                },
                {
                  icon: TrendingUp,
                  title: 'Weekly Direction',
                  desc: 'Personalized priorities and next steps for your growth.',
                },
                {
                  icon: Zap,
                  title: 'Opportunity Radar',
                  desc: 'Curated hackathons, internships, and programs matched to you.',
                },
                {
                  icon: Calendar,
                  title: 'Progress Timeline',
                  desc: 'Visual proof that your mentor remembers your entire journey.',
                },
              ].map((feature) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    className="rounded-lg border border-border/40 bg-card p-8"
                    variants={fadeInUp}
                  >
                    <Icon className="h-8 w-8 text-primary" />
                    <h3 className="mt-4 font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{feature.desc}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Positioning Section */}
      <section className="border-t border-border/40 px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <motion.div initial="initial" whileInView="animate" variants={staggerContainer}>
            <motion.h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              variants={fadeInUp}
            >
              Why Northstar?
            </motion.h2>

            <motion.div className="mt-8 space-y-6" variants={staggerContainer}>
              <motion.div
                className="rounded-lg border border-border/40 bg-card p-8"
                variants={fadeInUp}
              >
                <h3 className="font-semibold">More Than a Chatbot</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We're building a dedicated mentorship ecosystem. Unlike generic AI assistants,
                  Northstar understands the unique journey of engineering students and provides
                  continuous, context-aware guidance.
                </p>
              </motion.div>

              <motion.div className="grid gap-6 sm:grid-cols-2" variants={staggerContainer}>
                {[
                  {
                    title: 'Continuity',
                    desc: 'Every conversation builds on the last. We remember your progress.',
                  },
                  {
                    title: 'Engineering Focus',
                    desc: 'Built by engineers, for engineers. We speak your language.',
                  },
                  {
                    title: 'Growth Tracking',
                    desc: 'Visualize your journey and celebrate your milestones.',
                  },
                  {
                    title: 'Emotional Intelligence',
                    desc: 'Mentorship that feels warm, supportive, and genuinely human.',
                  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    className="rounded-lg border border-border/40 bg-card p-6"
                    variants={fadeInUp}
                  >
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="mt-2 text-xs text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-t border-border/40 px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <motion.div initial="initial" whileInView="animate" variants={staggerContainer}>
            <motion.h2
              className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
              variants={fadeInUp}
            >
              Stories from Our Community
            </motion.h2>

            <motion.div
              className="mt-12 grid gap-8 sm:grid-cols-3"
              variants={staggerContainer}
            >
              {[
                {
                  quote:
                    'Northstar helped me navigate from tutorial hell to building real projects. It felt like having a senior engineer always available.',
                  author: 'Rahul',
                  role: 'CSE Student, Tier-2 College',
                  initials: 'R',
                },
                {
                  quote:
                    'The opportunity recommendations were perfect for my level. I landed an internship I thought was out of reach.',
                  author: 'Priya',
                  role: 'Final Year Student',
                  initials: 'P',
                },
                {
                  quote:
                    'Having a mentor who remembers my struggles and celebrates my wins made all the difference in my confidence.',
                  author: 'Arjun',
                  role: 'Aspiring Founder',
                  initials: 'A',
                },
              ].map((testimonial) => (
                <motion.div
                  key={testimonial.author}
                  className="rounded-lg border border-border/40 bg-card p-6"
                  variants={fadeInUp}
                >
                  <p className="text-sm text-muted-foreground">"{testimonial.quote}"</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border/40 px-4 py-24 sm:py-32">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="initial"
          whileInView="animate"
          variants={staggerContainer}
        >
          <motion.h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            variants={fadeInUp}
          >
            Every ambitious builder deserves direction.
          </motion.h2>

          <motion.p className="mt-4 text-lg text-muted-foreground" variants={fadeInUp}>
            Start your journey with Northstar today.
          </motion.p>

          <motion.div className="mt-8" variants={fadeInUp}>
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-sage-500 to-sage-700" />
              <span className="font-semibold">Northstar</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Northstar. Built with care for ambitious engineers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
