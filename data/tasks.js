import { supabase } from 'lib/supabaseClient';

export const getTasks = async (id, user_id) => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('list', id)
    .eq('user_id', user_id)
    .order('id');

  if (error) {
    throw error;
  }

  return data;
};

export const setIsTaskComplete = async (id, is_complete) => {
  console.log(await supabase.from('todos').select('*'));
  const { data, error } = await supabase
    .from('todos')
    .update({ is_complete })
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
