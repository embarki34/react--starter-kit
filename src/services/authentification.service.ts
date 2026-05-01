import axiosInstance from "@/lib/axios-instence";
import { useAuthStore } from "@/lib/stor";

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials {
    email: string;
    password: string;
    name: string;
}

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthResponse {
    token: string;
    refreshToken?: string;
    user: User;
}

class AuthService {
    private static instance: AuthService;

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await axiosInstance.post<AuthResponse>("/auth/login", credentials);
        // Store in Zustand (which persists to localStorage)
        useAuthStore.getState().login(
            response.data.user,
            response.data.token,
            response.data.refreshToken
        );
        return response.data;
    }

    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        const response = await axiosInstance.post<AuthResponse>("/auth/register", credentials);
        // Store in Zustand (which persists to localStorage)
        useAuthStore.getState().login(
            response.data.user,
            response.data.token,
            response.data.refreshToken
        );
        return response.data;
    }

    async logout(): Promise<void> {
        try {
            await axiosInstance.post("/auth/logout");
        } finally {
            // Clear Zustand store (which clears localStorage)
            useAuthStore.getState().logout();
        }
    }

    async getCurrentUser(): Promise<AuthResponse["user"] | null> {
        const token = useAuthStore.getState().token;
        if (!token) return null;

        try {
            const response = await axiosInstance.get<AuthResponse["user"]>("/auth/me");
            return response.data;
        } catch {
            return null;
        }
    }

    async refreshToken(): Promise<string | null> {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) return null;

        try {
            const response = await axiosInstance.post<{ token: string; user?: User }>("/auth/refresh", {
                refreshToken,
            });
            // Update Zustand store with new token
            useAuthStore.getState().setToken(response.data.token);
            if (response.data.user) {
                useAuthStore.getState().setUser(response.data.user);
            }
            return response.data.token;
        } catch {
            // Clear Zustand store on refresh failure
            useAuthStore.getState().logout();
            return null;
        }
    }

    isAuthenticated(): boolean {
        return useAuthStore.getState().isAuthenticated;
    }
}

export const authService = AuthService.getInstance();
export default authService;