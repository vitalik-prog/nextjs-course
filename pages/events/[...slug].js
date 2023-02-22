import React, { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import EventList from '../../src/components/events/event-list';
import ResultsTitle from '../../src/components/events/results-title';
import Button from '../../src/components/ui/button';
import ErrorAlert from '../../src/components/ui/error-alert';
import {getFilteredEvents} from '../../src/components/helpers/api';
import useSWR from 'swr';
import Head from 'next/head';

const FilteredEvents = (props) => {
  const router = useRouter();
  const [loadedEvents, setLoadedEvents] = useState([]);
  const filterDate = router.query.slug
  const numberYear = filterDate && +filterDate[0];
  const numberMonth = filterDate && +filterDate[1];
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, error, isLoading } = useSWR('https://next-course-9c5e7-default-rtdb.firebaseio.com/events.json', fetcher)

  useEffect(() => {
    if (data && numberMonth && numberYear) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key]
        })
      }

      let filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numberYear && eventDate.getMonth() === numberMonth - 1;
      });

      setLoadedEvents(filteredEvents)
    }

  }, [data, numberYear, numberMonth]);

  if (isLoading || typeof numberMonth === 'undefined' || typeof numberYear === undefined) {
    return <p className={"center"}>Loading....</p>
  }

  if (isNaN(numberYear) 
  || isNaN(numberMonth) 
  || numberYear > 2030 
  || numberYear < 2021 
  || numberMonth < 1 
  || numberMonth > 12 
  || error) {
    return <>
      <ErrorAlert><p>Invalid filter</p></ErrorAlert>
      <div className={"center"}>
        <Button link={"/events"}>Show All Events</Button>
      </div>
    </>
  }

  if (loadedEvents.length === 0) {
    return <>
      <ErrorAlert><p>No events found</p></ErrorAlert>
      <div className={"center"}>
        <Button link={"/events"}>Show All Events</Button>
      </div>
    </>
  }

  return (
    <>
      <Head>
        <title>Filtered Events</title>
        <meta name="description" content="description" />
      </Head>
      <ResultsTitle date={new Date(numberYear, numberMonth - 1)} />
      <EventList items={loadedEvents} />
    </>
  );
};

// export async function getServerSideProps (ctx) {
//   const { slug: filterDate } = ctx.params;

//   const numberYear = +filterDate[0];
//   const numberMonth = +filterDate[1];

//   if (isNaN(numberYear) || isNaN(numberMonth) || numberYear > 2030 || numberYear < 2021 || numberMonth < 1 || numberMonth > 12) {
//     return {
//       props: {
//         hasError: true
//       }
//       // notFound: true,
//       // redirect:  {
//       //   destination: '/error'
//       // }
//     }
//   }

//   const filteredEvents = await getFilteredEvents({ year: numberYear, month: numberMonth })

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numberYear,
//         month: numberMonth
//       },
//     }
//   }
// }

export default FilteredEvents;
