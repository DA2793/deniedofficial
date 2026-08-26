import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      global: {
        // Next.js patches fetch with its Data Cache, which caches Supabase
        // REST reads by URL — API routes then serve stale rows (e.g. stock
        // counts frozen at whatever they were when the URL was first hit).
        // `no-store` opts every Supabase call out of that cache: live data,
        // always — critical for stock validation and order flows.
        fetch: (url, options = {}) => fetch(url, { ...options, cache: "no-store" }),
      },
    });
  }
  return _supabaseAdmin;
}
