import { createClient } from '@supabase/supabase-js';

const key =
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, key);
