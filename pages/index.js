import Link from 'next/link'
import styles from '../styles/Home.module.css'
import EventList from '../src/components/events/event-list';
import {getFeaturedEvents} from '../src/components/helpers/api';
import Head from 'next/head';

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
      <h1>Home page</h1>
      <EventList items={props.events} />
    </div>
  )
}

export async function getStaticProps () {
  return {
    props: {
      events: await getFeaturedEvents(),
    },
    revalidate: 1800,
  }
}
