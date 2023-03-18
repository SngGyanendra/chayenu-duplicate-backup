import { Footer, Header } from '../components/layout';
import '../styles/globals.css';
import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../store';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import { saveUserData } from '/store/userSlice';
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
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { subscriptions, countries, cancel_reasons } = useSelector(
    (state) => state.user
  );
  const APIs = new AuthencticatedUserAPI();
  useEffect(() => {
    refreshToken(dispatch);
    if (isLoggedIn) {
      if (
        subscriptions?.length === 0 ||
        countries.length === 0 ||
        cancel_reasons.length === 0
      ) {
        (async () => {
          const { subscriptions, countries, cancel_reasons } =
            await APIs.prefetchAllData();
          dispatch(saveUserData({ subscriptions, countries, cancel_reasons }));
        })();
      }
    }
  }, [isLoggedIn]);
  return <></>;
}

export default MyApp;
