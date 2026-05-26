import type { Metadata } from 'next'
import '../globals.css'
import { AuthProvider } from '../lib/auth-content'
export const metadata: Metadata = {
  title: 'Northstar - AI Mentorship for Ambitious Engineers',
  description:
    'Direction for ambitious builders. An AI mentor that remembers your engineering journey and guides your next step.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}