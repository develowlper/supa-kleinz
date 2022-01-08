/* eslint-disable jsx-a11y/alt-text */

import { deleteImageMeta, deleteImages, downloadImage } from 'data/images';
import { supabase } from 'lib/supabaseClient';
import NextImage from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { RiArrowDownLine, RiDeleteBin2Line, RiSave2Line } from 'react-icons/ri';
import { download } from 'utils/download';
import Button from 'components/Button';
import clsx from 'clsx';
import isDevlopment from 'utils/isDevlopment';

function gcd(a, b) {
  return b == 0 ? a : gcd(b, a % b);
}

const getAspect = (width, height) => {
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
};

export default function Image({
  blurhash,
  thumb_height,
  thumb_width,
  thumb_key,
  download_key,
  plaiceholder_css,
  id,
  onDelete = () => {},
}) {
  const [src, setSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDownload = useCallback(async (e, key) => {
    console.log('downloading...');
    setIsLoading(false);
    const { data } = await downloadImage(key);

    download(URL.createObjectURL(data), key);
    e.target.blur();
    setIsLoading(false);
  }, []);

  const handleDelete = useCallback(
    async (e) => {
      console.log('deleting...');
      setIsDeleting(true);
      await deleteImages([download_key, thumb_key]);
      await deleteImageMeta(id);
      e.target.blur();
      setIsDeleting(false);
      onDelete();
    },
    [download_key, id, onDelete, thumb_key]
  );

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
    <div className="p-2 bg-white shadow-md mb-2 max-w-[700px] m-auto">
      <div className="relative block overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full blur-2xl scale-150"
          style={{
            ...plaiceholder_css,
          }}
        />
        {src && (
          <NextImage
            src={src}
            width={thumb_width}
            height={thumb_height}
            layout="responsive"
          />
        )}
        <div
          tabIndex={0}
          className="group transition-opacity absolute top-0 left-0 w-full h-full right-0 bottom-0 opacity-0 flex focus:opacity-100  md:hover:opacity-100  bg-fuchsia-500/50 items-center justify-center"
        >
          <div className={`flex flex-col align-middle`}>
            <span
              className={`flex justify-center text-4xl text-white p-1 animate-bounce ${
                isLoading && 'animate-ping'
              }`}
            >
              <RiArrowDownLine />
            </span>
            <Button
              disabled={isLoading}
              onClick={(e) => handleDownload(e, download_key)}
              className={clsx(
                'flex gap-2 items-center',
                isLoading && 'opacity-0'
              )}
            >
              Speichern
              <RiSave2Line className="text-lg" />
            </Button>
          </div>
        </div>
        {isDevlopment && (
          <div
            tabIndex={0}
            className="group transition-opacity absolute top-0 right-0 p-2"
          >
            <Button
              disabled={isDeleting}
              onClick={(e) => handleDelete(e)}
              className={clsx(
                'flex gap-2 items-center',
                isDeleting && 'opacity-0'
              )}
            >
              Delete
              <RiDeleteBin2Line className="text-lg" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
