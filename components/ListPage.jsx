import Head from 'next/head';

export default function ListPage({ children, title }) {
  return (
    <div className="py-3 px-2 flex flex-col gap-3">
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
}
