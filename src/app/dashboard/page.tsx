'use client'

import { redirect } from 'next/navigation'

// Redirect to mentor chat by default
export default function DashboardPage() {
  redirect('/dashboard/mentor')
}
