import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import { supabase } from 'lib/supabaseClient';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import TextField from 'components/TextField';
import Button from 'components/Button';
import Head from 'next/head';
import { motion } from 'framer-motion';
import enforceAuthenticated from 'lib/auth/enforceAuthenticated';
import { getTasks, setIsTaskComplete, useTasks } from 'data/tasks';
import useSWR, { SWRConfig, useSWRConfig } from 'swr';
import { useUser } from 'stores/authorization';
import { useCallback } from 'react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.25 } },
};

const variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

function List({ swrQuery, isError, error, userId }) {
  const router = useRouter();
  const { id } = router.query;
  const { mutate } = useSWRConfig();

  const queryClient = useQueryClient();

  const { data: tasks } = useSWR(swrQuery, async function loadTasks() {
    return getTasks(id, userId);
  });

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

  const update = useCallback(
    async ({ id, is_complete }) => {
      //   mutate('/api/user', { ...data, name: newName }, false);

      await setIsTaskComplete(id, is_complete);

      // trigger a revalidation (refetch) to make sure our local data is correct
      mutate(swrQuery);
    },
    [swrQuery]
  );

  // useMutation(
  //   async ({ id, is_complete }) => {
  //     const { data, error } = await setIsTaskComplete(id, is_complete);

  //     if (error) {
  //       throw error;
  //     }
  //     return data;
  //   },
  //   {
  //     onSuccess: () => queryClient.invalidateQueries(['tasks', id]),
  //   }
  // );

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
    update({
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
        <label htmlFor="label">What could be done?</label>
        <TextField
          type="text"
          id="label"
          name="label"
          placeholder="Enter task here."
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
              key={`${id}-complete`}
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
                        className="form-checkbox h-4 w-4 text-sky-500"
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
              key={id}
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
                        className="form-checkbox h-4 w-4 text-sky-500"
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

export default function Page({ fallback, ...props }) {
  return (
    <SWRConfig value={{ fallback }}>
      <List {...props} />
    </SWRConfig>
  );
}

export const getServerSideProps = enforceAuthenticated(async (ctx, user) => {
  const {
    resolvedUrl,
    params: { id },
  } = ctx;

  const res = await getTasks(id, user.id);

  return {
    props: {
      swrQuery: resolvedUrl,
      fallback: {
        [resolvedUrl]: res,
      },
      userId: user.id,
    },
  };
});
