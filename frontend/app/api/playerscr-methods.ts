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

const PlayerScrMethods = {
    GetAllScr: async () => {
        try{
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                //throw new Error('No access token');
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/scr`, {
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
    }
};
export default PlayerScrMethods;
