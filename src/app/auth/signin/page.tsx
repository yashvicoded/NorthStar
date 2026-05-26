'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Chrome, Mail, Lock, User, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { signUp } = useAuth()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    try {
      await signUp(email, name, password)
    } catch (err) {
      setError('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-blue-400/20 to-transparent blur-3xl dark:from-blue-500/10" />
      </div>

      <motion.div
        className="flex min-h-screen items-center justify-center px-4 py-12"
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2,
            },
          },
        }}
      >
        <motion.div className="w-full max-w-md" variants={fadeInUp}>
          {/* Logo */}
          <Link href="/" className="mb-8 flex items-center justify-center gap-3">
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
              Northstar
            </span>
          </Link>

          {/* Card */}
          <Card className="border-slate-200/50 bg-white/95 shadow-xl dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-2xl">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">Create your account</CardTitle>
              <CardDescription>
                Start your engineering journey with Northstar
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Google Sign Up */}
              <Button
                disabled={isLoading}
                variant="outline"
                className="w-full gap-2 border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                size="lg"
              >
                <Chrome className="h-5 w-5" />
                Continue with Google
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                    Or with email
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSignUp} className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    className="border-slate-200 bg-slate-50/50 pl-10 placeholder:text-slate-400 focus-visible:border-blue-500 dark:border-slate-700 dark:bg-slate-800/50 dark:focus-visible:border-blue-400"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="border-slate-200 bg-slate-50/50 pl-10 placeholder:text-slate-400 focus-visible:border-blue-500 dark:border-slate-700 dark:bg-slate-800/50 dark:focus-visible:border-blue-400"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="border-slate-200 bg-slate-50/50 pl-10 placeholder:text-slate-400 focus-visible:border-blue-500 dark:border-slate-700 dark:bg-slate-800/50 dark:focus-visible:border-blue-400"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    className="border-slate-200 bg-slate-50/50 pl-10 placeholder:text-slate-400 focus-visible:border-blue-500 dark:border-slate-700 dark:bg-slate-800/50 dark:focus-visible:border-blue-400"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !name || !email || !password || !confirmPassword}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Sign in link */}
          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Sign in
            </Link>
          </p>

          {/* Demo hint */}
          <motion.div
            className="mt-6 rounded-lg border border-blue-200/50 bg-blue-50/50 p-3 text-center text-xs text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            🚀 Demo tip: Any email/password will work
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}