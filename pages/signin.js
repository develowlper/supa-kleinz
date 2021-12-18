import Button from 'components/Button';
import TextField from 'components/TextField';
import { useFormik } from 'formik';
import { supabase } from 'lib/initSupabase';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useMutation } from 'react-query';

const formFields = [
  { label: 'Email Adress', key: 'email', type: 'email' },
  {
    label: 'Password',
    key: 'password',
    type: 'password',
  },
];

export default function Signin() {
  const router = useRouter();
  const { mutate, isLoading, isError, error, reset } = useMutation(
    async (values) => {
      const { data, error } = await supabase.auth.signIn(values);
      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        router.replace(router.query.returnUrl || '/');
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: mutate,
  });

  const handleReset = useCallback(() => {
    formik.resetForm();
    reset();
  }, [formik, reset]);

  return (
    <div className="font-mono p-2 flex h-screen justify-center items-center bg-fuchsia-100">
      <form
        className="w-[400px] border-2 p-4 border-fuchsia-900 bg-white flex flex-col gap-5"
        onSubmit={formik.handleSubmit}
      >
        {formFields.map(({ label, key, type }) => (
          <div className="grid grid-rows-2 grid-cols-1" key={key}>
            <label htmlFor="email">{label}</label>
            <TextField
              id={key}
              name={key}
              type={type}
              onChange={formik.handleChange}
              value={formik.values[key]}
            />
          </div>
        ))}
        {isError && <span className="text-red-500">{error.message}</span>}
        <Button className="row-span-4" disabled={isLoading} type="submit">
          {'Signin'}
        </Button>
      </form>
    </div>
  );
}
