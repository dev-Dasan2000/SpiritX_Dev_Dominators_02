"use client";
import React, { useState, useEffect } from 'react';
import { Input } from "../../components/ui/input";
import PlayerScrMethods from '../../api/playerscr-methods';

const PlayerStatsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const data = await PlayerScrMethods.GetAllScr(); // Fetch player data from the API
        if (data.error) {
          setError(data.error);
        } else {
          setPlayers(data);
        }
      } catch (err) {
        setError('Failed to fetch players');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPlayer = (player: any) => {
    setSelectedPlayer(player);
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setSelectedPlayer(null);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-600 mx-auto"></div>
          <p className="mt-4 text-xl">Loading players...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
        <h1 className="text-md font-bold text-gray-900 md:text-2xl">Player Statistics</h1>
        <div className="w-full md:w-64">
          <Input
            placeholder="Search players..."
            className="w-full rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Player Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
        {filteredPlayers.map((player) => (
          <div key={player.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-slate-600 text-white p-4">
              <h2 className="text-xl font-bold">{player.name}</h2>
              <p className="text-sm opacity-80">{player.type}</p>
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-500">{player.team}</p>
                  <p className="text-xs text-gray-400">{player.university}</p>
                  <div className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-full text-sm">
                  ₹{player.price.toLocaleString()}
                </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xl font-bold">{player.matches}</p>
                  <p className="text-xs text-gray-500">Matches</p>
                </div>
                {player.type === 'Batsman' || player.type === 'All-rounder' || player.type === 'Wicket Keeper' ? (
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-xl font-bold">{player.runs}</p>
                    <p className="text-xs text-gray-500">Runs</p>
                  </div>
                ) : (
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-xl font-bold">{player.wickets}</p>
                    <p className="text-xs text-gray-500">Wickets</p>
                  </div>
                )}
              </div>
              <div className="text-center mt-4 text-sm">
                <span
                  onClick={() => handleViewPlayer(player)}
                  className="cursor-pointer text-slate-700 py-2 px-4 rounded-full hover:text-slate-500 transition-colors duration-300"
                >
                  View Stats
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Player Stats Overlay */}
      {showOverlay && selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Header with close button */}
            <div className="flex justify-between items-center bg-slate-700 text-white p-4 sticky top-0">
              <div>
                <h2 className="text-2xl font-bold">{selectedPlayer.name}</h2>
                <p className="text-sm">{selectedPlayer.type} • {selectedPlayer.team}</p>
              </div>
            </div>
            
            {/* Player basic information */}
            <div className="p-6 border-b">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Player ID</h3>
                  <p className="font-medium">{selectedPlayer.id}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">University</h3>
                  <p className="font-medium">{selectedPlayer.university}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Price</h3>
                  <p className="font-medium">₹{selectedPlayer.price.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Team</h3>
                  <p className="font-medium">{selectedPlayer.team}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Owner</h3>
                  <p className="font-medium">{selectedPlayer.owner}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Player Type</h3>
                  <p className="font-medium">{selectedPlayer.type}</p>
                </div>
              </div>
            </div>
            
            {/* Player detailed statistics */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-700 mb-4">Detailed Statistics</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <h4 className="text-xs text-gray-500">Matches</h4>
                  <p className="text-xl font-bold">{selectedPlayer.matches}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <h4 className="text-xs text-gray-500">Innings Played</h4>
                  <p className="text-xl font-bold">{selectedPlayer.innings_played}</p>
                </div>
                
                {/* Batting stats */}
                <div className="col-span-2 md:col-span-4 mt-2">
                  <h4 className="text-md font-semibold text-slate-600 border-b pb-1">Batting</h4>
                </div>
                
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <h4 className="text-xs text-gray-500">Total Runs</h4>
                  <p className="text-xl font-bold">{selectedPlayer.runs}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <h4 className="text-xs text-gray-500">Batting Average</h4>
                  <p className="text-xl font-bold">{selectedPlayer.average}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <h4 className="text-xs text-gray-500">Strike Rate</h4>
                  <p className="text-xl font-bold">{selectedPlayer.strikerate}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <h4 className="text-xs text-gray-500">High Score</h4>
                  <p className="text-xl font-bold">{selectedPlayer.highscore}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <h4 className="text-xs text-gray-500">Balls Faced</h4>
                  <p className="text-xl font-bold">{selectedPlayer.balls_faced}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <h4 className="text-xs text-gray-500">Fifties</h4>
                  <p className="text-xl font-bold">{selectedPlayer.fifties}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <h4 className="text-xs text-gray-500">Centuries</h4>
                  <p className="text-xl font-bold">{selectedPlayer.centuries}</p>
                </div>
                
                {/* Bowling stats */}
                {(selectedPlayer.type === 'Bowler' || selectedPlayer.type === 'All-rounder') && (
                  <>
                    <div className="col-span-2 md:col-span-4 mt-4">
                      <h4 className="text-md font-semibold text-slate-600 border-b pb-1">Bowling</h4>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded shadow-sm">
                      <h4 className="text-xs text-gray-500">Wickets</h4>
                      <p className="text-xl font-bold">{selectedPlayer.wickets}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded shadow-sm">
                      <h4 className="text-xs text-gray-500">Overs Bowled</h4>
                      <p className="text-xl font-bold">{selectedPlayer.overs_bowled}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded shadow-sm">
                      <h4 className="text-xs text-gray-500">Runs Conceded</h4>
                      <p className="text-xl font-bold">{selectedPlayer.runs_conceded}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded shadow-sm">
                      <h4 className="text-xs text-gray-500">Economy Rate</h4>
                      <p className="text-xl font-bold">{selectedPlayer.economy_rate}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded shadow-sm">
                      <h4 className="text-xs text-gray-500">Bowling Strike Rate</h4>
                      <p className="text-xl font-bold">{selectedPlayer.bowling_strike_rate}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Footer actions */}
            <div className="p-4 border-t bg-gray-50 sticky bottom-0">
              <div className="flex justify-end">
                <button
                  onClick={closeOverlay}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-400 mr-2"
                >
                  Close
                </button>
                {/* Additional actions could go here */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerStatsPage;
