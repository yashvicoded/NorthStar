'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Chrome } from 'lucide-react'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignUp = () => {
    setIsLoading(true)
    // TODO: Implement Google sign-up with Supabase
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-transparent to-transparent dark:from-blue-950/20" />

      <motion.div
        className="flex min-h-screen items-center justify-center px-4"
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
          <Link href="/" className="mb-8 flex items-center justify-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700" />
            <span className="text-lg font-semibold">Northstar</span>
          </Link>

          {/* Card */}
          <Card>
            <CardHeader className="space-y-2">
              <CardTitle>Create your account</CardTitle>
              <CardDescription>Start your engineering journey with Northstar</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <Button
                onClick={handleGoogleSignUp}
                disabled={isLoading}
                variant="outline"
                className="w-full gap-2"
                size="lg"
              >
                <Chrome className="h-4 w-4" />
                {isLoading ? 'Signing up...' : 'Continue with Google'}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/40" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>

              <div className="space-y-3">
                <Input type="text" placeholder="Full Name" disabled={isLoading} />
                <Input type="email" placeholder="Email" disabled={isLoading} />
                <Input type="password" placeholder="Password" disabled={isLoading} />
                <Input type="password" placeholder="Confirm Password" disabled={isLoading} />
              </div>

              <Button className="w-full" disabled={isLoading} size="lg">
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </CardContent>
          </Card>

          {/* Sign in link */}
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
