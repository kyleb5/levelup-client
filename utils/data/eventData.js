/* eslint-disable implicit-arrow-linebreak */
import { clientCredentials } from '../client';

const getEvents = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: uid,
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const getSingleEvent = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const createEvents = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteEvent = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateEvent = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

// eslint-disable-next-line import/prefer-default-export, object-curly-newline
export { getEvents, createEvents, deleteEvent, updateEvent, getSingleEvent };
