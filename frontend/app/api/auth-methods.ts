import 'dotenv/config';

const AuthMethods = {
    UserLogIn: async (username : string, password : string, rememberMe : boolean) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/auth/loginUser`,{
                method: 'POST',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    body: JSON.stringify({username, password}),
                }
            })
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    },

    AdminLogIn: async (username : string, password : string, rememberMe : boolean) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/auth/loginAdmin`,{
                method: 'POST',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                    body: JSON.stringify({username, password}),
                }
            })
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    },

    RefreshToken: async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/auth/refresh_token`,{
                method: 'GET',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                }
            })
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    },

    UserLogOut: async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/auth/refresh_token`,{
                method: 'DELETE',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json',
                }
            })
            if (!response.ok) {
                throw new Error('Failed to log out');
            }
            return true;
        } catch (error) {
            return error;
        }
    },
}
export default AuthMethods;