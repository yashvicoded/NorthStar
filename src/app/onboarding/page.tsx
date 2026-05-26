'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TECH_STACK_OPTIONS, LEARNING_PHASE_OPTIONS, INTERESTS_OPTIONS } from '@/constants'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Sparkles, Check } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

interface OnboardingData {
  name: string
  yearOfStudy: string
  techStack: string[]
  interests: string[]
  learningPhase: string
  biggestStruggle: string
  dreamRole: string
  currentProject: string
  confidenceLevel: number
}

const INITIAL_DATA: OnboardingData = {
  name: '',
  yearOfStudy: '',
  techStack: [],
  interests: [],
  learningPhase: '',
  biggestStruggle: '',
  dreamRole: '',
  currentProject: '',
  confidenceLevel: 5,
}

const STEPS = [
  { id: 'name', title: "What's your name?", subtitle: 'We want to know who we\u2019re mentoring.' },
  { id: 'yearOfStudy', title: 'What year are you in?', subtitle: 'This helps us understand your stage.' },
  { id: 'techStack', title: 'What technologies do you know?', subtitle: 'Select all that apply.' },
  { id: 'interests', title: 'What areas interest you?', subtitle: 'Where do you want to grow?' },
  { id: 'learningPhase', title: 'Where are you in your journey?', subtitle: 'This helps us give relevant guidance.' },
  { id: 'biggestStruggle', title: "What's your biggest struggle right now?", subtitle: 'Be honest. This helps us support you better.' },
  { id: 'dreamRole', title: "What's your dream role?", subtitle: 'What does success look like for you?' },
  { id: 'currentProject', title: 'What are you working on?', subtitle: 'Or what do you want to build?' },
  { id: 'confidenceLevel', title: 'How confident do you feel?', subtitle: '1 = Just starting, 10 = Ready for anything' },
]

export default function Onboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA)
  const [isLoading, setIsLoading] = useState(false)
  const [showSnapshot, setShowSnapshot] = useState(false)
  const supabase = createClientComponentClient()

  const step = STEPS[currentStep]
  const progress = ((currentStep + 1) / STEPS.length) * 100

  const handleNext = async () => {
    if (currentStep === STEPS.length - 1) {
      setShowSnapshot(true)
      setIsLoading(true)
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) throw new Error('Not authenticated')

        const { error } = await supabase.from('profiles').upsert({
          user_id: session.user.id,
          name: data.name,
          year_of_study: data.yearOfStudy,
          tech_stack: data.techStack,
          interests: data.interests,
          learning_phase: data.learningPhase,
          biggest_struggle: data.biggestStruggle,
          dream_role: data.dreamRole,
          current_project: data.currentProject,
          confidence_level: data.confidenceLevel,
          onboarding_completed: true,
        })

        if (error) throw error
        await new Promise((r) => setTimeout(r, 1500))
        router.push('/dashboard')
      } catch {
        setIsLoading(false)
      }
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const isStepValid = () => {
    switch (step.id) {
      case 'name': return data.name.trim().length > 0
      case 'yearOfStudy': return data.yearOfStudy.length > 0
      case 'techStack': return data.techStack.length > 0
      case 'interests': return data.interests.length > 0
      case 'learningPhase': return data.learningPhase.length > 0
      case 'biggestStruggle': return data.biggestStruggle.trim().length > 0
      case 'dreamRole': return data.dreamRole.trim().length > 0
      case 'currentProject': return data.currentProject.trim().length > 0
      default: return true
    }
  }

  if (showSnapshot) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <motion.div
          className="w-full max-w-md text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            {isLoading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : (
              <Check className="h-6 w-6 text-primary" />
            )}
          </div>

          <h1 className="text-2xl font-semibold tracking-tight mb-2">Your Journey Snapshot</h1>
          <p className="text-sm text-muted-foreground mb-8">Here&apos;s what we know about you</p>

          <Card className="text-left">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  {data.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{data.name}</p>
                  <p className="text-xs text-muted-foreground">{data.yearOfStudy} &middot; {data.dreamRole}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Stack</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {data.techStack.map((t) => (
                      <span key={t} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary">{t}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Interests</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {data.interests.map((i) => (
                      <span key={i} className="rounded-full bg-muted px-2.5 py-0.5 text-xs">{i}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Current Project</p>
                  <p className="mt-0.5 text-sm">{data.currentProject}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Confidence</p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${data.confidenceLevel * 10}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{data.confidenceLevel}/10</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="mt-6 text-sm text-muted-foreground">
            {isLoading ? 'Setting up your mentorship experience...' : 'Redirecting to your dashboard...'}
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="mb-8">
            <div className="mb-6 flex items-center gap-2.5">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-sage-500 to-sage-700 flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm font-semibold tracking-tight">Northstar</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Let&apos;s get to know you</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">This helps us personalize your mentorship.</p>
          </div>

          <div className="mb-8 h-1 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step.id} {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription>{step.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {step.id === 'name' && (
                    <Input
                      placeholder="Your name"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      autoFocus
                    />
                  )}

                  {step.id === 'yearOfStudy' && (
                    <div className="grid grid-cols-3 gap-2">
                      {['1st', '2nd', '3rd', '4th', 'Graduated', 'Other'].map((year) => (
                        <Button
                          key={year}
                          variant={data.yearOfStudy === year ? 'default' : 'outline'}
                          onClick={() => setData({ ...data, yearOfStudy: year })}
                          size="sm"
                        >
                          {year}
                        </Button>
                      ))}
                    </div>
                  )}

                  {step.id === 'techStack' && (
                    <div className="flex flex-wrap gap-2">
                      {TECH_STACK_OPTIONS.map((tech) => (
                        <Button
                          key={tech}
                          variant={data.techStack.includes(tech) ? 'default' : 'outline'}
                          onClick={() =>
                            setData({
                              ...data,
                              techStack: data.techStack.includes(tech)
                                ? data.techStack.filter((t) => t !== tech)
                                : [...data.techStack, tech],
                            })
                          }
                          size="sm"
                        >
                          {tech}
                        </Button>
                      ))}
                    </div>
                  )}

                  {step.id === 'interests' && (
                    <div className="flex flex-wrap gap-2">
                      {INTERESTS_OPTIONS.map((interest) => (
                        <Button
                          key={interest}
                          variant={data.interests.includes(interest) ? 'default' : 'outline'}
                          onClick={() =>
                            setData({
                              ...data,
                              interests: data.interests.includes(interest)
                                ? data.interests.filter((i) => i !== interest)
                                : [...data.interests, interest],
                            })
                          }
                          size="sm"
                        >
                          {interest}
                        </Button>
                      ))}
                    </div>
                  )}

                  {step.id === 'learningPhase' && (
                    <div className="grid gap-2">
                      {LEARNING_PHASE_OPTIONS.map((phase) => (
                        <Button
                          key={phase}
                          variant={data.learningPhase === phase ? 'default' : 'outline'}
                          onClick={() => setData({ ...data, learningPhase: phase })}
                          className="justify-start text-left"
                        >
                          {phase}
                        </Button>
                      ))}
                    </div>
                  )}

                  {step.id === 'biggestStruggle' && (
                    <textarea
                      placeholder="What's challenging you right now?"
                      value={data.biggestStruggle}
                      onChange={(e) => setData({ ...data, biggestStruggle: e.target.value })}
                      className="min-h-24 w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                      autoFocus
                    />
                  )}

                  {step.id === 'dreamRole' && (
                    <Input
                      placeholder="e.g. Full-stack engineer, ML researcher..."
                      value={data.dreamRole}
                      onChange={(e) => setData({ ...data, dreamRole: e.target.value })}
                      autoFocus
                    />
                  )}

                  {step.id === 'currentProject' && (
                    <textarea
                      placeholder="Describe what you're working on..."
                      value={data.currentProject}
                      onChange={(e) => setData({ ...data, currentProject: e.target.value })}
                      className="min-h-24 w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                      autoFocus
                    />
                  )}

                  {step.id === 'confidenceLevel' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Confidence: <strong>{data.confidenceLevel}</strong></span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={data.confidenceLevel}
                        onChange={(e) => setData({ ...data, confidenceLevel: parseInt(e.target.value) })}
                        className="h-2 w-full cursor-pointer rounded-full bg-muted accent-primary"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Just starting</span>
                        <span>Very confident</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex gap-3">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              className="gap-1.5"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid() || isLoading}
              className="flex-1 gap-1.5"
            >
              {currentStep === STEPS.length - 1 ? 'Finish' : 'Next'}
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Step {currentStep + 1} of {STEPS.length}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
