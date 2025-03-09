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
    points: 876,
    avg: 43.8,
    form: ["green", "green", "red", "green", "green"],
    value: "12.5M",
  },
  {
    name: "Jasprit Bumrah",
    team: "Mumbai Indians",
    role: "Bowler",
    points: 842,
    avg: 41.5,
    form: ["green", "green", "green", "red", "green"],
    value: "11.8M",
  },
  {
    name: "Ravindra Jadeja",
    team: "Chennai Super Kings",
    role: "All-rounder",
    points: 815,
    avg: 39.4,
    form: ["green", "green", "green", "green", "green"],
    value: "10.9M",
  },
];

export default function PlayersDashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Players</h1>
        <Input placeholder="Search players..." className="w-64" />
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Players", value: 256 },
          { label: "Active Tournaments", value: 8 },
          { label: "Teams", value: 32 },
          { label: "Total Points", value: "42.8K" },
        ].map((stat, index) => (
          <Card key={index} className="bg-white shadow-md">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-gray-500">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Top Players Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Top Performing Players</h2>
          <Button variant="outline">View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300 text-gray-600">
                <th className="py-2">Player</th>
                <th className="py-2">Role</th>
                <th className="py-2">Points</th>
                <th className="py-2">Avg</th>
                <th className="py-2">Form</th>
                <th className="py-2">Value</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index} className="border-b border-gray-200 text-gray-900">
                  <td className="py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                      {player.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <p className="text-sm text-gray-500">{player.team}</p>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-1 text-xs font-semibold bg-gray-200 rounded-full">
                      {player.role}
                    </span>
                  </td>
                  <td className="py-3">{player.points}</td>
                  <td className="py-3">{player.avg}</td>
                  <td className="py-3 flex gap-1">
                    {player.form.map((color, i) => (
                      <span key={i} className={`w-2 h-2 rounded-full bg-${color}-500`}></span>
                    ))}
                  </td>
                  <td className="py-3">{player.value}</td>
                  <td className="py-3">
                    <Button size="icon" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
