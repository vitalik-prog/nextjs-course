import {getEventById} from '../../dummy-data';
import EventSummary from '../../src/components/event-detail/event-summary';
import EventLogistics from '../../src/components/event-detail/event-logistics';
import EventContent from '../../src/components/event-detail/event-content';
import ErrorAlert from '../../src/components/ui/error-alert';
import {getAllEvents, getFeaturedEvents} from '../../src/components/helpers/api';

const Event = (props) => {
  const { event } = props;

  if (!event) {
    return <div className="center"><p>Loading</p></div>
  }

  return (
    <>
      <EventSummary title={event.title}/>
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title}/>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export async function getStaticProps (ctx) {
  const {eventId} = ctx.params;
  const event = await getEventById(eventId);

  return {
    props: {
      event
    },
    revalidate: 30,
  }
}

export async function getStaticPaths () {
  const events = await getFeaturedEvents();

  const paths = events.map(event => ({ params: { eventId: event.id } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export default Event;
