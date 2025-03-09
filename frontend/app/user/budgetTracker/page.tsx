'use client';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import AuthMethods from "../../api/auth-methods";
import TeamMethods from "../../api/team-methods";
import PlayerMethods from "../../api/player-methods";

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
  const [username, setUsername] = useState("");
  const [teamBudgets, setTeamBudgets] = useState<TeamBudget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    attemptAutoLogin();
  }, []);

  async function attemptAutoLogin() {
    try {
      const response: any = await AuthMethods.RefreshToken();
      console.log("Auth Response:", response);

      if (!response.accessToken) {
        alert("Session expired. Please log in again.");
        window.location.href = "/";
        return;
      }

      setUsername(response.username);
      fetchUserTeams(response.username);
    } catch (error) {
      console.error("Auto login failed:", error);
    }
  }

  async function fetchUserTeams(username: string) {
    try {
        const response = await TeamMethods.GetUsersTeam(username);
        console.log("User Teams:", response);

        if (response.error) {
            console.error("Error fetching teams:", response.error);
            return;
        }

        // Map API response to team budget format
        const formattedTeams = response.map((team: any) => ({
            teamName: team.teamname,
            totalBudget: 9000000, // Fixed total budget
            spentAmount: team.spentAmount || 0, // From backend calculation
        }));

        setTeamBudgets(formattedTeams);
    } catch (error) {
        console.error("Error loading user teams:", error);
    } finally {
        setLoading(false);
    }
}


  const totalBudget = 9000000;
  const spentAmount = 0;
  const remainingBudget = totalBudget - spentAmount;
  const usagePercentage = ((spentAmount / totalBudget) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-4 md:p-5">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-blue-700 mb-3 sm:mb-4 border-b-4 border-blue-200 pb-2">
        Budget Tracker
      </h1>

      {/* User Teams Section */}
      <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 mb-3 sm:mb-4 border-l-4 sm:border-l-8 border-blue-200">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 border-b border-gray-200 pb-2 text-blue-700">
          Your Team Budgets
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading teams...</p>
        ) : teamBudgets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {teamBudgets.map((team, index) => {
              const teamRemainingBudget = team.totalBudget - team.spentAmount;
              const teamUsagePercentage = ((team.spentAmount / team.totalBudget) * 100).toFixed(1);

              return (
                <div key={index} className="bg-gray-100 rounded-lg p-3 border border-gray-200 hover:shadow-md transition">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-blue-700">{team.teamName}</h3>
                    
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
        ) : (
          <p className="text-center text-gray-500">No teams found.</p>
        )}
      </div>
    </div>
  );
};

export default BudgetTracking;
