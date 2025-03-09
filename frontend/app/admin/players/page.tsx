"use client";
import React, { useState, useEffect } from 'react';
import { Input } from "../../components/ui/input";
import PlayerScrMethods from '../../api/playerscr-methods';
import { Button } from '@/components/ui/button';

const Page = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<{ 
    id: string; 
    name: string; 
    university: string; 
    price: number; 
    type: string; 
    stats: { 
      runs?: number; 
      average?: number; 
      strikeRate?: number; 
      matches?: number; 
      wickets?: number; 
      economy?: number; 
    } 
  }[]>([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingPlayerId, setEditingPlayerId] = useState<string>('');
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    university: '',
    price: 0,
    type: '',
    stats: {
      runs: 0,
      average: 0,
      strikeRate: 0,
      matches: 0,
      wickets: 0,
      economy: 0,
    },
  });

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const data = await PlayerScrMethods.GetAllScr();
        if (data.error) {
          setError(data.error);
        } else {
          // Ensure all players have a stats object with required properties
          const processedData = data.map(player => ({
            ...player,
            stats: player.stats || {},
          }));
          setPlayers(processedData);
        }
      } catch (err) {
        setError('Failed to fetch players');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []); // Empty array ensures this runs once on component mount

  // Filter players based on search term
  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    player.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open edit modal for a player
  const handleEditPlayer = (player: any) => {
    setIsEditing(true);
    setEditingPlayerId(player.id);
    setNewPlayer({
      name: player.name,
      university: player.university,
      price: player.price,
      type: player.type,
      stats: {
        runs: player.stats?.runs || 0,
        average: player.stats?.average || 0,
        strikeRate: player.stats?.strikeRate || 0,
        matches: player.stats?.matches || 0,
        wickets: player.stats?.wickets || 0,
        economy: player.stats?.economy || 0,
      },
    });
    setShowModal(true);
  };

  // Delete a player
  const handleDeletePlayer = async (id: string) => {
    try {
      // Assuming there's a delete method in your API
      // await PlayerScrMethods.DeleteScr(id);
      
      // If there's no API method yet, just update the state
      setPlayers(players.filter(player => player.id !== id));
    } catch (err) {
      setError('Failed to delete player');
    }
  };

  // Handle adding or updating player from the modal
  const handleSavePlayer = async () => {
    try {
      if (isEditing) {
        // Update existing player
        // Assuming there's an update method in your API
        // await PlayerScrMethods.UpdateScr(editingPlayerId, {
        //   name: newPlayer.name,
        //   university: newPlayer.university,
        //   price: newPlayer.price,
        //   type: newPlayer.type,
        //   stats: newPlayer.stats
        // });

        // If there's no API method yet, just update the state
        setPlayers(players.map(player => {
          if (player.id === editingPlayerId) {
            return {
              ...player,
              name: newPlayer.name,
              university: newPlayer.university,
              price: newPlayer.price,
              type: newPlayer.type,
              stats: newPlayer.stats
            };
          }
          return player;
        }));
      } else {
        // Add new player
        const playerToAdd = { 
          ...newPlayer, 
          id: `${newPlayer.name.slice(0, 2).toUpperCase()}${Math.random().toString(36).substr(2, 5).toUpperCase()}` 
        };

        // Assuming there's a create method in your API
        // await PlayerScrMethods.CreateScr(playerToAdd);

        // If there's no API method yet, just update the state
        setPlayers([...players, playerToAdd]);
      }
      
      setShowModal(false);
      setIsEditing(false);
      setEditingPlayerId('');
      setNewPlayer({
        name: '',
        university: '',
        price: 0,
        type: '',
        stats: {
          runs: 0,
          average: 0,
          strikeRate: 0,
          matches: 0,
          wickets: 0,
          economy: 0,
        },
      });
    } catch (err) {
      setError(isEditing ? 'Failed to update player' : 'Failed to add player');
    }
  };

  if (error) {
    return (
      <div className="p-6 bg-white min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 bg-white min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-600 mx-auto"></div>
          <p className="mt-4 text-xl">Loading players...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
        <h1 className="text-md font-bold text-gray-900 md:text-2xl">Dashboard</h1>

        <div className='flex flex-col sm:flex-row gap-3 w-full md:w-auto'>
          <div className="w-full sm:w-auto">
            <Input 
              placeholder="Search players..." 
              className="w-full md:w-64 rounded-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setIsEditing(false);
              setNewPlayer({
                name: '',
                university: '',
                price: 0,
                type: '',
                stats: {
                  runs: 0,
                  average: 0,
                  strikeRate: 0,
                  matches: 0,
                  wickets: 0,
                  economy: 0,
                },
              });
              setShowModal(true);
            }}
            className="bg-slate-600 text-white py-2 px-4 rounded-full hover:bg-slate-700 w-full sm:w-auto text-center"
          >
            + Add Player
          </button>
        </div>
      </div>

      {/* Modal for Adding/Editing Player */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-transparent bg-opacity-50 backdrop-blur-md z-50 transition-opacity duration-300">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-slate-700">{isEditing ? 'Edit Player' : 'Add New Player'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-3">
                <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-1">Player Name</label>
                <input
                  id="playerName"
                  type="text"
                  placeholder="Enter player name"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">University</label>
                <input
                  id="university"
                  type="text"
                  placeholder="Enter university name"
                  value={newPlayer.university}
                  onChange={(e) => setNewPlayer({ ...newPlayer, university: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  id="price"
                  type="number"
                  placeholder="Enter player price"
                  value={newPlayer.price}
                  onChange={(e) => setNewPlayer({ ...newPlayer, price: +e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="playerType" className="block text-sm font-medium text-gray-700 mb-1">Player Type</label>
                <select
                  id="playerType"
                  value={newPlayer.type}
                  onChange={(e) => setNewPlayer({ ...newPlayer, type: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
                >
                  <option value="">Select Player Type</option>
                  <option value="Batsman">Batsman</option>
                  <option value="Bowler">Bowler</option>
                  <option value="All-rounder">All-rounder</option>
                  <option value="Wicket Keeper">Wicket Keeper</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="matches" className="block text-sm font-medium text-gray-700 mb-1">Matches Played</label>
                <input
                  id="matches"
                  type="number"
                  placeholder="Enter total matches"
                  value={newPlayer.stats.matches}
                  onChange={(e) => setNewPlayer({ ...newPlayer, stats: { ...newPlayer.stats, matches: +e.target.value } })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            {/* Stats based on player type */}
            <div className="mt-4 mb-2">
              <h3 className="font-medium text-gray-700">Player Statistics</h3>
              <div className="h-px bg-gray-200 w-full my-2"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(newPlayer.type === 'Batsman' || newPlayer.type === 'All-rounder' || newPlayer.type === 'Wicket Keeper') && (
                <>
                  <div>
                    <label htmlFor="runs" className="block text-sm font-medium text-gray-700 mb-1">Runs</label>
                    <input
                      id="runs"
                      type="number"
                      placeholder="Total runs"
                      value={newPlayer.stats.runs}
                      onChange={(e) => setNewPlayer({ ...newPlayer, stats: { ...newPlayer.stats, runs: +e.target.value } })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="average" className="block text-sm font-medium text-gray-700 mb-1">Average</label>
                    <input
                      id="average"
                      type="number"
                      placeholder="Batting average"
                      value={newPlayer.stats.average}
                      onChange={(e) => setNewPlayer({ ...newPlayer, stats: { ...newPlayer.stats, average: +e.target.value } })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="strikeRate" className="block text-sm font-medium text-gray-700 mb-1">Strike Rate</label>
                    <input
                      id="strikeRate"
                      type="number"
                      placeholder="Strike rate"
                      value={newPlayer.stats.strikeRate}
                      onChange={(e) => setNewPlayer({ ...newPlayer, stats: { ...newPlayer.stats, strikeRate: +e.target.value } })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </>
              )}
              
              {(newPlayer.type === 'Bowler' || newPlayer.type === 'All-rounder') && (
                <>
                  <div>
                    <label htmlFor="wickets" className="block text-sm font-medium text-gray-700 mb-1">Wickets</label>
                    <input
                      id="wickets"
                      type="number"
                      placeholder="Total wickets"
                      value={newPlayer.wickets}
                      onChange={(e) => setNewPlayer({ ...newPlayer, stats: { ...newPlayer.stats, wickets: +e.target.value } })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="economy" className="block text-sm font-medium text-gray-700 mb-1">Economy</label>
                    <input
                      id="economy"
                      type="number"
                      placeholder="Bowling economy"
                      value={newPlayer.economy}
                      onChange={(e) => setNewPlayer({ ...newPlayer, stats: { ...newPlayer.stats, economy: +e.target.value } })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </>
              )}
            </div>
            
            <div className="flex justify-between mt-6">
              <button
                onClick={handleSavePlayer}
                className="bg-slate-600 text-white py-2 px-4 rounded-full hover:bg-slate-700"
              >
                {isEditing ? 'Update Player' : 'Add Player'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredPlayers.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">No Players Found</h2>
          <p className="text-gray-500">No players match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {filteredPlayers.map((player) => (
            <div key={player.id} className="bg-gray-300 rounded-lg p-4 text-gray-600 shadow-md">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h2 className="text-lg font-semibold">{player.name}</h2>
                  <p className="text-sm text-gray-500">{player.university}</p>
                </div>
                <div className="bg-slate-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  ₹{player.price.toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold">{player.type}</p>
                  <p className="text-xs text-gray-500">Type</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">{player.matches || 0}</p>
                  <p className="text-xs text-gray-500">Matches</p>
                </div>
              </div>

              {/* Player Specific Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {(player.type === 'Batsman' || player.type === 'All-rounder' || player.type === 'Wicket Keeper') && (
                  <>
                    <div className="text-center">
                      <p className="text-xl font-bold">{player.runs || 0}</p>
                      <p className="text-xs text-gray-500">Runs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold">{player.average || 0}</p>
                      <p className="text-xs text-gray-500">Average</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold">{player.strikeRate || 0}</p>
                      <p className="text-xs text-gray-500">Strike Rate</p>
                    </div>
                  </>
                )}

                {(player.type === 'Bowler' || player.type === 'All-rounder') && (
                  <>
                    <div className="text-center">
                      <p className="text-xl font-bold">{player.wickets || 0}</p>
                      <p className="text-xs text-gray-500">Wickets</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold">{player.economy || 0}</p>
                      <p className="text-xs text-gray-500">Economy</p>
                    </div>
                    {player.type === 'Bowler' && (
                      <div className="text-center">
                        <p className="text-xl font-bold">{player.runs || 0}</p>
                        <p className="text-xs text-gray-500">Runs</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Edit and Delete buttons */}
              <div className="flex justify-center gap-5 mt-5">
                <button
                  onClick={() => handleEditPlayer(player)}
                  className="bg-slate-500 text-white py-1 px-3 rounded-md hover:bg-slate-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePlayer(player.id)}
                  className="bg-gray-500 text-white py-1 px-3 rounded-md hover:bg-gray-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;