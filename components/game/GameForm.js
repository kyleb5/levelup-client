import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes } from '../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};

const GameForm = ({ user }) => {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    // Fetch game types and update state
    getGameTypes().then((types) => setGameTypes(types));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: Number(currentGame.numberOfPlayers),
      skillLevel: Number(currentGame.skillLevel),
      gameType: Number(currentGame.gameTypeId),
      userId: user.uid,
    };

    // Send POST request to your API
    createGame(game)
      .then(() => {
        // After successful creation, navigate to the games page
        router.push('/games');
      })
      .catch((error) => {
        // Handle error, e.g., show an error message to the user
        console.error('Error creating game:', error);
      });
    console.warn(game);
  };

  console.warn(gameTypes);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} placeholder="Enter Title" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" value={currentGame.maker} onChange={handleChange} placeholder="Enter Maker" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" value={currentGame.numberOfPlayers} onChange={handleChange} placeholder="Enter Number of Players" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skillLevel" value={currentGame.skillLevel} onChange={handleChange} placeholder="Enter Skill Level" />
        </Form.Group>
        <FloatingLabel controlId="floatingSelect" label="GameType">
          <Form.Select aria-label="GameType" name="gameTypeId" onChange={handleChange} className="mb-3" value={currentGame.gameTypeId} required>
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
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameForm;
