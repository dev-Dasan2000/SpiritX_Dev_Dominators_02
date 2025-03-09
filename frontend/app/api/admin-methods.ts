import 'dotenv/config';
import AuthMethods from './auth-methods';


const getAccessToken = async () => {
    const retrievedData = await AuthMethods.RefreshToken();
    if (retrievedData?.error) throw new Error(retrievedData.error);
    const accessToken = retrievedData.accessToken;
    if (!accessToken) throw new Error('No access token');
    return accessToken;
};

const AdminMethods = {
    
    GetAllAdmins: async () => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) throw new Error(`Error ${response.status}: Failed to get admins`);
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    GetAdmin: async (username: string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (!retrievedData || retrievedData.error) {
                throw new Error(retrievedData?.error || 'Failed to refresh token');
            }
            const accessToken = retrievedData.accessToken;
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) throw new Error(`Error ${response.status}: Failed to get admin`);
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    CreateAdmin: async (username: string, password: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) throw new Error(`Error ${response.status}: Failed to create admin`);
            return await response.json();
        } catch (error:any) {
            return { error: error.message };
        }
    },

    UpdateAdmin: async (username: string, password: string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (!retrievedData || retrievedData.error) {
                throw new Error(retrievedData?.error || 'Failed to refresh token');
            }
            const accessToken = retrievedData.accessToken;
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) throw new Error(`Error ${response.status}: Failed to update admin`);
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    DeleteAdmin: async (username: string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (!retrievedData || retrievedData.error) {
                throw new Error(retrievedData?.error || 'Failed to refresh token');
            }
            const accessToken = retrievedData.accessToken;
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/${username}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) throw new Error(`Error ${response.status}: Failed to delete admin`);
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },
};

export default AdminMethods;