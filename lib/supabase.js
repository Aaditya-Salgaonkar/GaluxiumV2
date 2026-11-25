import { createClient } from '@supabase/supabase-js'

// The Supabase URL and anon key are read from the environment when available,
// but the app must not depend on them being present at build time. Next.js
// prerenders pages during `next build`, which evaluates this module; throwing
// here ("supabaseUrl is required") would fail the whole build. When the values
// are missing, fall back to inert placeholders so the client can still be
// constructed. Any auth/database call will simply return an error at runtime
// until real values are configured.
const PLACEHOLDER_URL = 'https://placeholder.supabase.co'
const PLACEHOLDER_KEY = 'placeholder-anon-key'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || PLACEHOLDER_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || PLACEHOLDER_KEY

export const isSupabaseConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

if (!isSupabaseConfigured && typeof window !== 'undefined') {
  console.warn(
    'Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable authentication.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
