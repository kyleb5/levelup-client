import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteEvent } from '../../utils/data/eventData';

// eslint-disable-next-line object-curly-newline
const EventCard = ({ id, description, date, time, onUpdate }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${description}?`)) {
      deleteEvent(id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{description}</Card.Header>
      <Card.Body>
        <Card.Title>
          When: {date} At: {time}
        </Card.Title>
      </Card.Body>
      <Card.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
