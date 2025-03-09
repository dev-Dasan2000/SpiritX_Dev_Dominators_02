"use client";
import React, { useState } from 'react';
import { Input } from "../../components/ui/input";

const PlayerStatsPage = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  // Sample player data with extended statistics
  const playersList = [
    {
      id: 'RS2023',
      name: 'Rahul Sharma',
      university: 'Delhi University',
      price: 1500,
      type: 'Batsman',
      team: 'Delhi Dragons',
      owner: 'Rajesh Capital',
      stats: {
        matches: 18,
        totalRuns: 892,
        average: 56.2,
        strikeRate: 142.8,
        fifties: 5,
        centuries: 2,
        highScore: 112,
        ballsFaced: 625,
        inningsPlayed: 17,
        wickets: 0,
        oversBowled: 0,
        runsConceded: 0,
        bowlingStrikeRate: 0,
        economyRate: 0
      }
    },
    {
      id: 'AK2023',
      name: 'Ajay Kumar',
      university: 'Mumbai University',
      price: 1400,
      type: 'Bowler',
      team: 'Mumbai Mavericks',
      owner: 'Patel Industries',
      stats: {
        matches: 16,
        totalRuns: 342,
        average: 28.5,
        strikeRate: 110.3,
        fifties: 1,
        centuries: 0,
        highScore: 76,
        ballsFaced: 310,
        inningsPlayed: 14,
        wickets: 32,
        oversBowled: 58.4,
        runsConceded: 418,
        bowlingStrikeRate: 10.9,
        economyRate: 7.2
      }
    },
    {
      id: 'NP2023',
      name: 'Nitin Pratap',
      university: 'Jaipur University',
      price: 1100,
      type: 'Wicket Keeper',
      team: 'Jaipur Jets',
      owner: 'Royal Sports Group',
      stats: {
        matches: 12,
        totalRuns: 450,
        average: 40.5,
        strikeRate: 130.2,
        fifties: 3,
        centuries: 0,
        highScore: 88,
        ballsFaced: 346,
        inningsPlayed: 12,
        wickets: 0,
        oversBowled: 0,
        runsConceded: 0,
        bowlingStrikeRate: 0,
        economyRate: 0
      }
    },
    {
      id: 'VP2023',
      name: 'Vikram Patel',
      university: 'Bangalore University',
      price: 1700,
      type: 'All-rounder',
      team: 'Bangalore Blasters',
      owner: 'Tech Titans Inc.',
      stats: {
        matches: 20,
        totalRuns: 580,
        average: 38.6,
        strikeRate: 136.5,
        fifties: 4,
        centuries: 0,
        highScore: 94,
        ballsFaced: 425,
        inningsPlayed: 19,
        wickets: 25,
        oversBowled: 76.2,
        runsConceded: 524,
        bowlingStrikeRate: 18.3,
        economyRate: 6.9
      }
    }
  ];

  // Handle view player stats
  const handleViewPlayer = (player) => {
    setSelectedPlayer(player);
    setShowOverlay(true);
  };

  // Close overlay
  const closeOverlay = () => {
    setShowOverlay(false);
    setSelectedPlayer(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
        <h1 className="text-md font-bold text-gray-900 md:text-2xl">Player Statistics</h1>

        <div className="w-full md:w-64">
          <Input placeholder="Search players..." className="w-full rounded-full" />
        </div>
      </div>

      {/* Player Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
        {playersList.map((player) => (
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
                </div>
                <div className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-full text-sm">
                  ₹{player.price.toLocaleString()}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xl font-bold">{player.stats.matches}</p>
                  <p className="text-xs text-gray-500">Matches</p>
                </div>
                
                {player.type === 'Batsman' || player.type === 'All-rounder' || player.type === 'Wicket Keeper' ? (
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-xl font-bold">{player.stats.totalRuns}</p>
                    <p className="text-xs text-gray-500">Runs</p>
                  </div>
                ) : (
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-xl font-bold">{player.stats.wickets}</p>
                    <p className="text-xs text-gray-500">Wickets</p>
                  </div>
                )}
              </div>
              
              <div className="text-center mt-4 text-sm">
                <span
                  onClick={() => handleViewPlayer(player)}
                  className="cursor-pointer  text-slate-700 py-2 px-4 rounded-full hover:text-slate-500 transition-colors duration-300"
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
                  <p className="text-xl font-bold">{selectedPlayer.stats.matches}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <h4 className="text-xs text-gray-500">Innings Played</h4>
                  <p className="text-xl font-bold">{selectedPlayer.stats.inningsPlayed}</p>
                </div>
                
                {/* Batting stats */}
                <div className="col-span-2 md:col-span-4 mt-2">
                  <h4 className="text-md font-semibold text-slate-600 border-b pb-1">Batting</h4>
                </div>
                
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <h4 className="text-xs text-gray-500">Total Runs</h4>
                  <p className="text-xl font-bold">{selectedPlayer.stats.totalRuns}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <h4 className="text-xs text-gray-500">Batting Average</h4>
                  <p className="text-xl font-bold">{selectedPlayer.stats.average}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <h4 className="text-xs text-gray-500">Strike Rate</h4>
                  <p className="text-xl font-bold">{selectedPlayer.stats.strikeRate}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <h4 className="text-xs text-gray-500">High Score</h4>
                  <p className="text-xl font-bold">{selectedPlayer.stats.highScore}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <h4 className="text-xs text-gray-500">Balls Faced</h4>
                  <p className="text-xl font-bold">{selectedPlayer.stats.ballsFaced}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <h4 className="text-xs text-gray-500">Fifties</h4>
                  <p className="text-xl font-bold">{selectedPlayer.stats.fifties}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <h4 className="text-xs text-gray-500">Centuries</h4>
                  <p className="text-xl font-bold">{selectedPlayer.stats.centuries}</p>
                </div>
                
                {/* Bowling stats - only show if player is a bowler or all-rounder */}
                {(selectedPlayer.type === 'Bowler' || selectedPlayer.type === 'All-rounder') && (
                  <>
                    <div className="col-span-2 md:col-span-4 mt-4">
                      <h4 className="text-md font-semibold text-slate-600 border-b pb-1">Bowling</h4>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded shadow-sm">
                      <h4 className="text-xs text-gray-500">Wickets</h4>
                      <p className="text-xl font-bold">{selectedPlayer.stats.wickets}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded shadow-sm">
                      <h4 className="text-xs text-gray-500">Overs Bowled</h4>
                      <p className="text-xl font-bold">{selectedPlayer.stats.oversBowled}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded shadow-sm">
                      <h4 className="text-xs text-gray-500">Runs Conceded</h4>
                      <p className="text-xl font-bold">{selectedPlayer.stats.runsConceded}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded shadow-sm">
                      <h4 className="text-xs text-gray-500">Economy Rate</h4>
                      <p className="text-xl font-bold">{selectedPlayer.stats.economyRate}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded shadow-sm">
                      <h4 className="text-xs text-gray-500">Bowling Strike Rate</h4>
                      <p className="text-xl font-bold">{selectedPlayer.stats.bowlingStrikeRate}</p>
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