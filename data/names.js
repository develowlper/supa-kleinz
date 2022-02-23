import { supabase } from 'lib/supabaseClient';

const wrapSupabaseCall = async (promise) => {
  const { data, error } = await promise;

  if (error) {
    throw error;
  }

  return data;
};

export const getNames = async (user_id) =>
  wrapSupabaseCall(
    supabase
      .from('names')
      .select('*')
      .eq('user_id', user_id)
      .order('id', { ascending: false })
  );

export const deleteName = async (id) =>
  wrapSupabaseCall(supabase.from('names').delete().eq('id', id));
