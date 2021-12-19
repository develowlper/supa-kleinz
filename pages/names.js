import Button from 'components/Button';
import TextField from 'components/TextField';
import { useFormik } from 'formik';
import { supabase } from 'lib/initSupabase';
import { useMutation, useQuery, useQueryClient } from 'react-query';

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
    <div className="grid grid-cols-1 gap-3">
      <h1 className="uppercase text-2xl">Names</h1>
      <form className="flex gap-2 items-center" onSubmit={formik.handleSubmit}>
        <TextField
          type="text"
          id="name"
          name="name"
          placeholder="enter name here"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <Button disabled={create.isLoading} type="submit">
          Create
        </Button>
        {create.isLoading && <span>SAVING</span>}
      </form>
      <ul>
        {names.length < 1 && <p>No names (yet).</p>}
        {names.map(({ name, id, is_complete }) => {
          return (
            <li className="" key={id}>
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
