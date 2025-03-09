import 'dotenv/config';
import AuthMethods from './auth-methods';

const UserMethods = {
    GetAllUsers: async () => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (!retrievedData.accessToken) {
                throw new Error('Failed to refresh token');
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
                method: 'GET',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${retrievedData.accessToken}`
                }
            })
            if (!response.ok) {
                throw new Error('Failed to get users');
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            return error;
        }
    },

    GetUser: async (username: string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (!retrievedData.accessToken) {
                throw new Error('Failed to refresh token');
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${username}`, {
                method: 'GET',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${retrievedData.accessToken}`
                }
            })
            if (!response.ok) {
                throw new Error('Failed to get user');
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            return error;
        }
    },

    CreateUser: async (username: string, password: string) => {
        try {
            console.log(username, password);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            return error;
        }
    },

    UpdateUser: async (username: string, password: string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (!retrievedData.accessToken) {
                throw new Error('Failed to refresh token');
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${username}`, {
                method: 'PUT',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${retrievedData.accessToken}`
                },
                body: JSON.stringify({ password })
            })
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            return error;
        }
    },

    DeleteUser: async (username: string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (!retrievedData.accessToken) {
                throw new Error('Failed to refresh token');
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${username}`, {
                method: 'DELETE',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${retrievedData.accessToken}`
                }
            })
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            return error;
        }
    }
}

export default UserMethods;