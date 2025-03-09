"use client";

import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { Eye } from "lucide-react";
import { Button } from "../../components/ui/button";

const players = [
  {
    name: "Virat Kohli",
    team: "Royal Challengers",
    role: "Batsman",
    avg: 43.8,
    value: "12.5M",
  },
  {
    name: "Jasprit Bumrah",
    team: "Mumbai Indians",
    role: "Bowler",
    avg: 41.5,
    value: "11.8M",
  },
  {
    name: "Ravindra Jadeja",
    team: "Chennai Super Kings",
    role: "All-rounder",
    avg: 39.4,
    value: "10.9M",
  },
];

export default function PlayersDashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 gap-5 md:gap-0">
        <h1 className="text-md font-bold text-gray-900 md:text-2xl">Dashboard</h1>
        <Input placeholder="Search players..." className="w-44 md:w-64 rounded-full" />
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        {[
          { label: "Total Players", value: 256 },
          { label: "Active Tournaments", value: 8 },
          { label: "Teams", value: 32 },
        ].map((stat, index) => (
          <Card key={index} className="bg-white shadow-md">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-gray-900 items-center justify-center flex md:text-xl">{stat.value}</p>
              <p className="text-gray-500 text-sm items-center justify-center flex md:text-xl">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Top Players Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm md:text-lg font-semibold text-gray-900">Top Performing Players</h2>
          <Button variant="outline">View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse ">
            <thead>
              <tr className="border-b border-gray-300 text-gray-600 text-[12px]  md:text-base">
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
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-[10px] md:text-base ">
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
        </div>
      </div>
    </div>
  );
}
