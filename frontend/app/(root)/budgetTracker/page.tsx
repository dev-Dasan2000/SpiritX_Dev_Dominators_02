'use client';
import Link from "next/link";
import React from "react";
import { Button } from "@/app/components/ui/button";

interface Player {
  name: string;
  position: string;
  cost: number;
}

interface TeamBudget {
  teamName: string;
  totalBudget: number;
  spentAmount: number;
}

const BudgetTracking: React.FC = () => {
  const totalBudget: number = 4000000;
  const spentAmount: number = 1470000;
  const remainingBudget: number = totalBudget - spentAmount;
  const usagePercentage: string = ((spentAmount / totalBudget) * 100).toFixed(1);

  // Multiple team budgets data
  const teamBudgets: TeamBudget[] = [
    { teamName: "Chennai Super Kings", totalBudget: 3500000, spentAmount: 2100000 },
    { teamName: "Mumbai Indians", totalBudget: 4200000, spentAmount: 3800000 },
    { teamName: "Royal Challengers", totalBudget: 3800000, spentAmount: 2500000 }
  ];

  const players: Player[] = [
    { name: "Virat Kohli", position: "Batsman", cost: 350000 },
    { name: "Rohit Sharma", position: "Batsman", cost: 310000 },
    { name: "Jasprit Bumrah", position: "Bowler", cost: 280000 },
    { name: "KL Rahul", position: "Wicket Keeper", cost: 120000 },
    { name: "Hardik Pandya", position: "All-Rounder", cost: 160000 },
    { name: "Ravindra Jadeja", position: "All-Rounder", cost: 140000 },
    { name: "R Ashwin", position: "Bowler", cost: 110000 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-4 md:p-5">
      <div className="w-full m-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-blue-700 mb-3 sm:mb-4 border-b-4 border-blue-200 pb-2">
          Budget Tracker
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 mb-3 sm:mb-4 border-l-4 sm:border-l-8 border-blue-200">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
            <span className="text-base sm:text-lg font-semibold">Remaining Budget</span>
            <span className="text-xl sm:text-2xl font-bold text-blue-700">₹{remainingBudget.toLocaleString()}</span>
          </div>

          <div className="w-full bg-gray-300 rounded-full h-4 sm:h-5 overflow-hidden mb-1 sm:mb-2">
            <div
              className="bg-blue-700 h-4 sm:h-5 rounded-full transition-all"
              style={{ width: `${usagePercentage}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-gray-500 text-sm">
            <span>0</span>
            <span>₹{totalBudget.toLocaleString()}</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between mt-3 gap-2 sm:gap-3">
            <div className="flex-1 bg-gray-100 p-2 sm:p-3 rounded-lg text-center border border-gray-200">
              <p className="text-gray-500 text-sm">Total Budget</p>
              <p className="text-base sm:text-lg font-bold">₹{totalBudget.toLocaleString()}</p>
            </div>

            <div className="flex-1 bg-gray-100 p-2 sm:p-3 rounded-lg text-center border border-gray-200">
              <p className="text-gray-500 text-sm">Spent</p>
              <p className="text-base sm:text-lg font-bold">₹{spentAmount.toLocaleString()}</p>
            </div>

            <div className="flex-1 bg-gray-100 p-2 sm:p-3 rounded-lg text-center border border-gray-200">
              <p className="text-gray-500 text-sm">Usage</p>
              <p className="text-base sm:text-lg font-bold">{usagePercentage}%</p>
            </div>
          </div>
        </div>

        {/* Team Budgets Section */}
        <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 mb-3 sm:mb-4 border-l-4 sm:border-l-8 border-blue-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 border-b border-gray-200 pb-2 text-blue-700">Your Team Budgets</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {teamBudgets.map((team, index) => {
              const teamRemainingBudget = team.totalBudget - team.spentAmount;
              const teamUsagePercentage = ((team.spentAmount / team.totalBudget) * 100).toFixed(1);
              
              return (
                <div key={index} className="bg-gray-100 rounded-lg p-3 border border-gray-200 hover:shadow-md transition">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-blue-700">{team.teamName}</h3>
                    <Link href={`/team/${index}`}>
                      <Button variant="outline" size="sm" className="text-xs bg-white hover:bg-gray-100 border-gray-300 text-blue-700">
                        View
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Budget:</span>
                    <span>₹{team.totalBudget.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Spent:</span>
                    <span>₹{team.spentAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Remaining:</span>
                    <span className="font-medium text-blue-700">₹{teamRemainingBudget.toLocaleString()}</span>
                  </div>
                  
                  <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden mt-2">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        parseFloat(teamUsagePercentage) > 90 
                          ? 'bg-red-500' 
                          : parseFloat(teamUsagePercentage) > 75 
                            ? 'bg-yellow-400' 
                            : 'bg-blue-700'
                      }`}
                      style={{ width: `${teamUsagePercentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-end text-xs text-gray-500 mt-1">
                    <span>{teamUsagePercentage}% used</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 border-l-4 sm:border-l-8 border-blue-200">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-3 border-b border-gray-200 pb-2 gap-2">
            <h2 className="text-lg sm:text-xl font-semibold text-blue-700">Player Cost Breakdown</h2>
            <Link href="/ViewTeam">
              <Button type="submit" className="w-full sm:w-auto bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition cursor-pointer">
                Back to Team
              </Button>
            </Link> 
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-700 text-white">
                  <th className="p-2 text-sm sm:text-base">Player</th>
                  <th className="p-2 text-sm sm:text-base">Position</th>
                  <th className="p-2 text-right text-sm sm:text-base">Cost</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player: Player, index: number) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-100 transition">
                    <td className="p-2 text-sm sm:text-base">{player.name}</td>
                    <td className="p-2 text-gray-500 text-sm sm:text-base">
                      <span className="text-yellow-300 bg-blue-700 px-2 py-1 rounded text-xs font-medium">
                        {player.position}
                      </span>
                    </td>
                    <td className="p-2 text-right font-semibold text-sm sm:text-base">₹{player.cost.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="bg-blue-700 text-white font-bold">
                  <td className="p-2 text-sm sm:text-base" colSpan={2}>Total Amount Spent</td>
                  <td className="p-2 text-right text-yellow-300 text-sm sm:text-base">₹{spentAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracking;