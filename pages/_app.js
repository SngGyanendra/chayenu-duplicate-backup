import { Footer, Header } from '../components/layout';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from '../store';
import { HydrateToken, CheckAuth } from '/util';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <HydrateToken />
      <CheckAuth />
      <Header />
      <Component {...pageProps} />
      <Footer />
      <Toaster />
    </Provider>
  );
}

export default MyApp;
