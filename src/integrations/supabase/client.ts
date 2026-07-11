// Points to the external (non-Lovable-Cloud) Supabase project that this
// directory shares with a sibling placement project. Values are hardcoded
// intentionally — the Lovable-managed .env still references the old
// Cloud instance and gets regenerated, so we can't rely on it here.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = 'https://egkijquraggcubnhwfho.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_F7Or6jzOKiOBEmIizzzIug_ZQph8u-g';

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
