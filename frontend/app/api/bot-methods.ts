import AuthMethods from './auth-methods';
import 'dotenv/config';

// Helper function to get the access token
const getAccessToken = async () => {
    const retrievedData = await AuthMethods.RefreshToken();
    if (retrievedData?.error) throw new Error(retrievedData.error);
    const accessToken = retrievedData.accessToken;
    if (!accessToken) throw new Error('No access token');
    return accessToken;
};

const BotMethods = {
    // Get the bot's response based on the message
    GetResponse: async (message: string) => {
        try {
            // Get the access token
            const accessToken = await getAccessToken();

            // Make the POST request to get the bot's response
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bot`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ message }), // Wrapped `message` in an object
            });

            // Handle response status errors
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to get response. Status: ${response.status}. Message: ${errorText}`);
            }

            // Return the parsed response body
            return await response.json();
        } catch (error: any) {
            // Return the error message in case of failure
            return { error: error.message };
        }
    }
};

export default BotMethods;
