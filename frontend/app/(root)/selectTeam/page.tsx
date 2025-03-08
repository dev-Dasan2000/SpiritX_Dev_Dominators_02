"use client"

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Button } from '@/app/components/ui/button';

export default function Home() {
  const [selectedPlayers, setSelectedPlayers] = useState([
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
    },
    {
      id: 'SK',
      name: 'Sunil Kumar',
      university: 'Bangalore University',
      price: 0,
      type: 'All-rounder'
    }
  ]);
  
  const [budget, setBudget] = useState(8500);
  const [activeTab, setActiveTab] = useState('All Players');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const addToTeam = (player: Player) => {
    if (selectedPlayers.length < 11 && !selectedPlayers.some(p => p.id === player.id)) {
      setSelectedPlayers([...selectedPlayers, player]);
      setBudget(budget - player.price);
    }
  };

  const removeFromTeam = (playerId: string) => {
    const player = selectedPlayers.find((p: Player) => p.id === playerId);
    setSelectedPlayers(selectedPlayers.filter((p: Player) => p.id !== playerId));
    if (player) {
      setBudget(budget + player.price);
    }
  };

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All Players' || player.type === activeTab.slice(0, -1);
    return matchesSearch && matchesTab;
  });

  interface Player {
    id: string;
    name: string;
    university: string;
    price: number;
    type: string;
    stats?: PlayerStats;
  }

  const isPlayerSelected = (playerId: string): boolean => {
    return selectedPlayers.some((p: Player) => p.id === playerId);
  };

  interface TabChangeHandler {
    (tab: string): void;
  }

  const handleTabChange: TabChangeHandler = (tab) => {
    setActiveTab(tab);
    if (isMobile) {
      setMenuOpen(false); // Close menu after selecting a tab on mobile
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Fantasy Cricket Team Builder</title>
        <meta name="description" content="Build your fantasy cricket team" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-700">Spirit11</h1>
            
            {/* Mobile Hamburger Menu */}
            {isMobile && (
              <Button 
                onClick={() => setMenuOpen(!menuOpen)} 
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-blue-700" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {menuOpen ? (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  ) : (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 6h16M4 12h16M4 18h16" 
                    />
                  )}
                </svg>
              </Button>
            )}
            
            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="flex flex-row items-center gap-4">
                <div className="bg-gray-100 rounded-md px-4 py-2">
                  <p className="text-gray-700">Team: <span className="font-semibold">{selectedPlayers.length}/11 players selected</span></p>
                </div>
                <div className="bg-gray-100 rounded-md px-4 py-2">
                  <p className="text-gray-700">Remaining Budget: <span className="font-semibold text-blue-700">₹{budget.toLocaleString()}</span></p>
                </div>
              </div>
            )}
          </div>
          
          {/* Mobile Team Info */}
          {isMobile && (
            <div className="mt-3 flex flex-row gap-2">
              <div className="bg-gray-100 rounded-md px-3 py-1 text-sm flex-1">
                <p className="text-gray-700">Team: <span className="font-semibold">{selectedPlayers.length}/11</span></p>
              </div>
              <div className="bg-gray-100 rounded-md px-3 py-1 text-sm flex-1">
                <p className="text-gray-700">Budget: <span className="font-semibold text-blue-700">₹{budget.toLocaleString()}</span></p>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Mobile Menu */}
        {isMobile && menuOpen && (
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

        {/* Desktop Tabs */}
        {!isMobile && (
          <div className="hidden lg:flex overflow-x-auto mb-6 bg-white rounded-lg p-1 shadow-md">
            {['All Players', 'Batsmen', 'Bowlers', 'All-rounders', 'Wicket Keepers'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-3 text-center flex-1 min-w-max rounded-md ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
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
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-blue-600 text-sm font-medium"
            >
              Change Category
            </button>
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
                  <h2 className="text-lg font-semibold">{player.name}</h2>
                  <p className="text-sm text-blue-200">{player.university}</p>
                </div>
                <div className="bg-yellow-400 text-black font-bold px-3 py-1 rounded-full">
                  ₹{player.price.toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {player.type === 'Batsman' || player.type === 'All-rounder' ? (
                  <>
                    <div className="text-center">
                      <p className="text-xl font-bold">{player.stats.runs}</p>
                      <p className="text-xs text-blue-200">Runs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold">{player.stats.average}</p>
                      <p className="text-xs text-blue-200">Average</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold">{player.stats.strikeRate}</p>
                      <p className="text-xs text-blue-200">Strike Rate</p>
                    </div>
                  </>
                ) : null}
                
                {player.type === 'Bowler' ? (
                  <>
                    <div className="text-center">
                      <p className="text-xl font-bold">{player.stats.wickets}</p>
                      <p className="text-xs text-blue-200">Wickets</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold">{player.stats.economy}</p>
                      <p className="text-xs text-blue-200">Economy</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold">{player.stats.runs}</p>
                      <p className="text-xs text-blue-200">Runs</p>
                    </div>
                  </>
                ) : null}
                
                <div className="text-center">
                  <p className="text-xl font-bold">{player.stats.matches}</p>
                  <p className="text-xs text-blue-200">Matches</p>
                </div>
              </div>

              <button
                className={`w-full py-2 rounded-md flex items-center justify-center ${
                  isPlayerSelected(player.id)
                    ? 'bg-red-500 cursor-not-allowed opacity-70'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-black'
                }`}
                onClick={() => {
                  if (!isPlayerSelected(player.id)) {
                    addToTeam(player);
                  }
                }}
                disabled={isPlayerSelected(player.id)}
              >
                {isPlayerSelected(player.id) ? (
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

        {/* Selected Team */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-700">Your Selected Team</h2>
            <p className="text-gray-700 text-sm md:text-base">{selectedPlayers.length}/11 Players</p>
          </div>

          <div className="space-y-3">
            {selectedPlayers.map((player) => (
              <div key={player.id} className="flex items-center justify-between border-b border-gray-200 pb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white mr-2 md:mr-3 flex-shrink-0">
                    {player.id}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium text-sm md:text-base truncate">{player.name}</p>
                    <p className="text-xs md:text-sm text-gray-500 truncate">{player.university}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromTeam(player.id)}
                  className="bg-red-100 hover:bg-red-200 text-red-600 font-medium px-2 md:px-3 py-1 rounded-md text-xs md:text-sm flex items-center flex-shrink-0 ml-2"
                >
                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            ))}
            
            {selectedPlayers.length === 0 && (
              <p className="text-gray-500 text-center py-4">No players selected yet</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}