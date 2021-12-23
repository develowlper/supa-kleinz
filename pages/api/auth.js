// pages/api/auth.ts

import { supabase } from 'lib/supabaseClient';

const handler = (req, res) => {
  supabase.auth.api.setAuthCookie(req, res);
};

export default handler;
