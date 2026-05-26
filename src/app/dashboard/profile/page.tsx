'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Edit2, Save, X } from 'lucide-react'

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

interface UserProfile {
  name: string
  email: string
  yearOfStudy: string
  techStack: string[]
  interests: string[]
  currentLearningPhase: string
  biggestStruggle: string
  dreamRole: string
  currentProject: string
  confidenceLevel: number
}

const MOCK_PROFILE: UserProfile = {
  name: 'Rahul Kumar',
  email: 'rahul@example.com',
  yearOfStudy: '3rd Year',
  techStack: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
  interests: ['Web Development', 'Startups'],
  currentLearningPhase: 'Building my first projects',
  biggestStruggle: 'Overwhelmed by too many resources, getting stuck in tutorial loop',
  dreamRole: 'Full-stack engineer at a startup',
  currentProject: 'Study group platform for hackathon',
  confidenceLevel: 6,
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>(MOCK_PROFILE)

  const handleSave = () => {
    setIsEditing(false)
    // TODO: Save to Supabase
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
        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <p className="text-muted-foreground">
              Manage your engineering journey and preferences
            </p>
          </div>
          <Button
            variant={isEditing ? 'outline' : 'default'}
            onClick={() => setIsEditing(!isEditing)}
            className="gap-2"
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <Edit2 className="h-4 w-4" />
                Edit
              </>
            )}
          </Button>
        </motion.div>

        {/* Personal Info */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  value={profile.email}
                  disabled={true}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Year of Study</label>
                <Input
                  value={profile.yearOfStudy}
                  onChange={(e) => setProfile({ ...profile, yearOfStudy: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technical Profile */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Technical Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tech Stack</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Interests</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full bg-secondary/50 px-3 py-1 text-sm text-secondary-foreground"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Current Learning Phase</label>
                <p className="mt-2 text-sm text-muted-foreground">{profile.currentLearningPhase}</p>
              </div>

              <div>
                <label className="text-sm font-medium">Technical Confidence Level</label>
                <div className="mt-2 space-y-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={profile.confidenceLevel}
                    onChange={(e) =>
                      setProfile({ ...profile, confidenceLevel: parseInt(e.target.value) })
                    }
                    disabled={!isEditing}
                    className="h-2 w-full cursor-pointer rounded-lg bg-border/40"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 - Just starting</span>
                    <span>Current: {profile.confidenceLevel}</span>
                    <span>10 - Very confident</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Goals & Struggles */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Goals & Challenges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Dream Role</label>
                <p className="mt-2 text-sm text-muted-foreground">{profile.dreamRole}</p>
              </div>

              <div>
                <label className="text-sm font-medium">Current Project</label>
                <p className="mt-2 text-sm text-muted-foreground">{profile.currentProject}</p>
              </div>

              <div>
                <label className="text-sm font-medium">Biggest Struggle</label>
                <p className="mt-2 text-sm text-muted-foreground">{profile.biggestStruggle}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Settings */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Download My Data
              </Button>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save button */}
        {isEditing && (
          <motion.div variants={fadeInUp} className="flex gap-2">
            <Button onClick={handleSave} className="gap-2 flex-1">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
