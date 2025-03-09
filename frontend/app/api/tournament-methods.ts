import 'dotenv/config';
import AuthMethods from './auth-methods';

const TournamentMethods = {
    GetAllMatchStatistics: async () => {
        try{
            const retrievedData = await AuthMethods.RefreshToken();
            if (!retrievedData.accessToken) {
                throw new Error('Failed to refresh token');
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tournament`,{
                method: 'GET',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${retrievedData.accessToken}`
                }
            })
            if (!response.ok) {
                throw new Error('Failed to get match statistics');
            }
            const data = await response.json();
            return data;
        }
        catch(error){
            return error;
        }
    },

    GetMatchStatistics: async (matchid: string) => {
        try{
            const retrievedData = await AuthMethods.RefreshToken();
            if (!retrievedData.accessToken) {
                throw new Error('Failed to refresh token');
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tournament/${matchid}`,{
                method: 'GET',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${retrievedData.accessToken}`
                }
            })
            if (!response.ok) {
                throw new Error('Failed to get match statistics');
            }
            const data = await response.json();
            return data;
        }
        catch(error){
            return error;
        }
    }
}

export default TournamentMethods;