import React from 'react';
import EventList from '../../src/components/events/event-list';
import EventsSearch from '../../src/components/events/events-search';
import {useRouter} from 'next/router';
import {getAllEvents} from '../../src/components/helpers/api';
import Head from 'next/head';

const Events = (props) => {
  const { events } = props
  const router = useRouter()
  const findEventsHandler = (year, month) => {
    const path = `/events/${year}/${month}`
    router.push(path)
  }

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export async function getStaticProps () {
  const events = await getAllEvents();
  return {
    props: {
      events
    },
    revalidate: 60,
  }
}

export default Events;
