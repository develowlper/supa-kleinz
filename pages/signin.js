import Button from 'components/Button';
import TextField from 'components/TextField';
import { useFormik } from 'formik';
import { supabase } from 'lib/initSupabase';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useMutation } from 'react-query';

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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <TextField
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <TextField
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <div style={{ height: '38px' }}>
          {isError && <span>{error.message}</span>}
        </div>
        <Button disabled={isLoading} type="submit">
          {'> signin'}
        </Button>
      </form>
    </div>
  );
}
