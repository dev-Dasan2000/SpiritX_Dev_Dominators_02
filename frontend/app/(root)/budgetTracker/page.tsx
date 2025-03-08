'use client';

import React from "react";

interface Player {
  name: string;
  position: string;
  cost: number;
}

const BudgetTracking: React.FC = () => {
  const totalBudget: number = 4000000;
  const spentAmount: number = 1470000;
  const remainingBudget: number = totalBudget - spentAmount;
  const usagePercentage: string = ((spentAmount / totalBudget) * 100).toFixed(1);

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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8 border-b-4 border-blue-300 pb-4">
          Budget Tracker
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-8 border-blue-300">
          <div className="flex justify-between mb-4">
            <span className="text-lg font-semibold">Remaining Budget</span>
            <span className="text-2xl font-bold text-blue-800">₹{remainingBudget.toLocaleString()}</span>
          </div>

          <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden mb-4">
            <div
              className="bg-gradient-to-r from-blue-300 to-blue-500 h-6 rounded-full transition-all"
              style={{ width: `${usagePercentage}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>0</span>
            <span>₹{totalBudget.toLocaleString()}</span>
          </div>

          <div className="flex justify-between mt-6">
            <div className="flex-1 bg-gray-100 p-4 rounded-lg text-center mx-2 border-2 border-blue-200">
              <p className="text-gray-600">Total Budget</p>
              <p className="text-lg font-bold">₹{totalBudget.toLocaleString()}</p>
            </div>

            <div className="flex-1 bg-gray-100 p-4 rounded-lg text-center mx-2 border-2 border-blue-200">
              <p className="text-gray-600">Spent</p>
              <p className="text-lg font-bold">₹{spentAmount.toLocaleString()}</p>
            </div>

            <div className="flex-1 bg-gray-100 p-4 rounded-lg text-center mx-2 border-2 border-blue-200">
              <p className="text-gray-600">Usage</p>
              <p className="text-lg font-bold">{usagePercentage}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-8 border-blue-300">
          <div className="flex justify-between items-center mb-4 border-b-2 border-blue-200 pb-4">
            <h2 className="text-xl font-semibold">Player Cost Breakdown</h2>
            <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition">
              Back to Team
            </button>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="p-4">Player</th>
                <th className="p-4">Position</th>
                <th className="p-4 text-right">Cost</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player: Player, index: number) => (
                <tr key={index} className="border-t border-blue-100 hover:bg-blue-50 transition">
                  <td className="p-4">{player.name}</td>
                  <td className="p-4 text-gray-600">{player.position}</td>
                  <td className="p-4 text-right font-semibold">₹{player.cost.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="bg-blue-100 font-bold">
                <td className="p-4" colSpan={2}>Total Amount Spent</td>
                <td className="p-4 text-right text-blue-800">₹{spentAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracking;
