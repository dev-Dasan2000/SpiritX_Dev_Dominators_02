import 'dotenv/config';
import AuthMethods from './auth-methods';

// Helper function to get the access token
const getAccessToken = async () => {
    const retrievedData = await AuthMethods.RefreshToken();
    if (retrievedData?.error) throw new Error(retrievedData.error);
    if (!retrievedData.accessToken) throw new Error('No access token');
    return retrievedData.accessToken;
};

const PlayerMethods = {
    // Get all players
    GetAllPlayers: async () => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/players`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: 'include',
            });

            if (!response.ok) throw new Error(`Failed to get players. Status: ${response.status}`);
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Get a specific player by ID
    GetPlayer: async (playerid: string) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/players/${playerid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: 'include',
            });

            if (!response.ok) throw new Error(`Failed to get player. Status: ${response.status}`);
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Create a new player
    CreatePlayer: async (player: any) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/players`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: 'include',
                body: JSON.stringify(player),
            });

            if (!response.ok) throw new Error(`Failed to create player. Status: ${response.status}`);
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Update an existing player
    UpdatePlayer: async (player: any) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/players`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: 'include',
                body: JSON.stringify(player),
            });

            if (!response.ok) throw new Error(`Failed to update player. Status: ${response.status}`);
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Delete a player by ID
    DeletePlayer: async (playerid: string) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/players/${playerid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: 'include',
            });

            if (!response.ok) throw new Error(`Failed to delete player. Status: ${response.status}`);
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },
};

export default PlayerMethods;