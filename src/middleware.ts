import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard')
  const isOnboardingPage = req.nextUrl.pathname === '/onboarding'

  if (!hasSupabaseEnv()) {
    // #region agent log
    fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
      body: JSON.stringify({
        sessionId: 'ce31a0',
        runId: 'post-fix',
        hypothesisId: 'H1',
        location: 'src/middleware.ts',
        message: 'Supabase env missing — skipping auth middleware',
        data: { pathname: req.nextUrl.pathname },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion

    if (isDashboardPage || isOnboardingPage) {
      const url = new URL('/auth/signin', req.url)
      url.searchParams.set('error', 'config')
      return NextResponse.redirect(url)
    }
    return res
  }

  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  if ((isDashboardPage || isOnboardingPage) && !session) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*', '/onboarding'],
}
