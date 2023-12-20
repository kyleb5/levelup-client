/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';

const EventCard = ({ id, description, date, time, joined, onUpdate }) => {
  const [isJoined, setIsJoined] = useState(joined);

  const handleDelete = () => {
    if (window.confirm(`Delete ${description}?`)) {
      deleteEvent(id).then(() => onUpdate());
    }
  };

  const handleJoinLeave = () => {
    if (isJoined) {
      leaveEvent(id).then(() => {
        onUpdate();
        setIsJoined(false);
      });
    } else {
      joinEvent(id).then(() => {
        onUpdate();
        setIsJoined(true);
      });
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
        <Button variant="primary">
          <Link href={`/events/edit/${id}`} passHref>
            Update
          </Link>
        </Button>
        <Button variant={isJoined ? 'danger' : 'success'} onClick={handleJoinLeave}>
          {isJoined ? 'Leave' : 'Join'}
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
  joined: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
