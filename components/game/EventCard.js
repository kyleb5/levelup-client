import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({
  description, //
  date,
  time,
  skillLevel,
}) => (
  <Card className="text-center">
    <Card.Header>{description}</Card.Header>
    <Card.Body>
      <Card.Title>
        When: {date} At: {time}
      </Card.Title>
    </Card.Body>
    <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
  </Card>
);

EventCard.propTypes = {
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
};

export default EventCard;
