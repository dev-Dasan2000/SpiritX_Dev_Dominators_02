// pages/tournament-summary.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

export default function TournamentSummary() {
  // Sample tournament data
  const tournamentData = {
    name: "Cricket Championship 2025",
    totalRuns: 4328,
    totalWickets: 187,
    topRunScorer: {
      name: "Virat Kohli",
      team: "Royal Challengers",
      runs: 379,
    
    },
    topWicketTaker: {
      name: "Jasprit Bumrah",
      team: "Mumbai Indians",
      wickets: 21,
      
    },
    matches: [
      {
        id: "M001",
        teams: "Royal Challengers vs Mumbai Indians",
        date: "March 2, 2025",
        result: "Royal Challengers won by 42 runs",
        fifties: 2,
        hundreds: 1,
        topRunScorer: {
          name: "AB de Villiers",
          runs: 118,
          team: "Royal Challengers"
        },
        topWicketTaker: {
          name: "Jasprit Bumrah",
          wickets: 4,
          team: "Mumbai Indians"
        }
      },
      {
        id: "M002",
        teams: "Chennai Super Kings vs Kolkata Knight Riders",
        date: "March 5, 2025",
        result: "Chennai Super Kings won by 6 wickets",
        fifties: 3,
        hundreds: 0,
        topRunScorer: {
          name: "MS Dhoni",
          runs: 87,
          team: "Chennai Super Kings"
        },
        topWicketTaker: {
          name: "Sunil Narine",
          wickets: 3,
          team: "Kolkata Knight Riders"
        }
      },
      {
        id: "M003",
        teams: "Rajasthan Royals vs Delhi Capitals",
        date: "March 7, 2025",
        result: "Delhi Capitals won by 22 runs",
        fifties: 2,
        hundreds: 0,
        topRunScorer: {
          name: "Rishabh Pant",
          runs: 92,
          team: "Delhi Capitals"
        },
        topWicketTaker: {
          name: "Yuzvendra Chahal",
          wickets: 5,
          team: "Rajasthan Royals"
        }
      }
    ]
  };

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
            <p className="text-4xl font-bold">{tournamentData.totalRuns}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Wickets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{tournamentData.totalWickets}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Top Run Scorer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div>
                <p className="font-semibold">{tournamentData.topRunScorer.name}</p>
                <p className="text-sm text-muted-foreground">{tournamentData.topRunScorer.team}</p>
                <p className="text-lg font-bold mt-1">{tournamentData.topRunScorer.runs} runs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Top Wicket Taker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div>
                <p className="font-semibold">{tournamentData.topWicketTaker.name}</p>
                <p className="text-sm text-muted-foreground">{tournamentData.topWicketTaker.team}</p>
                <p className="text-lg font-bold mt-1">{tournamentData.topWicketTaker.wickets} wickets</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Match Summaries Table */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Match Summaries</h2>
        <div className="rounded-md border">
          <Table>
            <TableCaption>Match summary statistics for {tournamentData.name}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Match #</TableHead>
                <TableHead className="w-16 text-center">50s</TableHead>
                <TableHead className="w-16 text-center">100s</TableHead>
                <TableHead>Top Run Scorer</TableHead>
                <TableHead className="w-24 text-center">Runs</TableHead>
                <TableHead>Top Wicket Taker</TableHead>
                <TableHead className="w-24 text-center">Wickets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tournamentData.matches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell className="font-medium">{match.id}</TableCell>
                  <TableCell className="text-center">{match.fifties}</TableCell>
                  <TableCell className="text-center">{match.hundreds}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{match.topRunScorer.name}</p>
                      <p className="text-xs text-muted-foreground">{match.topRunScorer.team}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">{match.topRunScorer.runs}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{match.topWicketTaker.name}</p>
                      <p className="text-xs text-muted-foreground">{match.topWicketTaker.team}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">{match.topWicketTaker.wickets}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}