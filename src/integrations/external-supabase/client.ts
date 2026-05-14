// External Supabase project (separate from Lovable Cloud).
// Used exclusively to store public booking requests submitted from BookingSection.
// The anon/publishable key is safe to ship in the browser bundle — RLS enforces access.
import { createClient } from "@supabase/supabase-js";

const EXTERNAL_SUPABASE_URL = "https://rfcfmslgscpknibjdhkf.supabase.co";
const EXTERNAL_SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_74fFDcl3i5HF6tIkkOjFfg_FB8690b8";

export const externalSupabase = createClient(
  EXTERNAL_SUPABASE_URL,
  EXTERNAL_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      // No auth on external client — anonymous booking inserts only.
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);
