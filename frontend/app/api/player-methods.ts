import 'dotenv/config';
import AuthMethods from './auth-methods';

const PlayerMethods = {
    GetAllPlayers: async () => {
        try{
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/players`, {
                method: 'GET',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (!response.ok) {
                throw new Error('Failed to get players');
            }
            const data = await response.json();
            return data;
        }
        catch(error) {
            return error;
        }
    },

    GetPlayer: async (playerid: string) => {
        try{
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/players/${playerid}`, {
                method: 'GET',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (!response.ok) {
                throw new Error('Failed to get player');
            }
            const data = await response.json();
            return data;
        }
        catch(error) {
            return error;
        }
    },

    CreatePlayer: async (player: any) => {
        try{
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/players`, {
                method: 'POST',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    body: JSON.stringify(player)
                }
            })
            if (!response.ok) {
                throw new Error('Failed to create player');
            }
            const data = await response.json();
            return data;
        }
        catch(error) {
            return error;
        }
    },

    UpdatePlayer: async (player: any) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/players`, {
                method: 'PUT',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    body: JSON.stringify(player)
                }
            })
            if (!response.ok) {
                throw new Error('Failed to update player');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    },

    DeletePlayer: async () => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/players`, {
                method: 'DELETE',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (!response.ok) {
                throw new Error('Failed to delete player');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    }
}

export default PlayerMethods;