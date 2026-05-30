'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Edit2, Save, X, User, Code, Target } from 'lucide-react'
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
    /* Increased max-w to 5xl for dashboard layout side-by-side spacing */
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <motion.div initial="initial" animate="animate" variants={staggerContainer} className="space-y-6">
        
        {/* Top Header Row */}
        <motion.div variants={fadeInUp} className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your engineering journey</p>
          </div>
          <div className="flex gap-2">
            {isEditing && (
              <Button onClick={handleSave} size="sm" className="gap-1.5 bg-primary text-primary-foreground">
                <Save className="h-3.5 w-3.5" /> Save
              </Button>
            )}
            <Button
              variant={isEditing ? 'ghost' : 'outline'}
              onClick={() => setIsEditing(!isEditing)}
              size="sm"
              className="gap-1.5"
            >
              {isEditing ? <X className="h-3.5 w-3.5" /> : <Edit2 className="h-3.5 w-3.5" />}
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </motion.div>

        {/* RESPONSIVE GRID WRAPPER */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-start">
          
          {/* ================= LEFT COLUMN: PERSONAL DETAILS (Spans 1 column) ================= */}
          <div className="md:col-span-1">
            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base">Personal</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground font-medium">Name</label>
                    {isEditing ? (
                      <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="mt-1" />
                    ) : (
                      <p className="mt-1 text-sm font-medium bg-secondary/20 p-2.5 rounded-lg border border-border/40">{profile.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground font-medium">Email</label>
                    <p className="mt-1 text-sm font-medium bg-muted/40 p-2.5 rounded-lg border border-border/20 text-muted-foreground select-none">{profile.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground font-medium">Year of Study</label>
                    {isEditing ? (
                      <Input value={profile.year_of_study} onChange={(e) => setProfile({ ...profile, year_of_study: e.target.value })} className="mt-1" />
                    ) : (
                      <p className="mt-1 text-sm font-medium bg-secondary/20 p-2.5 rounded-lg border border-border/40">{profile.year_of_study}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: TECHNICAL & GOALS (Spans 2 columns) ================= */}
          <div className="space-y-6 md:col-span-2">
            
            {/* Technical Card */}
            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base">Technical Summary</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <label className="text-xs text-muted-foreground font-medium">Tech Stack</label>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {profile.tech_stack.map((tech) => (
                        <span key={tech} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary font-medium border border-primary/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-muted-foreground font-medium">Interests</label>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {profile.interests.map((interest) => (
                        <span key={interest} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground border border-border">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="text-xs text-muted-foreground font-medium">Learning Phase</label>
                      {isEditing ? (
                        <Input value={profile.learning_phase} onChange={(e) => setProfile({ ...profile, learning_phase: e.target.value })} className="mt-1" />
                      ) : (
                        <p className="mt-1 text-sm font-medium bg-secondary/10 p-2.5 rounded-lg border">{profile.learning_phase}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground font-medium">Confidence Metric</label>
                      <div className="mt-1.5 flex items-center gap-3 bg-secondary/10 p-2 rounded-lg border h-[38px]">
                        <input type="range" min="1" max="10" value={profile.confidence_level}
                          onChange={(e) => setProfile({ ...profile, confidence_level: parseInt(e.target.value) })}
                          disabled={!isEditing}
                          className="h-1.5 w-full cursor-pointer rounded-full bg-muted accent-primary disabled:opacity-70" />
                        <span className="text-xs font-semibold text-primary whitespace-nowrap">{profile.confidence_level} / 10</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Goals & Challenges Card */}
            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base">Goals & Challenges</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground font-medium">Dream Role</label>
                    {isEditing ? (
                      <Input value={profile.dream_role} onChange={(e) => setProfile({ ...profile, dream_role: e.target.value })} className="mt-1" />
                    ) : (
                      <p className="mt-1 text-sm font-medium bg-secondary/10 p-2.5 rounded-lg border">{profile.dream_role}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground font-medium">Current Focus Project</label>
                    {isEditing ? (
                      <Input value={profile.current_project} onChange={(e) => setProfile({ ...profile, current_project: e.target.value })} className="mt-1" />
                    ) : (
                      <p className="mt-1 text-sm font-medium bg-secondary/10 p-2.5 rounded-lg border">{profile.current_project}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-muted-foreground font-medium">Biggest Core Struggle</label>
                    {isEditing ? (
                      <Input value={profile.biggest_struggle} onChange={(e) => setProfile({ ...profile, biggest_struggle: e.target.value })} className="mt-1" />
                    ) : (
                      <p className="mt-1 text-sm font-medium text-destructive-foreground/90 bg-destructive/5 p-3 rounded-lg border border-destructive/20">
                        {profile.biggest_struggle}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
          </div>
        </div>

      </motion.div>
    </div>
  )
}