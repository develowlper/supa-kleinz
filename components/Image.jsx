/* eslint-disable jsx-a11y/alt-text */

import { supabase } from 'lib/supabaseClient';
import NextImage from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { Blurhash } from 'react-blurhash';

function gcd(a, b) {
  return b == 0 ? a : gcd(b, a % b);
}

const getAspect = (width, height) => {
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
};

export default function Image({
  width = 500,
  height = 700,
  blurhash,
  thumb_height,
  thumb_width,
  thumb_key,
  ...props
}) {
  const [src, setSrc] = useState(null);

  const getSrcFromSupabase = useCallback(async () => {
    const {
      data: { signedURL },
    } = await supabase.storage.from('images').createSignedUrl(thumb_key, 120);
    setSrc(signedURL);
  }, [thumb_key]);

  useEffect(() => {
    getSrcFromSupabase();
  }, [getSrcFromSupabase]);

  return (
    <div className="flex flex-col items-center">
      <div className="p-2 bg-white shadow-md mb-2">
        <div className="relative block overflow-hidden">
          <Blurhash
            className="absolute top-0 left-0 bottom-0 right-0"
            hash={blurhash}
            punch={1}
            height={thumb_height}
            width={thumb_width}
          />
          {src && (
            <div className="absolute top-0 left-0">
              <NextImage src={src} width={thumb_width} height={thumb_height} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
