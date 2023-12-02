import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteGame } from '../../utils/data/gameData';

// eslint-disable-next-line object-curly-newline
const GameCard = ({ id, title, maker, onUpdate }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${title}?`)) {
      deleteGame(id).then(() => onUpdate());
    }
  };
  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
