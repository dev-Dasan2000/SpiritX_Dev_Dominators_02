'use client';

import React, { useState, useEffect } from 'react';
import AuthMethods from '@/app/api/auth-methods';
import LeaderBoardMethods from '@/app/api/leaderboardMethods';

interface LeaderboardEntry {
  rank: number;
  username: string;
  teamName: string;
  points: number;
  userId: string;
}

interface UserTeam {
  teamId: string;
  teamName: string;
  rank: number;
  points: number;
}

// Sample user and their multiple teams
const currentUserId = "user123";

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userTeams, setUserTeams] = useState<UserTeam[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    attemptAutoLogin();
    getAllLeaderBoards();
  }, []);

  // Mapping the data into the format expected by your leaderboard
  useEffect(() => {
    const teams = leaderboard.map((team, index) => ({
      teamId: team.userId,
      teamName: team.teamName,
      rank: index + 1,
      points: team.points
    }));
    
    setUserTeams(teams); // Set userTeams

    // Set selectedTeamId to the first team's ID after userTeams is populated
    if (teams.length > 0) {
      setSelectedTeamId(teams[0].teamId);
    }
  }, [leaderboard]);

  async function getAllLeaderBoards() {
    const leaderboards = await LeaderBoardMethods.GetAllLeaderBoards();

    // Mapping the data into the format expected by your leaderboard
    const formattedLeaderboard = leaderboards.map((entry: any, index: any) => ({
      rank: index + 1, // Rank based on the position in the array
      username: entry.owner, // Assuming 'owner' is the username
      teamName: entry.teamname, // 'teamname' from the backend
      points: entry.total_points, // 'total_points' from the backend
      userId: `${entry.owner}-${entry.teamname}`, // Unique userId (combining owner and teamname)
    }));

    // Sort the leaderboard by points in descending order
    formattedLeaderboard.sort((a:any, b:any) => b.points - a.points); // Sorting in descending order

    setLeaderboard(formattedLeaderboard); // Update state with formatted leaderboard data
  }

  async function attemptAutoLogin() {
    await AuthMethods.RefreshToken().then((response: any) => {
      console.log(response);
      if (!response.accessToken) {
        window.alert("Session expired. Please log in again.");
        window.location.href = "/";
      }
    });
  }

  // Get the selected team
  const selectedTeam = userTeams.find(team => team.teamId === selectedTeamId) || userTeams[0];
  
  // Safely get the top score from the leaderboard - if leaderboard is empty, return 0
  const topScore = leaderboard.length > 0 ? leaderboard[0].points : 0;

  const filteredLeaderboard = leaderboard
    .filter((entry) => 
      entry.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
      entry.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((entry, index) => ({
      ...entry,
      rank: index + 1, // Recalculate rank after filtering
    })) // Recalculate rank dynamically after filtering

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Leaderboard</h1>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <p className="text-3xl font-bold text-blue-500">{selectedTeam?.rank || 'N/A'}</p>
            <p className="text-gray-600 font-medium mb-3">Team Rank</p>
            <select 
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none bg-white"
            >
              {userTeams.map(team => (
                <option key={team.teamId} value={team.teamId}>
                  {team.teamName}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <p className="text-3xl font-bold text-blue-500">{selectedTeam?.points || 'N/A'}</p>
            <p className="text-gray-600 font-medium">Team Points</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <p className="text-3xl font-bold text-blue-500">{topScore}</p>
            <p className="text-gray-600 font-medium">Top Score</p>
          </div>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by username or team name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none"
            style={{ boxShadow: 'none' }}
          />
          <svg
            className="absolute left-3 top-3 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16" y2="16" strokeWidth="2" />
          </svg>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-4 py-4 px-6 font-bold bg-gray-200">
            <div>Rank</div>
            <div>Username</div>
            <div>Team</div>
            <div className="text-right">Points</div>
          </div>

          {filteredLeaderboard.length > 0 ? (
            filteredLeaderboard.map((entry) => (
              <div
                key={`${entry.userId}-${entry.teamName}`}
                className={`grid grid-cols-4 py-4 px-6 items-center border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 ${
                  entry.userId === currentUserId && entry.teamName === selectedTeam.teamName 
                    ? 'bg-blue-50 border-l-4 border-blue-500' 
                    : entry.userId === currentUserId
                    ? 'bg-blue-50/30 border-l-4 border-blue-300'
                    : ''
                }`}
              >
                <div
                  className={`font-bold flex items-center ${
                    entry.rank === 1
                      ? 'text-yellow-500'
                      : entry.rank === 2
                      ? 'text-gray-400'
                      : entry.rank === 3
                      ? 'text-orange-500'
                      : 'text-gray-600'
                  }`}
                >
                  {entry.rank === 1 && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 00-.894.553L7.382 6H4a1 1 0 000 2h2.382l-1.724 3.447A1 1 0 004 12h12a1 1 0 00.894-1.447L15.618 8H18a1 1 0 100-2h-3.382l-1.724-3.447A1 1 0 0010 2z" clipRule="evenodd" />
                    </svg>
                  )}
                  {entry.rank}
                </div>
                <div className="font-medium">{entry.username}</div>
                <div className={`font-medium ${entry.userId === currentUserId && entry.teamName === selectedTeam.teamName ? 'font-bold text-blue-500' : ''}`}>
                  {entry.teamName}
                </div>
                <div className="text-right font-semibold">{entry.points}</div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">No users match your search.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
