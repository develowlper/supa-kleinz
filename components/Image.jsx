/* eslint-disable jsx-a11y/alt-text */
import { supabase } from 'lib/supabaseClient';
import { useQuery } from 'react-query';
import NextImage from 'next/image';
import { Blurhash, BlurhashCanvas } from 'react-blurhash';
import clsx from 'clsx';

function gcd(a, b) {
  return b == 0 ? a : gcd(b, a % b);
}

const getAspect = (width, height) => {
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
};

export default function Image({ src, width = 500, height = 700, blurhash }) {
  return (
    <div className="relative block overflow-hidden">
      <Blurhash
        className="absolute top-0 left-0"
        hash={blurhash}
        punch={1}
        height={height}
        width={width}
      />
      <img className="absolute top-0 left-0" src={src} />
    </div>
  );
}
