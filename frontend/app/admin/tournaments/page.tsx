"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import TournamentMethods from "../../api/tournament-methods";

// Define the expected tournament data structure
interface TournamentData {
  highest_runs: number;
  overall_runs: string;
  overall_wickets: string;
  highest_wickets: number;
  highest_run_scorer: string;
  highest_wicket_taker: string;
  total_fifties: string;
  total_centuries: string;
}

export default function TournamentSummary() {
  const [tournamentData, setTournamentData] = useState<TournamentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const response = await TournamentMethods.GetAllMatchStatistics();
        if (response.error) {
          setError(response.error);
        } else {
          setTournamentData(response);
        }
      } catch (err) {
        setError('Failed to fetch tournament data');
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Tournament Summary</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Tournament Summary</h1>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!tournamentData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Tournament Summary</h1>
        <p>No tournament data available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Tournament Summary</h1>
      
      {/* Tournament Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Runs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{tournamentData.overall_runs}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Wickets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{tournamentData.overall_wickets}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Highest Run Scorer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div>
                <p className="font-semibold">{tournamentData.highest_run_scorer}</p>
                <p className="text-lg font-bold mt-1">{tournamentData.highest_runs} runs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Highest Wicket Taker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div>
                <p className="font-semibold">{tournamentData.highest_wicket_taker}</p>
                <p className="text-lg font-bold mt-1">{tournamentData.highest_wickets} wickets</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tournament Statistics Summary */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Tournament Statistics</h2>
        <div className="rounded-md border">
          <Table>
            <TableCaption>Overall tournament statistics</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Total Runs</TableHead>
                <TableHead>Total Wickets</TableHead>
                <TableHead>Total 50s</TableHead>
                <TableHead>Total 100s</TableHead>
                <TableHead>Highest Individual Runs</TableHead>
                <TableHead>Highest Individual Wickets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{tournamentData.overall_runs}</TableCell>
                <TableCell className="font-medium">{tournamentData.overall_wickets}</TableCell>
                <TableCell className="font-medium">{tournamentData.total_fifties}</TableCell>
                <TableCell className="font-medium">{tournamentData.total_centuries}</TableCell>
                <TableCell className="font-medium">{tournamentData.highest_runs} ({tournamentData.highest_run_scorer})</TableCell>
                <TableCell className="font-medium">{tournamentData.highest_wickets} ({tournamentData.highest_wicket_taker})</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
