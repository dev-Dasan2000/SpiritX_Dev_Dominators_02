import 'dotenv/config';

const AuthMethods = {
    // User login method
    UserLogIn: async (username: string, password: string, rememberMe: boolean) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/loginUser`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, rememberMe }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Admin login method
    AdminLogIn: async (username: string, password: string, rememberMe: boolean) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/loginAdmin`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, rememberMe }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // Refresh token method
    RefreshToken: async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh_token`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            return await response.json();
        } catch (error: any) {
            return { error: error.message };
        }
    },

    // User logout method
    UserLogOut: async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to log out');
            }

            return { success: true };  // Consistent response format
        } catch (error: any) {
            return { error: error.message };
        }
    },
};

export default AuthMethods;
