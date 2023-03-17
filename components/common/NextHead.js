import Head from 'next/head';

export function NextHead({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      {
        description &&
        <meta name="description" content={description} />
      }
    </Head>
  );
}
