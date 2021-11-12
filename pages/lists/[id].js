import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styleUtils from 'styles/utils.module.css';
import { supabase } from 'lib/initSupabase';
import Authorization from 'components/Authorization';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function List() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;
  const user = supabase.auth.user();

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

  if (isLoading) {
    return 'LOADING...';
  }

  if (isError) {
    return 'ERROR';
  }

  return (
    <>
      <h1>{id}:</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>task:</label>
        <input
          type="text"
          id="label"
          name="label"
          placeholder="enter task here"
          onChange={formik.handleChange}
          value={formik.values.label}
        />
        <button disabled={create.isLoading} type="submit">
          + create
        </button>
        {create.isLoading && <span>SAVING</span>}
      </form>
      <ul>
        {tasks.length < 1 && <p>No items</p>}
        {tasks.map(({ task, id: taskId, is_complete }) => {
          return (
            <li className={styleUtils.removeListStyle} key={taskId}>
              <input
                disabled={update.isLoading}
                id={taskId}
                type="checkbox"
                checked={is_complete}
                onChange={handleChecked}
              />
              <label htmlFor={taskId}>{task}</label>
            </li>
          );
        })}
      </ul>
    </>
  );
}
