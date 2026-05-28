'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  let supabase: ReturnType<typeof createClientComponentClient> | null = null
  try {
    supabase = createClientComponentClient()
  } catch (e) {
    // #region agent log
    fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
      body: JSON.stringify({
        sessionId: 'ce31a0',
        runId: 'pre-fix',
        hypothesisId: 'H1',
        location: 'src/lib/auth-content.tsx:AuthProvider',
        message: 'Supabase client init failed',
        data: {
          hasNextPublicSupabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
          hasNextPublicSupabaseAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
          errorName: (e as any)?.name,
          errorMessage: (e as any)?.message,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion
  }

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
      body: JSON.stringify({
        sessionId: 'ce31a0',
        runId: 'pre-fix',
        hypothesisId: 'H1',
        location: 'src/lib/auth-content.tsx:useEffect',
        message: 'AuthProvider mounted',
        data: {
          supabaseClientReady: Boolean(supabase),
          hasNextPublicSupabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
          hasNextPublicSupabaseAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion

    if (!supabase) {
      setIsLoading(false)
      return
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setIsLoading(false)
      }
    )

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase, router])

  const requireSupabase = () => {
    if (!supabase) {
      throw new Error(
        'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local and restart the dev server.'
      )
    }
    return supabase
  }

  const signIn = async (email: string, password: string) => {
    const client = requireSupabase()
    const { error } = await client.auth.signInWithPassword({ email, password })
    if (error) throw error
    router.push('/dashboard')
  }

  const signUp = async (email: string, password: string, name: string) => {
    const client = requireSupabase()
    const { error } = await client.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
    if (error) throw error
    router.push('/onboarding')
  }

  const signInWithGoogle = async () => {
    const client = requireSupabase()
    const { error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) throw error
  }

  const signOut = async () => {
    const client = requireSupabase()
    await client.auth.signOut()
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
