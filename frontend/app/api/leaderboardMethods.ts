import 'dotenv/config';
import AuthMethods from './auth-methods';

// Helper function to get the access token
const getAccessToken = async () => {
    const retrievedData = await AuthMethods.RefreshToken();
    if (retrievedData?.error) throw new Error(retrievedData.error);
    const accessToken = retrievedData.accessToken;
    if (!accessToken) throw new Error('No access token');
    return accessToken;
};

const LeaderBoardMethods = {
    // Get all leaderboards
    GetAllLeaderBoards: async () => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leaderboard`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            if (!response.ok) throw new Error(`Failed to get leaderboards. Status: ${response.status}`);

            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Get a specific leaderboard by teamname and username
    GetLeaderBoard: async (teamname: string, username: string) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leaderboard/${teamname}?username=${username}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to get leaderboard. Status: ${response.status}. Message: ${errorText}`);
            }

            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Create a new leaderboard entry
    CreateLeaderBoard: async (teamname: string, totalpoints: number, username: string) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leaderboard`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ teamname, totalpoints, username }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create leaderboard. Status: ${response.status}. Message: ${errorText}`);
            }

            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Update a leaderboard entry
    UpdateLeaderBoard: async (teamname: string, totalpoints: number, username: string) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leaderboard`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ teamname, totalpoints, username }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update leaderboard. Status: ${response.status}. Message: ${errorText}`);
            }

            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },
};

export default LeaderBoardMethods;
