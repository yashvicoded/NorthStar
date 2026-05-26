'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Edit2, Save, X, Sparkles } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
}

interface UserProfile {
  name: string
  email: string
  year_of_study: string
  tech_stack: string[]
  interests: string[]
  learning_phase: string
  biggest_struggle: string
  dream_role: string
  current_project: string
  confidence_level: number
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    loadProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    const { data } = await supabase.from('profiles').select('*').eq('user_id', session.user.id).single()
    if (data) {
      setProfile({
        name: data.name || '',
        email: session.user.email || '',
        year_of_study: data.year_of_study || '',
        tech_stack: data.tech_stack || [],
        interests: data.interests || [],
        learning_phase: data.learning_phase || '',
        biggest_struggle: data.biggest_struggle || '',
        dream_role: data.dream_role || '',
        current_project: data.current_project || '',
        confidence_level: data.confidence_level || 5,
      })
    }
    setLoading(false)
  }

  const handleSave = async () => {
    if (!profile) return
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    await supabase.from('profiles').update({
      name: profile.name,
      year_of_study: profile.year_of_study,
      tech_stack: profile.tech_stack,
      interests: profile.interests,
      learning_phase: profile.learning_phase,
      biggest_struggle: profile.biggest_struggle,
      dream_role: profile.dream_role,
      current_project: profile.current_project,
      confidence_level: profile.confidence_level,
    }).eq('user_id', session.user.id)
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-muted-foreground">Complete onboarding to set up your profile.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <motion.div initial="initial" animate="animate" variants={staggerContainer}>
        <motion.div variants={fadeInUp} className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your engineering journey</p>
          </div>
          <Button
            variant={isEditing ? 'outline' : 'default'}
            onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
            size="sm"
            className="gap-1.5"
          >
            {isEditing ? <X className="h-3.5 w-3.5" /> : <Edit2 className="h-3.5 w-3.5" />}
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader><CardTitle className="text-base">Personal</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground font-medium">Name</label>
                <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} disabled={!isEditing} className="mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-medium">Email</label>
                <Input value={profile.email} disabled className="mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-medium">Year of Study</label>
                <Input value={profile.year_of_study} onChange={(e) => setProfile({ ...profile, year_of_study: e.target.value })} disabled={!isEditing} className="mt-1" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader><CardTitle className="text-base">Technical</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground font-medium">Tech Stack</label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {profile.tech_stack.map((tech) => (
                    <span key={tech} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary">{tech}</span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-medium">Interests</label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {profile.interests.map((interest) => (
                    <span key={interest} className="rounded-full bg-muted px-2.5 py-0.5 text-xs">{interest}</span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-medium">Learning Phase</label>
                <p className="mt-0.5 text-sm">{profile.learning_phase}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-medium">Confidence</label>
                <div className="mt-1 flex items-center gap-2">
                  <input type="range" min="1" max="10" value={profile.confidence_level}
                    onChange={(e) => setProfile({ ...profile, confidence_level: parseInt(e.target.value) })}
                    disabled={!isEditing}
                    className="h-1.5 w-full max-w-xs cursor-pointer rounded-full bg-muted accent-primary" />
                  <span className="text-xs text-muted-foreground">{profile.confidence_level}/10</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader><CardTitle className="text-base">Goals & Challenges</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground font-medium">Dream Role</label>
                <p className="mt-0.5 text-sm">{profile.dream_role}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-medium">Current Project</label>
                <p className="mt-0.5 text-sm">{profile.current_project}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-medium">Biggest Struggle</label>
                <p className="mt-0.5 text-sm text-muted-foreground">{profile.biggest_struggle}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {isEditing && (
          <motion.div variants={fadeInUp}>
            <Button onClick={handleSave} className="w-full gap-1.5">
              <Save className="h-3.5 w-3.5" /> Save Changes
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
