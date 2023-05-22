import Head from 'next/head';

export function NextHead({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://website.chayenu.dev/logodarker.png"
      />
      {description && <meta name="description" content={description} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="website.chayenu.dev" />
      <meta property="twitter:url" content="https://website.chayenu.dev/" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://website.chayenu.dev/logodarker.png"
      />
    </Head>
  );
}
