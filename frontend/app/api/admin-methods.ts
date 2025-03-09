import 'dotenv/config';
import AuthMethods from './auth-methods';

const AdminMethods = {
    GetAllAdmins: async () => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/admin`,{
                method: 'GET',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`

                }
            })
            if (!response.ok) {
                throw new Error('Failed to get admins');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    },

    GetAdmin: async (username : string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/admin/${username}`,{
                method: 'GET',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`

                }
            })
            if (!response.ok) {
                throw new Error('Failed to get admin');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    },

    CreateAdmin: async (username : string, password : string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/admin`,{
                method: 'POST',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    body: JSON.stringify({username, password}),
                }
            })
            if (!response.ok) {
                throw new Error('Failed to create admin');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    },

    UpdateAdmin: async (username : string, password : string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/admin`,{
                method: 'PUT',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    body: JSON.stringify({username,password}),
                }
            })
            if (!response.ok) {
                throw new Error('Failed to update admin');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    },

    DeleteAdmin: async (username : string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/admin/${username}`,{
                method: 'DELETE',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (!response.ok) {
                throw new Error('Failed to delete admin');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    },
}

export default AdminMethods;