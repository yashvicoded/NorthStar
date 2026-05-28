import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function createSupabaseRouteClient() {
  const cookieStore = await cookies()
  // auth-helpers reads the store synchronously; Next 16 types cookies() as async.
  return createRouteHandlerClient({
    cookies: (() => cookieStore) as unknown as () => ReturnType<typeof cookies>,
  })
}
