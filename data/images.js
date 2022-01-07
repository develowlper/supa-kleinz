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

export const deleteImageMeta = async (id) =>
  supabase.from('image_meta').delete().eq('id', id);

export const downloadImage = async (key) => {
  return supabase.storage.from('images').download(key);
};

export const deleteImages = async (keys) => {
  return supabase.storage.from('images').remove(keys);
};
