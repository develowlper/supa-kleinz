/* eslint-disable jsx-a11y/alt-text */

import NextImage from 'next/image';
import { Blurhash } from 'react-blurhash';

function gcd(a, b) {
  return b == 0 ? a : gcd(b, a % b);
}

const getAspect = (width, height) => {
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
};

export default function Image({ src, width = 500, height = 700, blurhash }) {
  return (
    <div className="flex flex-col items-center">
      <div className="p-2 bg-white shadow-md mb-2">
        <div className="relative block overflow-hidden">
          <Blurhash
            className="absolute top-0 left-0 bottom-0 right-0"
            hash={blurhash}
            punch={1}
            height={height}
            width={width}
          />
          <div className="absolute top-0 left-0">
            <NextImage src={src} width={width} height={height} />
          </div>
        </div>
      </div>
    </div>
  );
}
