import Image from 'components/Image';
import ImageUpload from 'components/ImageUpload';
import enforceAuthenticated from 'lib/auth/enforceAuthenticated';
import { encodeImageToBlurhash } from 'lib/encodeImageToBlurhash';
import spacesClient from 'lib/spacesClient';
import { nanoid } from 'nanoid';
import sharp from 'sharp';

export default function Images({ images }) {
  return (
    <>
      <div className="mt-4 pb-4 md:container mx-4 md:mx-auto">
        {images?.map((image) => (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image key={image.key} {...image} />
        ))}
      </div>
      <ImageUpload />
    </>
  );
}

export const getServerSideProps = enforceAuthenticated(async (ctx) => {
  const { Contents } = await spacesClient
    .listObjects({ Bucket: process.env.SPACES_BUCKET })
    .promise();

  const images = await Promise.all(
    Contents.map(async (image) => {
      const src = await spacesClient.getSignedUrl('getObject', {
        Bucket: process.env.SPACES_BUCKET,
        Key: image.Key, //filename
        Expires: 5 * 60, //time to expire in seconds - 5 min
      });

      const object = await spacesClient
        .getObject({ Bucket: process.env.SPACES_BUCKET, Key: image.Key })
        .promise();
      const meta = await sharp(object.Body).metadata();

      return {
        src,
        key: nanoid(5),
        width: meta.width,
        height: meta.height,
        blurhash: await encodeImageToBlurhash(object.Body),
      };
    })
  );

  return {
    props: { images },
  };
});
