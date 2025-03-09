"use client"

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Button } from '@/app/components/ui/button';
import AuthMethods from '@/app/api/auth-methods';
import TeamMethods from '@/app/api/team-methods';
import PlayerMethods from '@/app/api/player-methods';

export default function Home() {
  /* Teams state to manage multiple teams*/
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Dream Team",
      players: [
        {
          id: 'AK',
          name: 'Ajay Kumar',
          university: 'Mumbai University',
          price: 1400,
          type: 'Bowler'
        },
        {
          id: 'RP',
          name: 'Rohit Patel',
          university: 'Pune University',
          price: 0,
          type: 'Batsman'
        }
      ],
      budget: 8500
    },
    {
      id: 2,
      name: "Super XI",
      players: [
        {
          id: 'SK',
          name: 'Sunil Kumar',
          university: 'Bangalore University',
          price: 0,
          type: 'All-rounder'
        }
      ],
      budget: 9000
    }
  ]);
  
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [showTeamSelector, setShowTeamSelector] = useState(false);
  const [activeTab, setActiveTab] = useState('All Players');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [username, setUsername] = useState('');

 

  // Check if viewport is mobile or tablet
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    attemptAutoLogin();
    getAllPlayers();
  }, []);

  useEffect(()=>{
    getAllTeams();
  },[username])
  
  async function attemptAutoLogin(){
    await AuthMethods.RefreshToken().then((response:any)=>{
      console.log(response);
      if(!response.accessToken){
        window.alert("Session expired. Please log in again.");
        window.location.href="/"
      }
      setUsername(response.username);
    });
  }

  async function getAllTeams(){
    await TeamMethods.GetUsersTeam(username).then((response:any)=>{
      console.log(response);
    });
  };

  async function getAllPlayers(){
    await PlayerMethods.GetAllPlayers().then((response:any)=>{
      console.log(response);
    });
  }

  const players = [
    {
      id: 'RS',
      name: 'Rahul Sharma',
      university: 'Delhi University',
      price: 1500,
      type: 'Batsman',
      stats: {
        runs: 892,
        average: 56.2,
        strikeRate: 142.8,
        matches: 18
      }
    },
    {
      id: 'AK',
      name: 'Ajay Kumar',
      university: 'Mumbai University',
      price: 1400,
      type: 'Bowler',
      stats: {
        wickets: 32,
        economy: 7.2,
        runs: 342,
        matches: 16
      }
    },
    {
      id: 'VS',
      name: 'Vikas Singh',
      university: 'Chandigarh University',
      price: 1300,
      type: 'All-rounder',
      stats: {
        runs: 756,
        average: 48.2,
        strikeRate: 138.5,
        matches: 15
      }
    }
  ];

  interface PlayerStats {
    runs?: number;
    average?: number;
    strikeRate?: number;
    matches: number;
    wickets?: number;
    economy?: number;
  }

  interface Player {
    id: string;
    name: string;
    university: string;
    price: number;
    type: string;
    stats?: PlayerStats;
  }

  interface Team {
    id: number;
    name: string;
    players: Player[];
    budget: number;
  }

  // Start team selection process when "Add to Team" is clicked
  const initiateAddToTeam = (player: Player) => {
    // Show teams that don't have 11 members yet
    setShowTeamSelector(true);
    
    // Store the player temporarily
    localStorage.setItem('pendingPlayer', JSON.stringify(player));
  };

  // Add player to the selected team
  const addToTeam = (teamId: number) => {
    const pendingPlayerString = localStorage.getItem('pendingPlayer');
    if (!pendingPlayerString) return;
    
    const player = JSON.parse(pendingPlayerString);
    localStorage.removeItem('pendingPlayer');
    
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        // Check if player already exists in team and if team has less than 11 players
        if (team.players.some(p => p.id === player.id) || team.players.length >= 11) {
          return team;
        }
        
        // Add player and update budget
        return {
          ...team,
          players: [...team.players, player],
          budget: team.budget - player.price
        };
      }
      return team;
    }));
    
    setShowTeamSelector(false);
  };

  const removeFromTeam = (teamId: number, playerId: string) => {
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        const player = team.players.find(p => p.id === playerId);
        
        return {
          ...team,
          players: team.players.filter(p => p.id !== playerId),
          budget: player ? team.budget + player.price : team.budget
        };
      }
      return team;
    }));
  };

 
   

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All Players' || player.type === activeTab.slice(0, -1);
    return matchesSearch && matchesTab;
  });

  const isPlayerInAnyTeam = (playerId: string): boolean => {
    return teams.some(team => team.players.some(p => p.id === playerId));
  };

  interface TabChangeHandler {
    (tab: string): void;
  }

  const handleTabChange: TabChangeHandler = (tab) => {
    setActiveTab(tab);
    if (isMobile) {
      setFilterOpen(false); // Close filter after selecting a tab on mobile
    }
  };

  // Get teams that don't have 11 players yet
  const availableTeams = teams.filter(team => team.players.length < 11);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Fantasy Cricket Team Builder</title>
        <meta name="description" content="Build your fantasy cricket team" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="container mx-auto p-4">
        {/* Team Statistics Summary */}
        <div className="flex flex-row py-4 gap-4 my-auto">
          <div className="flex flex-col items-center justify-center bg-white rounded-lg px-4 py-2 flex-1 border border-gray-200">
            <p className="text-gray-500 text-xs uppercase font-medium">Teams</p>
            <p className="text-gray-900 text-lg font-semibold">{teams.length}</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white rounded-lg px-4 py-2 flex-1 border border-gray-200">
            <p className="text-gray-500 text-xs uppercase font-medium">Total Players</p>
            <p className="text-blue-700 text-lg font-semibold">
              {teams.reduce((total, team) => total + team.players.length, 0)}
            </p>
          </div>
        </div>

        


        {/* Team Selector Modal */}
        {showTeamSelector && (
          <div className="fixed inset-0 flex justify-center items-center bg-transparent  bg-opacity-50 backdrop-blur-md z-50 transition-opacity duration-300">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
              <h2 className="text-xl font-bold text-blue-700 mb-4">Select Team</h2>
              
              {availableTeams.length > 0 ? (
                <div className="space-y-3 mb-4">
                  {availableTeams.map(team => (
                    <button
                      key={team.id}
                      className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 p-3 rounded-lg flex justify-between items-center"
                      onClick={() => addToTeam(team.id)}
                    >
                      <div>
                        <p className="font-medium">{team.name}</p>
                        <p className="text-sm text-gray-500">{team.players.length}/11 players</p>
                      </div>
                      <div className="text-blue-700">₹{team.budget.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500 mb-4">No teams available or all teams are full</p>
              )}
              
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setShowTeamSelector(false);
                    localStorage.removeItem('pendingPlayer');
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Tabs */}
        {!isMobile && (
          <div className="hidden lg:flex overflow-x-auto mb-6 bg-white rounded-lg p-1 shadow-md">
            {['All Players', 'Batsmen', 'Bowlers', 'All-rounders', 'Wicket Keepers'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-3 text-center flex-1 min-w-max rounded-md cursor-pointer ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Current Category Display (Mobile/Tablet) */}
        {isMobile && (
          <div className="lg:hidden mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-blue-700">{activeTab}</h2>
            <button 
              onClick={() => setFilterOpen(!filterOpen)}
              className="text-blue-600 text-sm font-medium flex items-center"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
                />
              </svg>
              Filter Players
            </button>
          </div>
        )}

        {/* Mobile Filter Menu */}
        {isMobile && filterOpen && (
          <div className="lg:hidden bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
            {['All Players', 'Batsmen', 'Bowlers', 'All-rounders', 'Wicket Keepers'].map((tab) => (
              <button
                key={tab}
                className={`w-full px-4 py-3 text-left ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for players..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Player Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {filteredPlayers.map((player) => (
            <div key={player.id} className="bg-blue-700 rounded-lg p-4 text-white shadow-md">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h2 className="text-lg font-semibold">{player.name} - <span className='text-yellow-300'>{player.type}</span></h2>
                  <p className="text-sm text-blue-200">{player.university}</p>
                </div>
                <div className="bg-yellow-400 text-black font-bold px-3 py-1 rounded-full">
                  ₹{player.price.toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {player.stats && player.type === 'Batsman' || player.type === 'All-rounder' ? (
                  <>
                    <div className="text-center">
                      <p className="text-xl font-bold">{player.stats?.runs}</p>
                      <p className="text-xs text-blue-200">Runs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold">{player.stats?.average}</p>
                      <p className="text-xs text-blue-200">Average</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold">{player.stats?.strikeRate}</p>
                      <p className="text-xs text-blue-200">Strike Rate</p>
                    </div>
                  </>
                ) : null}
                
                {player.stats && player.type === 'Bowler' ? (
                  <>
                    <div className="text-center">
                      <p className="text-xl font-bold">{player.stats?.wickets}</p>
                      <p className="text-xs text-blue-200">Wickets</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold">{player.stats?.economy}</p>
                      <p className="text-xs text-blue-200">Economy</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold">{player.stats?.runs}</p>
                      <p className="text-xs text-blue-200">Runs</p>
                    </div>
                  </>
                ) : null}
                
                {player.stats && (
                  <div className="text-center">
                    <p className="text-xl font-bold">{player.stats.matches}</p>
                    <p className="text-xs text-blue-200">Matches</p>
                  </div>
                )}
              </div>

              <button
                className={`w-full py-2 rounded-md flex items-center justify-center ${
                  isPlayerInAnyTeam(player.id)
                    ? 'bg-red-500 cursor-not-allowed opacity-70'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-black cursor-pointer'
                }`}
                onClick={() => {
                  if (!isPlayerInAnyTeam(player.id)) {
                    initiateAddToTeam(player);
                  }
                }}
                disabled={isPlayerInAnyTeam(player.id)}
              >
                {isPlayerInAnyTeam(player.id) ? (
                  <>
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Team
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add to Team
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Teams Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-700 mb-4">Your Teams</h2>
          
          {teams.length === 0 ? (
            <p className="text-gray-500 text-center py-4 bg-white rounded-lg shadow-md">No teams created yet</p>
          ) : (
            <div className="space-y-4">
              {teams.map(team => (
                <div key={team.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-blue-700 text-white p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold">{team.name}</h3>
                      <div className="flex space-x-3">
                        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                          {team.players.length}/11 Players
                        </span>
                        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                          ₹{team.budget.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {team.players.length > 0 ? (
                      <div className="space-y-3">
                        {team.players.map(player => (
                          <div key={player.id} className="flex items-center justify-between border-b border-gray-200 pb-2">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0">
                                {player.id}
                              </div>
                              <div>
                                <p className="font-medium">{player.name}</p>
                                <p className="text-sm text-gray-500">{player.university} - {player.type}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromTeam(team.id, player.id)}
                              className="bg-red-100 hover:bg-red-200 text-red-600 font-medium px-3 py-1 rounded-md text-sm flex items-center"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No players in this team yet</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}