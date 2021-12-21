import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import { supabase } from 'lib/initSupabase';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import TextField from 'components/TextField';
import Button from 'components/Button';
import Head from 'next/head';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.25 } },
};

const variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function List() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery(
    ['tasks', id],
    async ({ queryKey }) => {
      const { error, data } = await supabase
        .from('todos')
        .select('*')
        .eq('list', queryKey[1])
        .order('id', true);

      if (error) {
        throw error;
      }
      return data;
    },

    { initialData: [] }
  );

  const create = useMutation(
    async (task) => {
      const { data, error } = await supabase
        .from('todos')
        .insert(task)
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['tasks', id]),
    }
  );

  const update = useMutation(
    async ({ id, is_complete }) => {
      const { data, error } = await supabase
        .from('todos')
        .update({ is_complete })
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['tasks', id]),
    }
  );

  const formik = useFormik({
    initialValues: {
      label: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const task = values.label.trim();
      const user = supabase.auth.user();
      if (task.length) {
        create.mutate({ task, user_id: user.id, list: id });
        resetForm();
      }
    },
  });

  const handleChecked = (e) => {
    update.mutate({
      id: Number(e.target.id),
      is_complete: e.target.checked,
    });
  };

  if (isError) {
    return 'ERROR';
  }

  return (
    <div className="py-3 px-2 flex flex-col gap-3">
      <Head>
        <title>{`${id}`}</title>
      </Head>
      <form className="flex gap-2 items-center" onSubmit={formik.handleSubmit}>
        <TextField
          type="text"
          id="label"
          name="label"
          placeholder="enter task here"
          onChange={formik.handleChange}
          value={formik.values.label}
        />
        <Button disabled={create.isLoading} type="submit">
          Create
        </Button>
        {create.isLoading && <span>SAVING</span>}
      </form>
      <div className="md:flex md:space-x-4">
        <div className="flex-1 shadow-md">
          <div className="h-full p-2 border bg-white">
            <h2 className="text-lg px-4 py-2">Open</h2>
            <motion.ul
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-2"
            >
              {tasks.length < 1 && <p>No items</p>}
              {tasks
                .filter((x) => !x.is_complete)
                .map(({ task, id: taskId, is_complete }) => {
                  return (
                    <motion.li
                      variants={variants}
                      className="border px-4 py-2 bg-white shadow-sm flex items-center gap-2"
                      key={taskId}
                    >
                      <input
                        className="form-checkbox h-4 w-4 text-emerald-500"
                        disabled={update.isLoading}
                        id={taskId}
                        type="checkbox"
                        checked={is_complete}
                        onChange={handleChecked}
                      />
                      <label htmlFor={taskId}>{task}</label>
                    </motion.li>
                  );
                })}
            </motion.ul>
          </div>
        </div>
        <div className="flex-1">
          <div className="h-full p-2 border bg-white shadow-md">
            <h2 className="text-lg px-4 py-2">Done</h2>
            <motion.ul
              animate="show"
              initial="hidden"
              variants={container}
              className="space-y-2"
            >
              {tasks.length < 1 && <p>No items</p>}
              {tasks
                .filter((x) => x.is_complete)
                .map(({ task, id: taskId, is_complete }) => {
                  return (
                    <motion.li
                      variants={variants}
                      className="border px-4 py-2 bg-white shadow-sm flex items-center gap-2"
                      key={taskId}
                    >
                      <input
                        className="form-checkbox h-4 w-4 text-emerald-500"
                        disabled={update.isLoading}
                        id={taskId}
                        type="checkbox"
                        checked={is_complete}
                        onChange={handleChecked}
                      />
                      <label htmlFor={taskId}>{task}</label>
                    </motion.li>
                  );
                })}
            </motion.ul>
          </div>
        </div>
      </div>
    </div>
  );
}
