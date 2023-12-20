import { Footer, Header } from '../components/layout';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from '../store';
import { HydrateToken, CheckAuth } from '/util';
import Head from 'next/head';
import LogRocket from 'logrocket';
import { ulid } from 'ulid';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (!localStorage.getItem('id')) {
      localStorage.setItem('id', ulid());
    }

    LogRocket.init('v2bczr/chayenu');
    LogRocket.identify(localStorage.getItem('id'), {
      name: localStorage.getItem('first_name'),
    });
  }, []);

  return (
    <>
      <Head>
        <link
          rel="true"
          preconnect="true"
          href="https://fonts.googleapis.com"
        />
        <link rel="true" preconnect="true" href="https://use.typekit.net" />
      </Head>
      <Provider store={store}>
        <HydrateToken />
        <CheckAuth />
        <Header />
        <Component {...pageProps} />
        <Footer />
        <Toaster />
      </Provider>
    </>
  );
}

export default MyApp;
