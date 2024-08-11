import Head from "next/head";

const HeadMeta: React.FC = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="https://mom-ma.misae.us/favicon.ico" />
        <link rel="shortcut icon" href="https://mom-ma.misae.us/favicon.ico" />
        <link
          rel="apple-touch-icon"
          href="https://mom-ma.misae.us/favicon.ico"
        />
        <link rel="canonical" href="https://mom-ma.misae.us" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta property="og:type" content="website" />
        <meta name="title" content="Mom-ma" />
        <meta name="description" content="" />
        <meta property="og:title" content="Mom-ma" />
        <meta property="og:description" content="" />
      </Head>
    </>
  );
};

export default HeadMeta;
