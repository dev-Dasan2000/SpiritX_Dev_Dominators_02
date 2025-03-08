'use client';

import React, { useState } from 'react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  isCurrentUser?: boolean;
}

const initialLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: 'cricketchamp', points: 456 },
  { rank: 2, username: 'fantasy_king', points: 442 },
  { rank: 3, username: 'cricket_wizard', points: 435 },
  { rank: 4, username: 'team_master', points: 421 },
  { rank: 5, username: 'superplayer', points: 410 },
  { rank: 6, username: 'cricket_pro', points: 398 },
  { rank: 7, username: 'fantasy_guru', points: 392 },
  { rank: 8, username: 'hitman', points: 385 },
  { rank: 9, username: 'bowler_king', points: 378 },
  { rank: 10, username: 'all_rounder', points: 370 },
  { rank: 15, username: 'cricket_fan', points: 357, isCurrentUser: true },
];

const Leaderboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredLeaderboard = initialLeaderboard.filter((entry) =>
    entry.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Leaderboard</h1>

        <div className="flex justify-between mb-8">
          <div className="flex-1 bg-white rounded-xl shadow-md p-4 mx-2 text-center">
            <p className="text-2xl font-bold">15</p>
            <p className="text-gray-600">Your Rank</p>
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-md p-4 mx-2 text-center">
            <p className="text-2xl font-bold">357</p>
            <p className="text-gray-600">Your Points</p>
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-md p-4 mx-2 text-center">
            <p className="text-2xl font-bold">456</p>
            <p className="text-gray-600">Top Score</p>
          </div>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
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
            <line x1="21" y1="21" x2="16" y2="16" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-3 py-4 px-6 font-bold bg-gray-200">
            <div>Rank</div>
            <div>Username</div>
            <div className="text-right">Points</div>
          </div>

          {filteredLeaderboard.length > 0 ? (
            filteredLeaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`grid grid-cols-3 py-4 px-6 items-center border-b border-gray-200 ${
                  entry.isCurrentUser ? 'bg-red-50 border-l-4 border-red-500' : ''
                }`}
              >
                <div
                  className={`font-bold ${
                    entry.rank === 1
                      ? 'text-yellow-500'
                      : entry.rank === 2
                      ? 'text-gray-400'
                      : entry.rank === 3
                      ? 'text-orange-500'
                      : 'text-gray-600'
                  }`}
                >
                  {entry.rank}
                </div>
                <div className="font-medium">{entry.username}</div>
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
