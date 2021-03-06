import { supabase } from 'lib/supabaseClient';

import {
  RiDeleteBin2Line,
  RiDislikeLine,
  RiEmotionNormalLine,
  RiHeartLine,
} from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { mutate } from 'swr';
import { deleteName } from 'data/names';
import clsx from 'clsx';
import produce from 'immer';

const nameVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const buttonBaseClasses = 'flex flex-col justify-end items-center';

export default function Name({ name, mood, id }) {
  const swrQuery = useRouter().asPath;

  const update = useCallback(
    async (newMood) => {
      mutate(
        swrQuery,
        (names) =>
          produce(names, (draft) => {
            const index = draft.findIndex((n) => n.id === id);
            draft[index].mood = newMood;
          }),
        false
      );

      await supabase
        .from('names')
        .update({ mood: newMood })
        .eq('id', id)
        .single();
      mutate(swrQuery);
    },
    [id, swrQuery]
  );

  const handleDelete = useCallback(async () => {
    mutate(
      swrQuery,
      (names) =>
        produce(names, (draft) => {
          const index = draft.findIndex((n) => n.id === id);
          draft.splice(index, 1);
        }),
      false
    );
    await deleteName(id);
    mutate(swrQuery);
  }, [id, swrQuery]);

  return (
    <motion.li
      variants={nameVariants}
      className="shadow-sm border py-2 px-3 flex justify-between items-center"
    >
      <div>{name}</div>
      <div className="flex items-center space-x-2">
        {mood !== 'ok' && (
          <button
            className={clsx(buttonBaseClasses, 'hover:text-fuchsia-500')}
            onClick={() => update('ok')}
          >
            <RiEmotionNormalLine className="" />
            <span className="text-sm">Ok</span>
          </button>
        )}
        {mood !== 'like' && (
          <button
            className={clsx(buttonBaseClasses, 'hover:text-fuchsia-500')}
            onClick={() => update('like')}
          >
            <RiHeartLine className="" />
            <span className="text-sm">Like</span>
          </button>
        )}
        {mood !== 'dislike' && (
          <button
            className={clsx(buttonBaseClasses, 'hover:text-sky-500')}
            onClick={() => update('dislike')}
          >
            <RiDislikeLine className="" />
            <span className="text-sm">Dislike</span>
          </button>
        )}
        <button
          onClick={handleDelete}
          className={clsx(buttonBaseClasses, 'hover:text-red-500')}
        >
          <RiDeleteBin2Line />
          <span className="text-sm">Delete</span>
        </button>
      </div>
    </motion.li>
  );
}
