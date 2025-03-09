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

const eqMethods = {
    // Get calculations for a specific match and player
    GetCalculations: async (matchid: string, playerid: string) => {
        try {
            // Get the access token
            const accessToken = await getAccessToken();

            // Build the URL with the matchid and playerid as query parameters
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/eq/${matchid}?playerid=${playerid}`;

            // Make the GET request
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Handle response status errors
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to get calculations. Status: ${response.status}. Message: ${errorText}`);
            }

            // Return the parsed response body
            return await response.json();
        } catch (error: any) {
            // Return the error message in case of failure
            return { error: error.message };
        }
    }
};

export default eqMethods;
