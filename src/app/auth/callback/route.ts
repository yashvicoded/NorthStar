import { createSupabaseRouteClient } from '@/lib/supabase/route'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const requestUrl = new URL(req.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createSupabaseRouteClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL('/onboarding', requestUrl.origin))
}
