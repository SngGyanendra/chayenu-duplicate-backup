import { Footer, Header } from '../components/layout';
import '../styles/globals.css';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../store';
import { refreshToken } from '/util/refreshToken';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <HydrateToken />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

function HydrateToken() {
  const dispatch = useDispatch();
  useEffect(() => {
    refreshToken(dispatch);
  }, []);
  return <></>;
}

export default MyApp;
