import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvents, updateEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';

const initialState = {
  description: '',
  date: '',
  time: '',
  organizer: 1,
  game: 0,
  id: 0,
};

function EventForm({ obj }) {
  const [game, setGames] = useState([]);
  const [formInput, setFormInput] = useState(initialState);
  /*
    Since the input fields are bound to the values of
    the properties of this state variable, you need to
    provide some default values.
    */
  const router = useRouter();

  useEffect(() => {
    // Fetch event types and update state
    getGames().then((types) => setGames(types));
  }, []);

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateEvent(formInput).then(() => router.push('/events'));
    } else {
      const payload = { ...formInput };
      createEvents(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateEvent(patchPayload).then(() => {
          router.push('/events');
        });
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">
          {obj.id ? 'Update' : 'Add'} {formInput.description}
        </h2>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={formInput.description} onChange={handleChange} placeholder="Enter a Description" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Organizer</Form.Label>
          <Form.Control name="organizer" required value={obj.organizer} onChange={handleChange} placeholder="Enter a Organizer ID" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date EX: 2023-09-21</Form.Label>
          <Form.Control name="date" value={formInput.date} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time EX: 15:22</Form.Label>
          <Form.Control name="time" value={formInput.time} onChange={handleChange} required />
        </Form.Group>
        <FloatingLabel controlId="floatingSelect" label="GameType">
          <Form.Select aria-label="GameType" name="game" onChange={handleChange} className="mb-3" value={formInput.game} required>
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
}

EventForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    organizer: PropTypes.number,
    date: PropTypes.string,
    time: PropTypes.string,
    game: PropTypes.number,
    id: PropTypes.number,
  }),
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;
