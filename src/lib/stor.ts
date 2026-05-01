import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setRefreshToken: (refreshToken: string | null) => void;
    login: (user: User, token: string, refreshToken?: string) => void;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,

            setUser: (user) => set({ user, isAuthenticated: !!user }),

            setToken: (token) => set({ token }),

            setRefreshToken: (refreshToken) => set({ refreshToken }),

            login: (user, token, refreshToken) =>
                set({
                    user,
                    token,
                    refreshToken: refreshToken || null,
                    isAuthenticated: true,
                }),

            logout: () =>
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    isAuthenticated: false,
                }),

            updateUser: (updatedFields) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updatedFields } : null,
                })),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                token: state.token,
                refreshToken: state.refreshToken,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export default useAuthStore;