import Button from 'components/Button';
import TextField from 'components/TextField';
import { useFormik } from 'formik';
import { supabase } from 'lib/initSupabase';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Head from 'next/head';
import clsx from 'clsx';
import { capitalize } from 'utils/capitalize';
import {
  RiDislikeLine,
  RiEmotionNormalLine,
  RiHeartLine,
} from 'react-icons/ri';
import { motion } from 'framer-motion';
import enforceAuthenticated from 'lib/auth/enforceAuthenticated';

const variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.25 } },
};

const nameVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const Name = ({ name, mood, id }) => {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: update } = useMutation(
    async (newMood) => {
      const { data, error } = await supabase
        .from('names')
        .update({ mood: newMood })
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['names']),
    }
  );

  return (
    <motion.li
      variants={nameVariants}
      className="shadow-sm border py-2 px-3 flex justify-between items-center"
    >
      <div>{name}</div>
      <div className="flex items-center space-x-2">
        {mood !== 'ok' && (
          <button
            disabled={isUpdating}
            className="flex flex-col justify-end items-center hover:text-red-500"
            onClick={() => update('ok')}
          >
            <RiEmotionNormalLine className="" />
            <span className="text-sm">Ok</span>
          </button>
        )}
        {mood !== 'like' && (
          <button
            disabled={isUpdating}
            className="flex flex-col justify-end items-center hover:text-red-500"
            onClick={() => update('like')}
          >
            <RiHeartLine className="" />
            <span className="text-sm">Like</span>
          </button>
        )}
        {mood !== 'dislike' && (
          <button
            disabled={isUpdating}
            className="flex flex-col justify-end items-center hover:text-sky-500"
            onClick={() => update('dislike')}
          >
            <RiDislikeLine className="" />
            <span className="text-sm">Dislike</span>
          </button>
        )}
      </div>
    </motion.li>
  );
};

const NameSheet = ({ children, className }) => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={variants}
      className={clsx('space-y-2', className)}
    >
      {children}
    </motion.div>
  );
};

export default function Names(props) {
  const queryClient = useQueryClient();

  const {
    data: names,
    isLoading,
    isError,
  } = useQuery(
    ['names'],
    async ({ queryKey }) => {
      const { error, data } = await supabase
        .from(queryKey[0])
        .select('*')
        .order('id', true);

      if (error) {
        throw error;
      }
      return data;
    },

    { initialData: [] }
  );

  const create = useMutation(
    async (name) => {
      const { data, error } = await supabase
        .from('names')
        .insert(name)
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['names']),
    }
  );

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const name = values.name.trim();
      const user = supabase.auth.user();
      if (name.length) {
        create.mutate({ name, user_id: user.id });
        resetForm();
      }
    },
  });
  return (
    <div className="space-y-2">
      <Head>
        <title>Names</title>
      </Head>
      <div className="space-y-3 my-6">
        <form className="flex gap-2 items-end" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name your child.</label>
            <TextField
              type="text"
              id="name"
              name="name"
              placeholder="Enter name here."
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </div>
          <Button disabled={create.isLoading} type="submit">
            Create
          </Button>
          {create.isLoading && <span>SAVING</span>}
        </form>
        <div className=" md:flex md:space-x-3 space-y-3 md:space-y-0">
          {['ok', 'like', 'dislike'].map((key) => {
            return (
              <NameSheet
                key={key}
                className={'flex-1 border shadow-md bg-white py-3 px-6'}
              >
                <h2 className="text-lg">
                  <strong>{capitalize(key)}</strong>
                </h2>

                {names.length < 1 && <p>No names (yet).</p>}
                {names
                  .filter((check) => check.mood === key)
                  .map(({ name, id, mood }) => {
                    return <Name name={name} key={id} mood={mood} id={id} />;
                  })}
              </NameSheet>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = enforceAuthenticated();
