'use client';

import React, { useState } from 'react';

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
const userTeams: UserTeam[] = [
  { teamId: "team1", teamName: "Super Tigers", rank: 15, points: 357 },
  { teamId: "team2", teamName: "Royal Challengers", rank: 23, points: 312 },
  { teamId: "team3", teamName: "Mighty Warriors", rank: 8, points: 389 },
];
/*const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/teams`, {
  method: 'GET',
  headers: {
    credentials: 'include',
    'Content-Type': 'application/json',
  }
});
const userTeams: UserTeam[] = await response.json();*/
// Full leaderboard data including all teams
const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, username: 'cricketchamp', teamName: 'Dream Team', points: 456, userId: 'user456' },
  { rank: 2, username: 'fantasy_king', teamName: 'King\'s XI', points: 442, userId: 'user789' },
  { rank: 3, username: 'cricket_wizard', teamName: 'Magic Strikers', points: 435, userId: 'user234' },
  { rank: 4, username: 'team_master', teamName: 'Master Blasters', points: 421, userId: 'user567' },
  { rank: 5, username: 'superplayer', teamName: 'Super Stars', points: 410, userId: 'user890' },
  { rank: 6, username: 'cricket_pro', teamName: 'Pro Legends', points: 398, userId: 'user345' },
  { rank: 7, username: 'fantasy_guru', teamName: 'Guru\'s Warriors', points: 392, userId: 'user678' },
  { rank: 8, username: 'fantasy_fan', teamName: 'Mighty Warriors', points: 389, userId: currentUserId },
  { rank: 9, username: 'bowler_king', teamName: 'Pace Attack', points: 378, userId: 'user901' },
  { rank: 10, username: 'all_rounder', teamName: 'All Stars', points: 370, userId: 'user123' },
  { rank: 15, username: 'fantasy_fan', teamName: 'Super Tigers', points: 357, userId: currentUserId },
  { rank: 23, username: 'fantasy_fan', teamName: 'Royal Challengers', points: 312, userId: currentUserId },
  { rank: 24, username: 'cric_lover', teamName: 'Chennai Kings', points: 305, userId: 'user432' },
  { rank: 30, username: 'game_changer', teamName: 'Game Changers', points: 290, userId: 'user765' },
];

const Leaderboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTeamId, setSelectedTeamId] = useState<string>(userTeams[0].teamId);
  
  // Get the selected team
  const selectedTeam = userTeams.find(team => team.teamId === selectedTeamId) || userTeams[0];
  
  // Get top score from the leaderboard - this doesn't change 
  // when different team is selected
  const topScore = leaderboardData[0].points;

  const filteredLeaderboard = leaderboardData
    .filter((entry) => 
      entry.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
      entry.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.rank - b.rank);

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Leaderboard</h1>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
            <p className="text-3xl font-bold text-blue-700">{selectedTeam.rank}</p>
            <p className="text-gray-500 font-medium mb-3">Team Rank</p>
            <label htmlFor="team-select" className="sr-only">Select Team</label>
            <select 
              id="team-select"
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
          <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
            <p className="text-3xl font-bold text-blue-700">{selectedTeam.points}</p>
            <p className="text-gray-500 font-medium">Team Points</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
            <p className="text-3xl font-bold text-blue-700">{topScore}</p>
            <p className="text-gray-500 font-medium">Top Score</p>
          </div>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by username or team name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none"
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

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="grid grid-cols-4 py-4 px-6 font-bold bg-blue-700 text-white">
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
                    ? 'bg-blue-50 border-l-4 border-blue-700' 
                    : entry.userId === currentUserId
                    ? 'bg-blue-50/30 border-l-4 border-blue-300'
                    : ''
                }`}
              >
                <div
                  className={`font-bold flex items-center ${
                    entry.rank === 1
                      ? 'text-yellow-400'
                      : entry.rank === 2
                      ? 'text-gray-400'
                      : entry.rank === 3
                      ? 'text-yellow-600'
                      : 'text-gray-600'
                  }`}
                >
                  {entry.rank}
                </div>
                <div className="font-medium">{entry.username}</div>
                <div className={`flex flex-row gap-2 font-medium ${entry.userId === currentUserId && entry.teamName === selectedTeam.teamName ? 'font-bold text-blue-700' : ''}`}>
                  {entry.teamName}
                  {entry.rank === 1 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="yellow"
                    stroke="black"
                    stroke-width="1"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  )}
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