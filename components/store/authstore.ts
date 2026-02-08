"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  AuthState,
  AuthUserAPI,
  SignupResponse,
  mapAuthUser,
  Order,
  CartItem,
} from "@/lib/types";

const API_BASE = "http://localhost:8000/api/auth";

export const authstore = create<AuthState>()(
  persist(
    (set, get) => ({
      // ======================
      // STATE
      // ======================
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      cart: [] as CartItem[],

      // ======================
      // ORDERS
      // ======================
      orders: [] as Order[],
      addOrder: (order: Order) => {
        set((state) => ({
          orders: [...state.orders, order],
        }));
      },

      // ======================
      // CART MANAGEMENT
      // ======================
      setCart: (items: CartItem[]) => set({ cart: items }),
      clearCart: () => set({ cart: [] }),

      // ======================
      // SIGNUP
      // ======================
      signup: async (email: string, password: string, displayName?: string) => {
        set({ isLoading: true });
        try {
          const payload: Record<string, string> = { email, password };
          if (displayName) payload.display_name = displayName;

          const res = await fetch(`${API_BASE}/register/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const data: SignupResponse = await res.json();
          if (!res.ok) throw new Error(data?.message || "Signup failed");

          set({
            accessToken: data.access || null,
            refreshToken: data.refresh || null,
            isAuthenticated: !!data.access,
            isLoading: false,
          });

          await get().fetchUser();
          return data;
        } catch (err: any) {
          set({ isLoading: false });
          throw err;
        }
      },

      // ======================
      // LOGIN
      // ======================
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const res = await fetch(`${API_BASE}/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data?.detail || "Login failed");

          set({
            accessToken: data.access,
            refreshToken: data.refresh,
            isAuthenticated: true,
            isLoading: false,
          });

          await get().fetchUser();
        } catch (err: any) {
          set({ isLoading: false });
          throw err;
        }
      },

      // ======================
      // LOGOUT
      // ======================
      logout: () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
          cart: [],
        });
      },

      // ======================
      // REFRESH ACCESS TOKEN
      // ======================
      refreshAccessToken: async () => {
        const refreshToken = get().refreshToken;
        if (!refreshToken) {
          get().logout();
          return null;
        }

        try {
          const res = await fetch(`${API_BASE}/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          const data = await res.json();
          if (!res.ok || !data.access) {
            get().logout();
            return null;
          }

          set({ accessToken: data.access, isAuthenticated: true });
          return data.access;
        } catch {
          get().logout();
          return null;
        }
      },

      // ======================
      // AUTH FETCH HELPER
      // ======================
      authFetch: async (input: RequestInfo, init?: RequestInit) => {
        let token = get().accessToken;

        const doFetch = async () =>
          fetch(input, {
            ...init,
            headers: {
              ...init?.headers,
              Authorization: `Bearer ${token}`,
            },
          });

        let res = await doFetch();

        if (res.status === 401) {
          token = await get().refreshAccessToken();
          if (!token) throw new Error("Unauthorized");
          res = await doFetch();
        }

        return res;
      },

      // ======================
      // FETCH CURRENT USER
      // ======================
      fetchUser: async () => {
        try {
          const token = get().accessToken;
          if (!token) return;

          const res = await get().authFetch(`${API_BASE}/me/`);
          if (!res.ok) throw new Error("Unauthorized");

          const data: AuthUserAPI = await res.json();
          set({ user: mapAuthUser(data), isAuthenticated: true });
        } catch {
          get().logout();
        }
      },

      // ======================
      // UPDATE PROFILE
      // ======================
      updateProfile: async (displayName: string) => {
        set({ isLoading: true });
        try {
          const res = await get().authFetch(`${API_BASE}/update/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ display_name: displayName }),
          });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.detail || "Update failed");
          }

          await get().fetchUser();
        } finally {
          set({ isLoading: false });
        }
      },

      // ======================
      // CHANGE PASSWORD
      // ======================
      changePassword: async (oldPassword: string, newPassword: string) => {
        set({ isLoading: true });
        try {
          const res = await get().authFetch(`${API_BASE}/change-password/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.detail || "Password change failed");
          return data;
        } finally {
          set({ isLoading: false });
        }
      },

      // ======================
      // DELETE ACCOUNT
      // ======================
      deleteAccount: async () => {
        set({ isLoading: true });
        try {
          const res = await get().authFetch(`${API_BASE}/delete/`, { method: "DELETE" });
          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.detail || "Failed to delete account");
          }
          get().logout();
        } finally {
          set({ isLoading: false });
        }
      },

      // ======================
      // FORGOT / RESET PASSWORD
      // ======================
      forgotPassword: async (email: string) => {
        set({ isLoading: true });
        try {
          const res = await fetch(`${API_BASE}/forgot-password/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.detail || "Something went wrong");
          return data.message;
        } finally {
          set({ isLoading: false });
        }
      },

      resetPassword: async (uid: string, token: string, newPassword: string) => {
        set({ isLoading: true });
        try {
          const res = await fetch(`${API_BASE}/reset-password/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid, token, new_password: newPassword }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.detail || "Reset failed");
          return data.message;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state: AuthState) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        orders: state.orders,
        cart: state.cart, // persist cart if needed
      }),
    }
  )
);
