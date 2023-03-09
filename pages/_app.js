import { Footer, Header } from '../components/layout';
import '../styles/globals.css';
import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Provider } from 'react-redux';
import { store } from '../store';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  setTimeout(() => {
    console.log('hello ji');
  }, 2000);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
