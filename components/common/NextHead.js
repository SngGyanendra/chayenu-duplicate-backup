import Head from 'next/head';

export function NextHead({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://website.chayenu.dev/logodarker.svg"
      />
      {description && <meta name="description" content={description} />}
    </Head>
  );
}
