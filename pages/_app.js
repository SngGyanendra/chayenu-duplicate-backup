import { Footer, Header } from '../components/layout';
import '../styles/globals.css';
import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </QueryClientProvider>
  );
}

export default MyApp;
