import Image from 'components/Image';
import ImageUpload from 'components/ImageUpload';
import enforceAuthenticated from 'lib/auth/enforceAuthenticated';
import { supabase } from 'lib/supabaseClient';
import { useQuery, useQueryClient } from 'react-query';

export default function Images() {
  const queryClient = useQueryClient();

  const { data } = useQuery(
    ['images'],
    () => supabase.from('image_meta').select('*').order('id', true),
    { enabled: !!supabase.auth.user() }
  );

  const images = data?.data;

  return (
    <>
      <div className="mt-4 pb-4 md:container mx-4 md:mx-auto">
        {images?.map((image) => (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image key={image.id} {...image} />
        ))}
      </div>
      <ImageUpload onUpload={() => queryClient.invalidateQueries(['images'])} />
    </>
  );
}
export const getServerSideProps = enforceAuthenticated();

// {"Key":"images/private/GpPooyhxIemczco-5c5k4.jpg"}
