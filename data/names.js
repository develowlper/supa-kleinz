import { supabase } from 'lib/supabaseClient';

export const getNames = async (user_id) =>
  supabase
    .from('names')
    .select('*')
    .eq('user_id', user_id)
    .order('id', { ascending: false });

export const deleteName = async (id) =>
  supabase.from('names').delete().eq('id', id);
