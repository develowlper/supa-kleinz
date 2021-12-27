import { supabase } from 'lib/supabaseClient';

export const uploadImageToSupabase = ({ file, name }) => {
  return supabase.storage.from('images').upload(`private/${name}`, file);
};

export const getImageMetas = async (user_id) =>
  supabase
    .from('image_meta')
    .select('*')
    .eq('created_by', user_id)
    .order('id', { ascending: false });
