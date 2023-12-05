/* eslint-disable implicit-arrow-linebreak */
import { clientCredentials } from '../client';

const getGames = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const getSingleGame = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const createGame = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games`, {
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

const getGameTypes = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/gametypes`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const deleteGame = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateGame = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

// eslint-disable-next-line object-curly-newline
export { getGames, createGame, getGameTypes, deleteGame, updateGame, getSingleGame };
