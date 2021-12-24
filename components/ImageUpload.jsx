import { motion } from 'framer-motion';
import { supabase } from 'lib/supabaseClient';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { encode } from 'blurhash';
import { useMutation } from 'react-query';

const getImageData = (image) => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, image.width, image.height);
};

const variants = {
  hide: {
    scale: 0,
  },
  show: {
    scale: 1,
  },
};

const snackVariants = {
  show: {
    transform: 'translateX(0%)',
  },
  hide: {
    transform: 'translateX(100%)',
  },
};

export default function ImageUpload({ onUpload }) {
  const [buttonState, setButtonState] = useState('hide');
  const inputRef = useRef();

  const { mutate: uploadFile, isLoading: isUploading } = useMutation(
    async (data) => {
      return fetch('/api/images', {
        body: data,
        credentials: 'include',
        method: 'POST',
      });
    }
  );

  const handleChange = useCallback(
    (e) => {
      const inputFile = e.target.files[0];
      const data = new FormData();
      data.append('file', inputFile);
      uploadFile(data);
    },
    [uploadFile]
  );

  useEffect(() => {
    setButtonState('show');
    return () => setButtonState('hide');
  }, []);
  return (
    <>
      <motion.button
        variants={variants}
        initial={false}
        animate={buttonState}
        className="fixed bottom-5 right-5 bg-fuchsia-500 rounded-full aspect-square p-2 shadow-sm "
      >
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          id="myFile"
          name="filename"
          onChange={handleChange}
        />
        <RiAddLine
          className="text-4xl font-thin"
          onClick={() => inputRef.current.click()}
        />
      </motion.button>
      <motion.div
        className="fixed right-0 bottom-20 bg-fuchsia-500 p-2 shadow-sm -translate-x-1/2"
        initial={false}
        variants={snackVariants}
        animate={isUploading ? 'show' : 'hide'}
      >
        Uploading...
      </motion.div>
    </>
  );
}
