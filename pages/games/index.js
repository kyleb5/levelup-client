import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import GameCard from '../../components/game/GameCard';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  const updateCards = () => {
    getGames().then((data) => setGames(data));
  };

  return (
    <article className="games">
      <Button
        onClick={() => {
          router.push('/games/new');
        }}
      >
        Register New Game
      </Button>
      <h1>Games</h1>
      {games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} id={game.id} onUpdate={updateCards} />
        </section>
      ))}
    </article>
  );
}

export default Home;
