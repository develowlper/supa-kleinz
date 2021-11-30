import { styled } from '@stitches/react';
import Button from 'components/Button';
import TextField from 'components/TextField';
import { useFormik } from 'formik';
import { supabase } from 'lib/initSupabase';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useMutation } from 'react-query';

const Container = styled('div', {
  display: 'grid',
  placeItems: 'center',
  height: '100vh',
  backgroundColor: 'var(--back)',
});

const Form = styled('form', {
  maxWidth: '500px',
  width: '500px',
  backgroundColor: 'white',
  padding: '1rem',
  border: '2px solid var(--primary-color)',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridRowGap: '1rem',
});

const InputGroup = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridTemplateRows: 'auto auto',
  gridRowGap: '0.5rem',
});

const ErrorMessage = styled('span', {
  color: 'var(--error-color)',
  animationName: 'fadeIn',
  animationDuration: '0.5s',
  transformOrigin: 'top',
});

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
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <InputGroup>
          <label htmlFor="email">Email Address</label>
          <TextField
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">Password</label>
          <TextField
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </InputGroup>
        <div style={{ height: '38px' }}>
          {isError && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>
        <Button disabled={isLoading} type="submit">
          {'> signin'}
        </Button>
      </Form>
    </Container>
  );
}
