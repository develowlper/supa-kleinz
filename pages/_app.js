import Layout from 'components/Layout';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import '../styles/globals.css';
import { useState } from 'react';
import Authorization from 'components/Authorization';
import useAuthStateChangeHandling from 'hooks/useAuthStateChangeHandling';

export default function SupaKleinz({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  useAuthStateChangeHandling();

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
