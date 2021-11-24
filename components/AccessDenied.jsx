import { styled } from '@stitches/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { baseStyle } from 'styles/button';

const A = styled('a', baseStyle);

const Container = styled('div', {
  display: 'grid',
  placeItems: 'center',
  height: '100vh',
  backgroundColor: 'var(--back)',
});

export default function AccessDenied() {
  const router = useRouter();
  const returnUrl =
    router.asPath !== '/'
      ? `?returnUrl=${encodeURIComponent(router.asPath)}`
      : '';

  return (
    <Container>
      <Link href={`/signin${returnUrl}`} passHref>
        <A> {'Please login to access this page >'}</A>
      </Link>
    </Container>
  );
}
