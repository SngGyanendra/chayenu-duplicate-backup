import { Footer, Header } from "../components/layout";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../store";
import { HydrateToken, CheckAuth } from "/util";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="true" preconnect="true" href="https://fonts.googleapis.com" />
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
