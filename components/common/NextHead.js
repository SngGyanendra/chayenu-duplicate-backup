import Head from 'next/head';

export function NextHead({ title, content }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title}></meta>
      {content && <meta name="description" content={content} />}
    </Head>
  );
}
