import { supabase } from 'lib/initSupabase';
import { useQuery } from 'react-query';
import NextImage from 'next/image';
import { Blurhash } from 'react-blurhash';
import clsx from 'clsx';

function gcd(a, b) {
  return b == 0 ? a : gcd(b, a % b);
}

const getAspect = (width, height) => {
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
};

export default function Image({ object_key, width, height, blurhash }) {
  const s3Key = object_key.replace('images/', '');

  const { data } = useQuery(['image_url', s3Key], ({ queryKey }) =>
    supabase.storage.from('images').createSignedUrl(queryKey[1], 60)
  );

  return (
    <div className="shadow-lg mb-4 bg-white animate-fadeIn md:w-2/3 lg:w-1/2 mx-auto p-2">
      {data && (
        <div
          className={clsx(
            'relative block overflow-hidden',
            `aspect-[${getAspect(width, height)}]`
          )}
        >
          <div className="absolute top-0 left-0 w-full h-full right-0 bottom-0">
            <NextImage
              className={clsx('object-contain')}
              src={data.signedURL}
              alt={s3Key}
              width={width}
              height={height}
            />
            {blurhash && (
              <Blurhash
                hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
                width="100%"
                height="100%"
                resolutionX={32}
                resolutionY={32}
                punch={1}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
