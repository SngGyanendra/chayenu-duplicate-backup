import { Footer, Header } from '../components/layout';
import '../styles/globals.css';
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Provider } from 'react-redux';
import { store } from '../store';
import { refreshToken } from '/util/refreshToken';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  
  useEffect(() => {
    refreshToken();
  }, []);

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
