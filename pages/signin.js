import { styled } from '@stitches/react';
import Button from 'components/Button';
import { useFormik } from 'formik';
import { supabase } from 'lib/initSupabase';
import { useRouter } from 'next/router';
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

const TextField = styled('input', {
  fontSize: '1.2rem',
  borderColor: 'var(--primary-color)',
  borderWidth: '2px',
  padding: '0.5rem 0.75rem',
  '&:focus': {
    outline: '2px solid var(--secondary-color)',
  },
});

export default function Signin() {
  const router = useRouter();
  const { mutate } = useMutation((values) => supabase.auth.signIn(values), {
    onSuccess: () => {
      router.replace(router.query.returnUrl || '/');
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: mutate,
  });

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
          <label htmlFor="email">Password</label>
          <TextField
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </InputGroup>
        <Button type="submit">{'> signin'}</Button>
      </Form>
    </Container>
  );
}
