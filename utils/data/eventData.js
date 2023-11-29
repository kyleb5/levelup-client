/* eslint-disable implicit-arrow-linebreak */
import { clientCredentials } from '../client';

const getEvents = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events`)
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

// eslint-disable-next-line import/prefer-default-export
export { getEvents, createEvents };
