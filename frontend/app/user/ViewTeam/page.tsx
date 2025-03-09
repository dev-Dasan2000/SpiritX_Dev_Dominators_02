'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Plus, ChevronRight, AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import AuthMethods from '@/app/api/auth-methods';
import TeamMethods from '@/app/api/team-methods';

interface Team {
  id: string;
  name: string;
  owner: string; // assuming owner is part of the data
  memberCount: number;
  color: string;
}

const MAX_TEAM_MEMBERS = 11;

export default function TeamManagement() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  async function fetchTeams() {
    try {
      const data = await TeamMethods.GetAllTeams();
      
      // Transform the data into the format your component expects
      const transformedTeams = data.map((team: any) => {
        // Count the number of non-null `memid_X` values for memberCount
        const memberCount = Object.keys(team)
          .filter(key => key.startsWith('memid_') && team[key] !== null)
          .length;
  
        return {
          id: team.teamname, // Or generate an id if necessary
          name: team.teamname,
          owner: team.owner,
          memberCount,
          color: 'bg-blue-700', // Default color, adjust as needed
        };
      });
  
      setTeams(transformedTeams);
      console.log(transformedTeams);
    } catch (err) {
      setError('Failed to fetch teams.');
    }
  }
  

  const handleCreateTeam = () => {
    if (newTeamName.trim()) {
      const newTeam: Team = {
        id: Date.now().toString(),
        name: newTeamName,
        memberCount: 0,
        color: 'bg-blue-700',
        owner: '', // Assuming owner will be set later
      };

      setTeams([...teams, newTeam]);
      setNewTeamName('');
      setShowCreateModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white text-gray-700 py-6 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">Team Management</h1>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md transition-colors"
          >
            <Plus size={20} />
            <span>Create Team</span>
          </button>
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto p-6 text-red-500 bg-red-100 rounded-md">
          <p>{error}</p>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-4 flex items-center gap-2 bg-blue-200 text-blue-700 p-3 rounded-md">
          <AlertCircle size={18} />
          <p>Teams can have a maximum of {MAX_TEAM_MEMBERS} members.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team Cards */}
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} maxMembers={MAX_TEAM_MEMBERS} />
            ))}
            
            {/* Create New Team Card */}
            <div 
              onClick={() => setShowCreateModal(true)}
              className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="bg-gray-100 p-4 rounded-full">
                <Plus size={30} className="text-blue-700" />
              </div>
              <p className="mt-4 text-gray-500 font-medium">Create New Team</p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Create Team Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Create New Team</h2>
            <div className="mb-4">
              <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-1">
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
                placeholder="Enter team name"
              />
            </div>
            <div className="text-sm text-gray-500 mb-4">
              <p>Each team can have up to {MAX_TEAM_MEMBERS} members.</p>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateTeam}
                className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Create Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Team Card Component
function TeamCard({ team, maxMembers }: { team: Team; maxMembers: number }) {
  const isFull = team.memberCount >= maxMembers;
  
  return (
    <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
      {/* Card Header with Team Name */}
      <div className={`${team.color} py-4 px-5 flex flex-row justify-between`}>
        <h2 className="text-xl font-bold text-white">{team.name}</h2>
        <Link href={`/user/ViewTeamMembers/${team.id}`}>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            View
          </button>
        </Link>
      </div>
      
      {/* Card Content */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-3 rounded-full">
              <User size={22} className="text-blue-700" />
            </div>
            <span className="text-lg text-blue-700">{team.memberCount} Members</span>
          </div>
          
          {/* Member count indicator */}
          <div className="text-sm font-medium">
            {isFull ? (
              <span className="text-red-500">Full</span>
            ) : (
              <span className="text-gray-500">{team.memberCount}/{maxMembers}</span>
            )}
          </div>
        </div>
        
        {/* Progress bar for member count */}
        <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${isFull ? 'bg-red-500' : 'bg-blue-700'}`} 
            style={{ width: `${(team.memberCount / maxMembers) * 100}%` }}
          ></div>
        </div>
        
        {/* Add Members Button */}
        <Link href={`/user/selectTeam`} passHref>
          <div className={`mt-6 flex items-center justify-between ${
            isFull 
              ? 'bg-gray-100 cursor-not-allowed' 
              : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
            } transition-colors py-3 px-5 rounded-md`}>
            <div className="flex items-center gap-3">
              <div className={`${isFull ? 'bg-gray-200' : 'bg-white'} p-1 rounded-full border ${isFull ? 'border-gray-400' : 'border-blue-700'}`}>
                <Plus size={16} className={isFull ? 'text-gray-400' : 'text-blue-700'} />
              </div>
              <span className={`font-medium ${isFull ? 'text-gray-400' : 'text-blue-700'}`}>
                {isFull ? 'Team Full' : 'Add Members'}
              </span>
            </div>
            {!isFull && <ChevronRight size={18} className="text-blue-700" />}
          </div>
        </Link>
      </div>
    </div>
  );
}
