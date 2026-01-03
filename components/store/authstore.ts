import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "user" | "admin";

export type AuthUser = {
  id: string;
  email: string;
  role: UserRole;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (payload: { token: string; user: AuthUser }) => void;
  logout: () => void;
  hydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      login: ({ token, user }) => {
        set({
          token,
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: async () => {
        try {
          await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
          });
        } catch {}

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      hydrate: async () => {
        try {
          const res = await fetch("/api/auth/me", {
            credentials: "include",
          });

          if (!res.ok) throw new Error("Not authenticated");

          const user = await res.json();

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
