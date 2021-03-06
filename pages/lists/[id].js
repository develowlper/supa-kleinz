import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import { supabase } from 'lib/supabaseClient';

import TextField from 'components/TextField';
import Button from 'components/Button';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';
import enforceAuthenticated from 'lib/auth/enforceAuthenticated';
import { getTasks, setIsTaskComplete } from 'data/tasks';
import useSWR, { SWRConfig, useSWRConfig } from 'swr';
import { useCallback, useState } from 'react';
import ListPage from 'components/ListPage';
import produce from 'immer';
import listTransition from 'components/animations/listTransition';

const variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

function List({ swrQuery, userId }) {
  const router = useRouter();
  const { id } = router.query;
  const { mutate } = useSWRConfig();
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: tasks, error } = useSWR(swrQuery, async function loadTasks() {
    return getTasks(id, userId);
  });

  const create = useCallback(
    async (task) => supabase.from('todos').insert(task).single(),
    []
  );

  const update = useCallback(
    async ({ id, is_complete }) => {
      setIsUpdating(true);
      mutate(
        swrQuery,
        produce(tasks, (draft) => {
          const index = draft.findIndex((task) => task.id === id);
          draft[index].is_complete = is_complete;
        }),
        false
      );
      await setIsTaskComplete(id, is_complete);
      // trigger a revalidation (refetch) to make sure our local data is correct
      mutate(swrQuery);
      setIsUpdating(false);
    },
    [mutate, swrQuery, tasks]
  );

  const formik = useFormik({
    initialValues: {
      label: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const task = values.label.trim();
      const user = supabase.auth.user();
      if (task.length) {
        create({ task, user_id: user.id, list: id });
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

  if (error) {
    return 'ERROR';
  }

  return (
    <ListPage>
      <Head>
        <title>{`${id}`}</title>
      </Head>
      <form
        className="flex gap-2 items-center flex-wrap"
        onSubmit={formik.handleSubmit}
      >
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
              variants={listTransition}
              initial="hidden"
              animate="show"
              className="space-y-2"
            >
              {tasks.length < 1 && <p>No items</p>}
              <AnimatePresence>
                {tasks
                  .filter((x) => !x.is_complete)
                  .map(({ task, id: taskId, is_complete }) => {
                    return (
                      <motion.li
                        variants={variants}
                        className="border px-4 py-2 bg-white shadow-sm flex items-center gap-2"
                        key={taskId}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                      >
                        <input
                          disabled={isUpdating}
                          className="form-checkbox h-4 w-4 text-sky-500"
                          id={taskId}
                          type="checkbox"
                          checked={is_complete}
                          onChange={handleChecked}
                        />
                        <label htmlFor={taskId}>{task}</label>
                      </motion.li>
                    );
                  })}
              </AnimatePresence>
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
              variants={listTransition}
              className="space-y-2"
            >
              {tasks.length < 1 && <p>No items</p>}
              <AnimatePresence>
                {tasks
                  .filter((x) => x.is_complete)
                  .map(({ task, id: taskId, is_complete }) => {
                    return (
                      <motion.li
                        variants={variants}
                        className="border px-4 py-2 bg-white shadow-sm flex items-center gap-2"
                        key={taskId}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
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
              </AnimatePresence>
            </motion.ul>
          </div>
        </div>
      </div>
    </ListPage>
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
