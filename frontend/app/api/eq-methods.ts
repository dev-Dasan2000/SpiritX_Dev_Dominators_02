import 'dotenv/config';
import AuthMethods from './auth-methods';

const eqMethods = {
    GetCalculations: async (matchid: string, playerid:string) => {
        try {
            const retrievedData = await AuthMethods.RefreshToken();
            if (!retrievedData.accessToken) {
                throw new Error('Failed to refresh token');
            }
            const response = await fetch(`${process.env.BACKEND_URL}/eq/${matchid}`, {
                method: 'GET',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${retrievedData.accessToken}`,
                    body: JSON.stringify({ playerid })
                }
            })
            if (!response.ok) {
                throw new Error('Failed to get calculations');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    }
}

export default eqMethods;