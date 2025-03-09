"use client";

import { useState, useEffect, use } from 'react';
import { useParams } from 'next/navigation';
import AuthMethods from '@/app/api/auth-methods';
import PlayerMethods from '@/app/api/player-methods';
import TeamMethods from '@/app/api/team-methods';

interface Player {
  id: number;
  name: string;
  position: string;
}

interface Team {
  id: number;
  name: string;
  playerIds: number[]; // Array of player IDs for the team
}

export default function ViewTeam() {
  const { id } = useParams();
  const teamId = id?.toString(); // teamId is already a string from `useParams`, this is fine
  const [username, setUsername] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [teamName, setTeamName] = useState<string>('');

  // Function to attempt auto login
  async function attemptAutoLogin() {
    await AuthMethods.RefreshToken().then((response: any) => {
      if (!response.accessToken) {
        window.alert('Session expired. Please log in again.');
        window.location.href = '/';
      }
      setUsername(response.username);
    });
  }

  // Fetch player data by IDs
  async function getPlayersByIds(playerIds: number[]): Promise<Player[]> {
    try {
      // Fetch player data from the database by playerIds
      const playerPromises = playerIds.map((playerId) =>
        PlayerMethods.GetPlayer(playerId.toString()) // Fetch player data by ID
      );
      const playersData = await Promise.all(playerPromises); // Wait for all requests to complete
      return playersData;
    } catch (error) {
      console.error('Error fetching players:', error);
      return [];
    }
  }

  // Fetch team data and its players
  async function getTeam() {
    if (teamId) {
      TeamMethods.GetTeam(teamId,username).then(async (response: any) => {
        if (response?.playerIds) {
          // Get players by their IDs
          const fetchedPlayers = await getPlayersByIds(response.playerIds);
          setPlayers(fetchedPlayers); // Update players state with fetched data
          setTeamName(response.name); // Set team name
        }
      });
    }
  }

  useEffect(() => {
    if (teamId) {
      getTeam(); // Fetch team data and players if a team ID is present
      attemptAutoLogin(); // Try to log in the user automatically
    }
  }, [teamId]);

  // Remove a player from the team
  const removePlayer = (playerId: number) => {
    setPlayers(players.filter((player) => player.id !== playerId));
  };

  // Calculate empty slots
  const emptySlots = Array(11 - players.length).fill(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-2">{teamName}</h1>
        <div className="text-lg text-center text-gray-700 mb-6">
          Team Status: {players.length}/11 players selected
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {players.map((player) => (
            <div key={player.id.toString()} className="bg-blue-700 rounded-lg shadow-md p-4 text-white">
              <div className="font-semibold text-xl mb-2">{player.name}</div>
              <div className="text-yellow-300 mb-4">{player.position}</div>
              <button
                className="mt-auto bg-red-100 text-red-600 py-2 px-4 rounded hover:bg-red-200 transition cursor-pointer w-full flex items-center justify-center"
                onClick={() => removePlayer(player.id)}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Remove Player
              </button>
            </div>
          ))}

          {emptySlots.map((_, index) => (
            <div
              key={index.toString()} // Ensure that the key is a string here too
              className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center h-40 border border-gray-200"
            >
              <div className="text-gray-500 text-sm mb-2">No player assigned</div>
              <div className="bg-yellow-400 text-black rounded-full w-10 h-10 flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
