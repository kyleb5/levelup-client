import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getEvents(user.uid).then((data) => setEvents(data));
  }, [user.uid]);

  const updateCards = () => {
    getEvents().then((data) => setEvents(data));
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
      <h1>Events</h1>
      {events.map((eventObj) => (
        <section key={`event--${eventObj.id}`} className="event">
          <EventCard description={eventObj.description} date={eventObj.date} time={eventObj.time} id={eventObj.id} onUpdate={updateCards} />
        </section>
      ))}
    </article>
  );
}

export default Home;
