import { motion } from 'framer-motion';
import { supabase } from 'lib/initSupabase';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';

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
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleNewImageUpload = useCallback(
    async (imageObject) => {
      setIsOptimizing(true);
      const { data, error } = await supabase
        .from('image_meta')
        .insert({
          object_key: imageObject.Key,
          created_by: supabase.auth.user()?.id,
        })
        .single();
      if (data) {
        onUpload(data);
        setError(null);
      }
      if (error) {
        setImage(null);
        setError(error);
      }
      setIsOptimizing(false);
    },
    [onUpload]
  );

  const handleChange = useCallback(
    async (e) => {
      nanoid;
      setIsUploading(true);
      const inputFile = e.target.files[0];
      const ext = inputFile.name.split('.').pop();
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`private/${nanoid()}.${ext}`, inputFile);
      if (data) {
        setError(null);
        handleNewImageUpload(data);
      }
      if (error) {
        setError(error);
      }
      setIsUploading(false);
    },
    [handleNewImageUpload]
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
      <motion.div
        className="fixed right-0 bottom-20 bg-fuchsia-500 p-2 shadow-sm -translate-x-1/2"
        initial={false}
        variants={snackVariants}
        animate={isOptimizing ? 'show' : 'hide'}
      >
        Optimizing...
      </motion.div>
    </>
  );
}

// {"Key":"images/private/GpPooyhxIemczco-5c5k4.jpg"}
