import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, [events]);

  const updateCards = () => {
    getEvents();
  };
  return (
    <article className="events">
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Event
      </Button>
      <h1>Games</h1>
      {events.map((eventObj) => (
        <section key={`event--${eventObj.id}`} className="event">
          <EventCard description={eventObj.description} date={eventObj.date} time={eventObj.time} id={eventObj.id} onUpdate={updateCards} />
        </section>
      ))}
    </article>
  );
}

export default Home;
