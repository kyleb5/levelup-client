import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleGame } from '../../../utils/data/gameData';
import GameForm from '../../../components/game/GameForm';

export default function EditEvent() {
  const [editItem, setGameItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then(setGameItem);
  }, [id]);

  return <GameForm obj={editItem} />;
}
