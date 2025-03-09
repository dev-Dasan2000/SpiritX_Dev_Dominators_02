"use client";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useState, useEffect } from "react";
import PlayerMethods from "../../api/player-methods";

type Player = {
  name: string;
  team: string;
  role: string;
  avg: number;
  value: string;
};

const PlayersDashboard = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setIsLoading(true);
        const data = await PlayerMethods.GetAllPlayers();
        
        // Check if data is an array and has items
        if (Array.isArray(data)) {
          // Process data to match the required format
          const formattedData = data.map((player: { playername: string; university: string; special: string; price: number }) => ({
            name: player.playername,  // Correct mapping
            team: player.university,  // University represents the team
            role: player.special,     // Correct mapping
            avg: player.price,        // Ensure avg is a number
            value: `${player.price}M`,  // Fixed template literal
          }));

          console.log("Formatted Data:", formattedData);
          setPlayers(formattedData);
        } else {
          console.error("Data is not an array:", data);
          setPlayers([]);
        }
      } catch (error) {
        console.error("Error fetching players:", error);
        setPlayers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 gap-5 md:gap-0">
        <h1 className="text-md font-bold text-gray-900 md:text-2xl">Dashboard</h1>
        <Input placeholder="Search players..." className="w-44 md:w-64 rounded-full" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        {[{ label: "Total Players", value: players.length || 0 }, { label: "Active Tournaments", value: 1 }, { label: "Teams", value: 32 }].map(
          (stat, index) => (
            <Card key={index} className="bg-white shadow-md">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-gray-900 items-center justify-center flex md:text-xl">{stat.value}</p>
                <p className="text-gray-500 text-sm items-center justify-center flex md:text-xl">{stat.label}</p>
              </CardContent>
            </Card>
          )
        )}
      </div>

      {/* Top Players Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm md:text-lg font-semibold text-gray-900">Top Performing Players</h2>
          <Button variant="outline">View All</Button>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <p className="text-center py-4">Loading players...</p>
          ) : players.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-300 text-gray-600 text-[12px] md:text-base">
                  <th className="py-2">Player</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Avg</th>
                  <th className="py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key={index} className="border-b border-gray-200 text-gray-900">
                    <td className="py-3 flex items-center gap-3">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-[10px] md:text-base">
                        {player.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-sm md:text-base">{player.name}</p>
                        <p className="text-[10px] md:text-sm text-gray-500">{player.team}</p>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-1 text-[8px] md:text-xs font-semibold bg-gray-200 rounded-full">
                        {player.role}
                      </span>
                    </td>
                    <td className="py-3 text-[10px] md:text-base">{player.avg}</td>
                    <td className="py-3 text-[10px] md:text-base">{player.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4">No players available. Add players to see them here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayersDashboard;
