import 'dotenv/config';
import AuthMethods from './auth-methods';

const MatchesMethods = {
    GetAllMatches: async () => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/matches`, {
                method: 'GET',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (!response.ok) {
                throw new Error('Failed to get matches');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    },
    GetMatch: async (matchid: string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/matches/${matchid}`, {
                method: 'GET',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (!response.ok) {
                throw new Error('Failed to get match');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    },
    CreateMatch: async (match: any) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/matches`, {
                method: 'POST',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(match)
            })
            if (!response.ok) {
                throw new Error('Failed to create match');
            }
        }
        catch (error) {
            return error;
        }
    },

    UpdateMatch: async (match: any) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/matches/`, {
                method: 'PUT',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(match)
            })
            if (!response.ok) {
                throw new Error('Failed to update match');
            }
        }
        catch (error) {
            return error;
        }
    },

    DeleteMatch: async (matchid: string, playerid: string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/matches/${matchid}`, {
                method: 'DELETE',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    body: JSON.stringify({ playerid })
                }
            })
            if (!response.ok) {
                throw new Error('Failed to delete match');
            }
        }
        catch (error) {
            return error;
        }
    }
}

export default MatchesMethods;