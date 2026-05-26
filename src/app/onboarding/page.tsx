'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TECH_STACK_OPTIONS, LEARNING_PHASE_OPTIONS, INTERESTS_OPTIONS } from '@/constants'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
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
  {
    id: 'name',
    title: "What's your name?",
    subtitle: 'We want to know who we're mentoring.',
  },
  {
    id: 'yearOfStudy',
    title: 'What year are you in?',
    subtitle: 'This helps us understand your stage in the journey.',
  },
  {
    id: 'techStack',
    title: 'What technologies do you know?',
    subtitle: 'Select all that apply. You can add more later.',
  },
  {
    id: 'interests',
    title: 'What areas interest you?',
    subtitle: 'Where do you want to grow?',
  },
  {
    id: 'learningPhase',
    title: 'Where are you in your journey?',
    subtitle: 'This helps us give relevant guidance.',
  },
  {
    id: 'biggestStruggle',
    title: 'What's your biggest struggle right now?',
    subtitle: 'Be honest. This helps us support you better.',
  },
  {
    id: 'dreamRole',
    title: 'What's your dream role?',
    subtitle: 'What does success look like for you?',
  },
  {
    id: 'currentProject',
    title: 'What are you working on right now?',
    subtitle: 'Or what do you want to build?',
  },
  {
    id: 'confidenceLevel',
    title: 'How confident do you feel with your technical skills?',
    subtitle: '1 = Just starting, 10 = Ready for anything',
  },
]

export default function Onboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA)
  const [isLoading, setIsLoading] = useState(false)

  const step = STEPS[currentStep]
  const progress = ((currentStep + 1) / STEPS.length) * 100

  const handleNext = async () => {
    if (currentStep === STEPS.length - 1) {
      // Save data and redirect
      setIsLoading(true)
      try {
        // TODO: Save to Supabase
        console.log('Onboarding data:', data)
        router.push('/dashboard')
      } catch (error) {
        console.error('Error saving onboarding:', error)
        setIsLoading(false)
      }
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (step.id) {
      case 'name':
        return data.name.trim().length > 0
      case 'yearOfStudy':
        return data.yearOfStudy.length > 0
      case 'techStack':
        return data.techStack.length > 0
      case 'interests':
        return data.interests.length > 0
      case 'learningPhase':
        return data.learningPhase.length > 0
      case 'biggestStruggle':
        return data.biggestStruggle.trim().length > 0
      case 'dreamRole':
        return data.dreamRole.trim().length > 0
      case 'currentProject':
        return data.currentProject.trim().length > 0
      default:
        return true
    }
  }

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-transparent to-transparent dark:from-blue-950/20" />

      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700" />
              <span className="font-semibold">Northstar</span>
            </div>
            <h1 className="text-3xl font-bold">Let's get to know you</h1>
            <p className="mt-2 text-muted-foreground">
              This helps us personalize your mentorship experience.
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8 h-1 rounded-full bg-border/40">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fadeInUp}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.subtitle}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Step content */}
                  {step.id === 'name' && (
                    <Input
                      placeholder="Enter your name"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      className="text-lg"
                      autoFocus
                    />
                  )}

                  {step.id === 'yearOfStudy' && (
                    <div className="grid grid-cols-3 gap-4">
                      {['1st', '2nd', '3rd', '4th', 'Graduated', 'Other'].map((year) => (
                        <Button
                          key={year}
                          variant={data.yearOfStudy === year ? 'default' : 'outline'}
                          onClick={() => setData({ ...data, yearOfStudy: year })}
                          className="h-12"
                        >
                          {year}
                        </Button>
                      ))}
                    </div>
                  )}

                  {step.id === 'techStack' && (
                    <div className="grid gap-2">
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {TECH_STACK_OPTIONS.map((tech) => (
                          <Button
                            key={tech}
                            variant={data.techStack.includes(tech) ? 'default' : 'outline'}
                            onClick={() => {
                              setData({
                                ...data,
                                techStack: data.techStack.includes(tech)
                                  ? data.techStack.filter((t) => t !== tech)
                                  : [...data.techStack, tech],
                              })
                            }}
                            size="sm"
                            className="text-xs"
                          >
                            {tech}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.id === 'interests' && (
                    <div className="grid gap-2">
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {INTERESTS_OPTIONS.map((interest) => (
                          <Button
                            key={interest}
                            variant={data.interests.includes(interest) ? 'default' : 'outline'}
                            onClick={() => {
                              setData({
                                ...data,
                                interests: data.interests.includes(interest)
                                  ? data.interests.filter((i) => i !== interest)
                                  : [...data.interests, interest],
                              })
                            }}
                            size="sm"
                            className="text-xs"
                          >
                            {interest}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.id === 'learningPhase' && (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {LEARNING_PHASE_OPTIONS.map((phase) => (
                        <Button
                          key={phase}
                          variant={data.learningPhase === phase ? 'default' : 'outline'}
                          onClick={() => setData({ ...data, learningPhase: phase })}
                          className="justify-start text-left text-xs sm:text-sm"
                        >
                          {phase}
                        </Button>
                      ))}
                    </div>
                  )}

                  {step.id === 'biggestStruggle' && (
                    <textarea
                      placeholder="Tell us what's challenging you right now..."
                      value={data.biggestStruggle}
                      onChange={(e) => setData({ ...data, biggestStruggle: e.target.value })}
                      className="min-h-24 rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      autoFocus
                    />
                  )}

                  {step.id === 'dreamRole' && (
                    <Input
                      placeholder="E.g., Full-stack engineer at a startup, ML researcher, etc."
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
                      className="min-h-24 rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      autoFocus
                    />
                  )}

                  {step.id === 'confidenceLevel' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Confidence: <span className="font-bold text-foreground">{data.confidenceLevel}</span>
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={data.confidenceLevel}
                        onChange={(e) => setData({ ...data, confidenceLevel: parseInt(e.target.value) })}
                        className="h-2 w-full cursor-pointer rounded-lg bg-border/40"
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

          {/* Navigation */}
          <div className="mt-8 flex gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              size="lg"
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isStepValid() || isLoading}
              size="lg"
              className="flex-1 gap-2"
            >
              {isLoading ? 'Creating your profile...' : currentStep === STEPS.length - 1 ? 'Complete' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress text */}
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Step {currentStep + 1} of {STEPS.length}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
