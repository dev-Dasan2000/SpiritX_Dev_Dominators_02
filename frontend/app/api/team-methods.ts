import 'dotenv/config';
import AuthMethods from './auth-methods';

const TeamMethods = {
    GetAllTeams: async () => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (!retrievedData.accessToken) {
                throw new Error('Failed to refresh token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/teams`,{
                method: 'GET',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${retrievedData.accessToken}`
                }
            })
            if (!response.ok) {
                throw new Error('Failed to get teams');
            }
            const data = await response.json();
            return data;
        }
        catch(error) {
            return error;
        }
    },

    GetTeam: async (teamname: string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (!retrievedData.accessToken) {
                throw new Error('Failed to refresh token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/teams/${teamname}`,{
                method: 'GET',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${retrievedData.accessToken}`
                }
            })
            if (!response.ok) {
                throw new Error('Failed to get team');
            }
            const data = await response.json();
            return data;
        }
        catch(error) {
            return error;
        }
    },

    CreateTeam: async (team: any) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (!retrievedData.accessToken) {
                throw new Error('Failed to refresh token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/teams`,{
                method: 'POST',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${retrievedData.accessToken}`,
                    body: JSON.stringify(team)
                }
            })
            if (!response.ok) {
                throw new Error('Failed to create team');
            }
            const data = await response.json();
            return data;
        }
        catch(error) {
            return error;
        }
    },

    UpdateTeam: async (team: any) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (!retrievedData.accessToken) {
                throw new Error('Failed to refresh token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/teams`,{
                method: 'PUT',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${retrievedData.accessToken}`,
                    body: JSON.stringify(team)
                }
            })
            if (!response.ok) {
                throw new Error('Failed to update team');
            }
            const data = await response.json();
            return data;
        }
        catch(error) {
            return error;
        }
    },

    DeleteTeam: async (teamname: string, username: string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (!retrievedData.accessToken) {
                throw new Error('Failed to refresh token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/teams/${teamname}`,{
                method: 'DELETE',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${retrievedData.accessToken}`,
                    body: JSON.stringify({ username })
                }
            })
            if (!response.ok) {
                throw new Error('Failed to delete team');
            }
            return true;
        }
        catch(error) {
            return error;
        }
    }
}