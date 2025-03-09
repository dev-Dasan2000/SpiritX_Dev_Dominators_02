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

const MatchesMethods = {
    // Get all matches
    GetAllMatches: async () => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/matches`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: 'include',
            });

            if (!response.ok) throw new Error(`Failed to get matches. Status: ${response.status}`);

            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Get a specific match by ID
    GetMatch: async (matchid: string) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/matches/${matchid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: 'include',
            });

            if (!response.ok) throw new Error(`Failed to get match. Status: ${response.status}`);

            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Create a new match
    CreateMatch: async (match: any) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/matches`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: 'include',
                body: JSON.stringify(match),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create match. Status: ${response.status}. Message: ${errorText}`);
            }

            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Update an existing match
    UpdateMatch: async (match: any) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/matches`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: 'include',
                body: JSON.stringify(match),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update match. Status: ${response.status}. Message: ${errorText}`);
            }

            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Delete a match by ID
    DeleteMatch: async (matchid: string, playerid: string) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/matches/${matchid}?playerId=${playerid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: 'include',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete match. Status: ${response.status}. Message: ${errorText}`);
            }

            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    }
};

export default MatchesMethods;
