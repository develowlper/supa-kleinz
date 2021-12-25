import { supabase } from 'lib/supabaseClient';

export const getTasks = async (id, user_id) => {
  return supabase
    .from('todos')
    .select('*')
    .eq('list', id)
    .eq('user_id', user_id)
    .order('id');
};
