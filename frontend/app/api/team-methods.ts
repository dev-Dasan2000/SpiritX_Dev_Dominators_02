import 'dotenv/config';
import AuthMethods from './auth-methods';

// Helper function to get the access token
const getAccessToken = async () => {
    const retrievedData = await AuthMethods.RefreshToken();
    if (!retrievedData?.accessToken) {
        throw new Error('Failed to refresh token');
    }
    return retrievedData.accessToken;
};

const TeamMethods = {
    // Get all teams
    GetAllTeams: async () => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/teams`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) throw new Error('Failed to get teams');
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Get a specific team by name
    GetTeam: async (teamname: string) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/teams/${teamname}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) throw new Error('Failed to get team');
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Create a new team
    CreateTeam: async (team: any) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/teams`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(team),
            });

            if (!response.ok) throw new Error('Failed to create team');
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Update an existing team
    UpdateTeam: async (team: any) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/teams`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(team),
            });

            if (!response.ok) throw new Error('Failed to update team');
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Delete a team
    DeleteTeam: async (teamname: string, username: string) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/teams/${teamname}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ username }),
            });

            if (!response.ok) throw new Error('Failed to delete team');
            return { success: true };  // Standardized success response
        } catch (error: any) {
            return { error: error.message };
        }
    },
};

export default TeamMethods;
