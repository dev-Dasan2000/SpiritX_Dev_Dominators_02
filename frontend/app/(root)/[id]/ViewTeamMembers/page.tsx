'use client';

import { useState } from 'react';

interface Player {
  id: number;
  name: string;
  position: string;
}

const initialPlayers: Player[] = [
  { id: 1, name: 'Virat Kohli', position: 'Batsman' },
  { id: 2, name: 'Rohit Sharma', position: 'Batsman' },
  { id: 3, name: 'Jasprit Bumrah', position: 'Bowler' },
  { id: 4, name: 'Ravindra Jadeja', position: 'All-Rounder' },
  { id: 5, name: 'KL Rahul', position: 'Wicket Keeper' },
  { id: 6, name: 'R Ashwin', position: 'Bowler' },
  { id: 7, name: 'Hardik Pandya', position: 'All-Rounder' },
];

export default function ViewTeam() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  const removePlayer = (id: number) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const emptySlots = Array.from({ length: 11 - players.length });

  return (
    <div className="container mx-auto w-full p-4">
      <h1 className="text-4xl font-bold text-center text-teal-600 my-auto">Your Team</h1>

      <div className="text-lg text-center my-auto">Team Status: {players.length}/11 players selected</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {players.map((player) => (
          <div key={player.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col border-4 border-teal-500">
            <div className="font-semibold text-xl mb-2">{player.name}</div>
            <div className="text-gray-600 mb-4">{player.position}</div>
            <button
              className="mt-auto bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-600 transition cursor-pointer"
              onClick={() => removePlayer(player.id)}
            >
              Remove Player
            </button>
          </div>
        ))}

        {emptySlots.map((_, index) => (
          <div key={index} className="bg-gradient-to-r from-purple-200 to-blue-300 rounded-lg flex flex-col items-center justify-center h-40">
            <div className="text-gray-700 text-sm mb-2">No player assigned</div>
            <div className="text-4xl text-gray-700">➕</div>
          </div>
        ))}
      </div>

      {players.length < 11 ? (
        <div className="my-auto p-6 bg-gray-100 border border-dashed text-center rounded-lg">
          Complete your team by selecting 11 players to see your total points.
        </div>
      ) : (
        <div className="mt-8 p-6 bg-teal-600 text-white text-center rounded-lg shadow-md">
          <div className="text-2xl">Total Team Points</div>
          <div className="text-4xl font-bold">287</div>
        </div>
      )}
    </div>
  );
}