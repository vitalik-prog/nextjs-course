import '../styles/globals.css'
import Layout from '../src/components/layout/layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>NextJS Events</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Find a lot of great events that allow you to evolve..." />
    </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
    )
}

export default MyApp
