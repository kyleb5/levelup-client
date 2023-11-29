import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvents } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';

const initialState = {
  description: '',
  date: '',
  time: '',
  organizer: 1,
  game: 0,
};

const EventForm = ({ user }) => {
  const [game, setGames] = useState([]);
  /*
    Since the input fields are bound to the values of
    the properties of this state variable, you need to
    provide some default values.
    */
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    // Fetch game types and update state
    getGames().then((types) => setGames(types));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      description: currentEvent.description,
      organizer: Number(currentEvent.organizer),
      date: currentEvent.date,
      time: currentEvent.time,
      game: currentEvent.game,
      userId: user.uid,
    };

    // Send POST request to your API
    createEvents(event)
      .then(() => {
        // After successful creation, navigate to the games page
        router.push('/events');
      })
      .catch((error) => {
        // Handle error, e.g., show an error message to the user
        console.error('Error creating event:', error);
      });
    console.warn(event);
  };
  console.warn(game);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} placeholder="Enter a Description" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Organizer</Form.Label>
          <Form.Control name="organizer" required value={currentEvent.organizer} onChange={handleChange} placeholder="Enter a Organizer ID" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date EX: 2023-09-21</Form.Label>
          <Form.Control name="date" value={currentEvent.date} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time EX: 15:22</Form.Label>
          <Form.Control name="time" value={currentEvent.time} onChange={handleChange} required />
        </Form.Group>
        <FloatingLabel controlId="floatingSelect" label="GameType">
          <Form.Select aria-label="GameType" name="game" onChange={handleChange} className="mb-3" value={currentEvent.game} required>
            <option value="">Select a GameType</option>
            {game.map((games) => (
              <option key={games.id} value={games.id}>
                {games.title}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventForm;
