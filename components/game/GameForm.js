import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
  id: 0,
};

const GameForm = ({ obj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [formInput, setFormInput] = useState(initialState);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const router = useRouter();

  useEffect(() => {
    // Fetch game types and update state
    getGameTypes().then((types) => setGameTypes(types));
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
      updateGame(formInput).then(() => router.push('/games'));
    } else {
      const payload = { ...formInput };
      createGame(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateGame(patchPayload).then(() => {
          router.push('/games');
        });
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={formInput.title} onChange={handleChange} placeholder="Enter Title" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" value={formInput.maker} onChange={handleChange} placeholder="Enter Maker" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="number_of_players" value={formInput.number_of_players} onChange={handleChange} placeholder="Enter Number of Players" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skill_level" value={formInput.skill_level} onChange={handleChange} placeholder="Enter Skill Level" />
        </Form.Group>
        <FloatingLabel controlId="floatingSelect" label="GameType">
          <Form.Select aria-label="GameType" name="game_type" onChange={handleChange} className="mb-3" value={formInput.game_type} required>
            <option value="">Select a GameType</option>
            {gameTypes.map((gametype) => (
              <option key={gametype.id} value={gametype.id}>
                {gametype.label}
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

GameForm.propTypes = {
  obj: PropTypes.shape({
    skillLevel: PropTypes.number,
    numberOfPlayers: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    gameTypeId: PropTypes.number,
    id: PropTypes.number,
  }),
};

GameForm.defaultProps = {
  obj: initialState,
};

export default GameForm;
