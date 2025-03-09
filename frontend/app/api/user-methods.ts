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

const UserMethods = {
    // Get all users
    GetAllUsers: async () => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) throw new Error('Failed to get users');
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Get a specific user by username
    GetUser: async (username: string) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) throw new Error('Failed to get user');
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Create a new user
    CreateUser: async (username: string, password: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) throw new Error('Failed to create user');
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Update a user's password
    UpdateUser: async (username: string, password: string) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) throw new Error('Failed to update user');
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Delete a user by username
    DeleteUser: async (username: string) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${username}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) throw new Error('Failed to delete user');
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },
};

export default UserMethods;
