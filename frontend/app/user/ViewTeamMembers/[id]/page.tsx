'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Player {
  id: number;
  name: string;
  position: string;
}

interface Team {
  id: number;
  name: string;
  players: Player[];
}

// Your 2D array of teams and players
const teamsArray: Team[] = [
  {
    id: 1,
    name: 'Dream Team',
    players: [
      { id: 1, name: 'Virat Kohli', position: 'Batsman' },
      { id: 2, name: 'Rohit Sharma', position: 'Batsman' },
      { id: 3, name: 'KL Rahul', position: 'Batsman' },
      { id: 4, name: 'Rishabh Pant', position: 'Wicket-keeper' },
      { id: 5, name: 'Hardik Pandya', position: 'All-rounder' },
      { id: 6, name: 'Ravindra Jadeja', position: 'All-rounder' },
      { id: 7, name: 'Jasprit Bumrah', position: 'Bowler' },
      { id: 8, name: 'Mohammed Shami', position: 'Bowler' },
      { id: 9, name: 'Yuzvendra Chahal', position: 'Bowler' },
      { id: 10, name: 'Ravichandran Ashwin', position: 'Bowler' },
      { id: 11, name: 'Bhuvneshwar Kumar', position: 'Bowler' }
    ]
  },
  {
    id: 2,
    name: 'Alpha Squad',
    players: [
      { id: 12, name: 'Steve Smith', position: 'Batsman' },
      { id: 13, name: 'David Warner', position: 'Batsman' },
      { id: 14, name: 'Marnus Labuschagne', position: 'Batsman' },
      { id: 15, name: 'Glenn Maxwell', position: 'All-rounder' },
      { id: 16, name: 'Pat Cummins', position: 'Bowler' },
      { id: 17, name: 'Mitchell Starc', position: 'Bowler' },
      { id: 18, name: 'Nathan Lyon', position: 'Bowler' },
      { id: 19, name: 'Alex Carey', position: 'Wicket-keeper' }
    ]
  },
  {
    id: 3,
    name: 'Tech Titans',
    players: [
      { id: 20, name: 'Joe Root', position: 'Batsman' },
      { id: 21, name: 'Ben Stokes', position: 'All-rounder' },
      { id: 22, name: 'Jos Buttler', position: 'Wicket-keeper' },
      { id: 23, name: 'James Anderson', position: 'Bowler' },
      { id: 24, name: 'Stuart Broad', position: 'Bowler' }
    ]
  }
];

export default function ViewTeam() {
  const { id } = useParams();
  const teamId = Number(id);
  
  // Find the team from the 2D array
  const team = teamsArray.find(team => team.id === teamId);
  
  // Initialize players state with the found team's players or empty array
  const [players, setPlayers] = useState<Player[]>([]);
  const [teamName, setTeamName] = useState<string>('');
  
  // Use useEffect to update state when the team is found
  useEffect(() => {
    if (team) {
      setPlayers(team.players);
      setTeamName(team.name);
    }
  }, [teamId, team]);
  
  const removePlayer = (playerId: number) => {
    setPlayers(players.filter((player) => player.id !== playerId));
  };

  const emptySlots = Array(11 - players.length).fill(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-4 px-0">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-2">{teamName}</h1>
        <div className="text-lg text-center text-gray-700 mb-6">Team Status: {players.length}/11 players selected</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {players.map((player) => (
            <div key={player.id} className="bg-blue-600 rounded-lg shadow-md p-4 text-white">
              <div className="font-semibold text-xl mb-2">{player.name}</div>
              <div className="text-yellow-300 mb-4">{player.position}</div>
              <button
                className="mt-auto bg-red-100 text-red-600 py-2 px-4 rounded hover:bg-red-200 transition cursor-pointer w-full flex items-center justify-center"
                onClick={() => removePlayer(player.id)}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove Player
              </button>
            </div>
          ))}

          {emptySlots.map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center h-40 border border-gray-200">
              <div className="text-gray-500 text-sm mb-2">No player assigned</div>
              <div className="bg-yellow-400 text-black rounded-full w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}