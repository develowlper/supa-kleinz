import { supabase } from 'lib/initSupabase';
import { Auth as SupaAuth } from '@supabase/ui';
import { styled } from '@stitches/react';

const Container = styled('div', {
  display: 'grid',
  placeItems: 'center',
  marginTop: '2rem',
  width: '100vw',
  height: '100vh',
});

const Auth = styled(SupaAuth, {
  maxWidth: '500px',
  backgroundColor: 'white',
  padding: '1rem',
  border: '2px solid var(--primary-color)',
});

export default function Authorization({ children }) {
  const { user } = SupaAuth.useUser();

  return (
    <>
      {!user && (
        <Container>
          <Auth
            supabaseClient={supabase}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </Container>
      )}
      {user && children}
    </>
  );
}
