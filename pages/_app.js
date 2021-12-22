import Layout from 'components/Layout';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import '../styles/globals.css';
import { useState } from 'react';
import Authorization from 'components/Authorization';
import useUpdateAuthCookie from 'hooks/useUpdateAuthCookie';
import useRedirectOnSignout from 'hooks/useRedirectOnAuthChange';

export default function SupaKleinz({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  useUpdateAuthCookie();
  useRedirectOnSignout();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Authorization>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Authorization>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}
