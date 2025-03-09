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

const TournamentMethods = {
    // Get all match statistics
    GetAllMatchStatistics: async () => {
        try {
            /*const accessToken = await getAccessToken();*/
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tournament`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    /*Authorization: `Bearer ${accessToken}`,*/
                },
            });

            if (!response.ok) throw new Error('Failed to get match statistics');
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Get specific match statistics by match ID
    GetMatchStatistics: async (matchid: string) => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tournament/${matchid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) throw new Error('Failed to get match statistics');
            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },
};

export default TournamentMethods;
