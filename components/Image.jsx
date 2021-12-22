import { supabase } from 'lib/initSupabase';
import { useQuery } from 'react-query';

export default function Image({ object_key }) {
  const s3Key = object_key.replace('images/', '');

  const { data } = useQuery(['image_url', s3Key], ({ queryKey }) =>
    supabase.storage.from('images').createSignedUrl(queryKey[1], 60)
  );

  return (
    <div className="shadow-lg mb-4 bg-white animate-fadeIn md:w-2/3 lg:w-1/2 mx-auto p-2">
      <img src={data?.signedURL} alt={s3Key} />
    </div>
  );
}
