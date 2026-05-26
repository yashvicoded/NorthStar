// User types
export interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
}

export interface UserProfile {
  id: string
  userId: string
  yearOfStudy: number
  currentTechStack: string[]
  technicalInterests: string[]
  currentLearningPhase: string
  biggestStruggle: string
  dreamRole: string
  currentProject: string
  confidenceLevel: number
  onboardingCompleted: boolean
  createdAt: string
  updatedAt: string
}

// Chat types
export interface Message {
  id: string
  threadId: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

export interface Thread {
  id: string
  userId: string
  title: string
  description?: string
  createdAt: string
  updatedAt: string
  messageCount: number
}

// Opportunity types
export interface Opportunity {
  id: string
  title: string
  description: string
  type: 'hackathon' | 'internship' | 'open-source' | 'fellowship'
  tags: string[]
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced'
  deadline?: string
  link?: string
  createdAt: string
}

export interface OpportunityRecommendation extends Opportunity {
  matchReason: string
  matchScore: number
}

// Timeline types
export interface TimelineEvent {
  id: string
  userId: string
  type: 'project' | 'goal' | 'milestone' | 'opportunity' | 'achievement'
  title: string
  description: string
  date: string
  tags?: string[]
}

// Weekly direction types
export interface WeeklyDirection {
  id: string
  userId: string
  week: string
  priorities: string[]
  focusSuggestions: string[]
  roadmapAdjustments: string[]
  projectGoals: string[]
  skillRecommendations: string[]
  productivityWarnings: string[]
  nextSteps: string[]
  createdAt: string
}
