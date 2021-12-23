import { supabase } from 'lib/supabaseClient';

export const getNames = async () => {
  return supabase.from('names').select('*').order('id', true);
};
