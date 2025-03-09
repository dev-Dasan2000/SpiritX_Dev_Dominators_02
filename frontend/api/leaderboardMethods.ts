import 'dotenv/config';
import AuthMethods from './auth-methods';

const LeaderBoardMethods = {
    GetAllLeaderBoards: async () => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/leaderboard`, {
                method: 'GET',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (!response.ok) {
                throw new Error('Failed to get leaderboards');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    },

    GetLeaderBoard: async (teamname: string, username: string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/leaderboard/${teamname}`, {
                method: 'GET',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    body: JSON.stringify({ username })
                }
            })
            if (!response.ok) {
                throw new Error('Failed to get leaderboard');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    },

    CreateLeaderBoard: async (teamname: string, totalpoints: number, username: string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/leaderboard`, {
                method: 'POST',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    body: JSON.stringify({ teamname, totalpoints, username })
                }
            })
            if (!response.ok) {
                throw new Error('Failed to create leaderboard');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    },

    UpdateLeaderBoard: async (teamname: string, totalpoints: number, username: string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/leaderboard`, {
                method: 'PUT',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    body: JSON.stringify({ teamname, totalpoints, username })
                }
            })
            if (!response.ok) { 
                throw new Error('Failed to update leaderboard');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    },

    DeleteLeaderBoard: async (teamname: string, username: string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/leaderboard/${teamname}`, {
                method: 'DELETE',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    body: JSON.stringify({ username })
                }
            })
            if (!response.ok) {
                throw new Error('Failed to delete leaderboard');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    }
}

export default LeaderBoardMethods;