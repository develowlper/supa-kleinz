import Image from 'components/Image';
import ImageUpload from 'components/ImageUpload';
import { getImageMetas } from 'data/images';
import enforceAuthenticated from 'lib/auth/enforceAuthenticated';
import useSWR, { mutate, SWRConfig } from 'swr';

function Images({ user_id, swrQuery }) {
  const {
    data: { data: images },
  } = useSWR(swrQuery, async () => getImageMetas(user_id));

  return (
    <>
      <div className="mt-4 pb-4 md:container mx-4 md:mx-auto">
        {images?.map((image) => (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image key={image.thumb_key} {...image} />
        ))}
      </div>
      <ImageUpload onUpload={() => mutate(swrQuery)} />
    </>
  );
}
export default function Page({ fallback, ...props }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Images {...props} />
    </SWRConfig>
  );
}

export const getServerSideProps = enforceAuthenticated(async (ctx, user) => {
  const res = await getImageMetas(user?.id);
  const { resolvedUrl } = ctx;
  return {
    props: {
      swrQuery: resolvedUrl,
      fallback: {
        [resolvedUrl]: res,
      },
      user_id: user.id,
    },
  };
});
