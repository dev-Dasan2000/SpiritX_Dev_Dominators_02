import AuthMethods from "./auth-methods";
import 'dotenv/config';

const BotMethods = {
    GetResponse: async (message: string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (retrievedData.error) {
                throw new Error(retrievedData.error);
            }
            const accessToken = retrievedData.accessToken;
            if (!accessToken) {
                throw new Error('No access token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/bot`, {
                method: 'POST',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    body: JSON.stringify(message),
                }
            })
            if (!response.ok) {
                throw new Error('Failed to get response');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    }
}

export default BotMethods;