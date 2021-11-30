import { styled } from '@stitches/react';
import { useRouter } from 'next/router';
import Heart from './Heart';
import { Navbar, Footer } from './Navigation';

const Container = styled('div', {
  display: 'grid',
  height: '100vh',
  maxHeight: '100vh',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateAreas: `
    'header'
    'main'
    'footer'`,
});

const Main = styled('main', {
  padding: '0 1rem',
  gridArea: 'main',
  overflowY: 'auto',
});

export default function Layout({ children, ignore = ['/signin'] }) {
  const router = useRouter();

  if (ignore.some((x) => x === router.pathname)) {
    return children;
  }

  return (
    <Container>
      <Navbar />
      <Heart />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
}
