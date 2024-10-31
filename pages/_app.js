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
import Script from 'next/script';
// import StickyNote from '../components/layout/stickyNote';

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
      {/* <Script id="fundraiseup">{`
        (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track,openCheckout'
        .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
        :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
        j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a+'';
        t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=5;o.h=w.location.href;o.l=[];
        for(i=0;i<8;i++)o[l[i]]=o(l[i]);w[n]=o}
        })(window,document,'script','FundraiseUp','ADGQGGSZ');`}</Script> */}
      <Head>
        <link
          rel="true"
          preconnect="true"
          href="https://fonts.googleapis.com"
        />
        <link rel="true" preconnect="true" href="https://use.typekit.net" />
        <script
          dangerouslySetInnerHTML={{
            __html: ` (function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track,openCheckout'
        .split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o
        :function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],
        j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a+'';
        t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=5;o.h=w.location.href;o.l=[];
        for(i=0;i<8;i++)o[l[i]]=o(l[i]);w[n]=o}
        })(window,document,'script','FundraiseUp','ADGQGGSZ');`,
          }}
        />
      </Head>
      <Provider store={store}>
        <HydrateToken />
        <CheckAuth />
        <Header />
        {/* <StickyNote
          url="https://chayenu.givingfuel.com/elul-campaign"
          content="Elul Appeal. Please help give daily Torah to Jews everywhere"
        /> */}
        <Component {...pageProps} />
        <Footer />
        <Toaster />
      </Provider>
    </>
  );
}

export default MyApp;
