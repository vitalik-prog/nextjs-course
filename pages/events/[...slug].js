import React from 'react';
import {useRouter} from 'next/router';
import EventList from '../../src/components/events/event-list';
import ResultsTitle from '../../src/components/events/results-title';
import Button from '../../src/components/ui/button';
import ErrorAlert from '../../src/components/ui/error-alert';
import {getFilteredEvents} from '../../src/components/helpers/api';

const FilteredEvents = (props) => {
  // const router = useRouter();
  // const filterDate = router.query.slug
  // if (!filterDate) {
  //   return <p className={"center"}>Loading....</p>
  // }

  // const numberYear = +filterDate[0];
  // const numberMonth = +filterDate[1];

  if (props.hasError) {
    return <>
      <ErrorAlert><p>Invalid filter</p></ErrorAlert>
      <div className={"center"}>
        <Button link={"/events"}>Show All Events</Button>
      </div>
    </>
  }

  const filteredEvents = props.events

  if (!filteredEvents || filteredEvents.length === 0) {
    return <>
      <ErrorAlert><p>No events found</p></ErrorAlert>
      <div className={"center"}>
        <Button link={"/events"}>Show All Events</Button>
      </div>
    </>
  }

  return (
    <>
      <ResultsTitle date={new Date(props.date.year, props.date.month - 1)} />
      <EventList items={filteredEvents} />
    </>
  );
};

export async function getServerSideProps (ctx) {
  const { slug: filterDate } = ctx.params;

  const numberYear = +filterDate[0];
  const numberMonth = +filterDate[1];

  if (isNaN(numberYear) || isNaN(numberMonth) || numberYear > 2030 || numberYear < 2021 || numberMonth < 1 || numberMonth > 12) {
    return {
      props: {
        hasError: true
      }
      // notFound: true,
      // redirect:  {
      //   destination: '/error'
      // }
    }
  }

  const filteredEvents = await getFilteredEvents({ year: numberYear, month: numberMonth })

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numberYear,
        month: numberMonth
      },
    }
  }
}

export default FilteredEvents;
