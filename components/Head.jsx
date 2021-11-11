import NextHead from 'next/head';

export default function Header({ title = 'kleinz' }) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content="welcome to kleinz" />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
}
