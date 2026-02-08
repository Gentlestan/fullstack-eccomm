"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { loginUser, logoutUser, registerUser } from "@/lib/auth";

interface AuthContextType {
  user: string | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // ---------------------
  // HYDRATE FROM STORAGE
  // ---------------------
  useEffect(() => {
    setUser(localStorage.getItem("user"));
    setAccessToken(localStorage.getItem("access"));
  }, []);

  // ---------------------
  // LOGIN
  // ---------------------
  const login = async (email: string, password: string) => {
    const data = await loginUser({ email, password });

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("user", email);

    setUser(email);
    setAccessToken(data.access);
  };

  // ---------------------
  // REGISTER
  // ---------------------
  const register = async (email: string, password: string, displayName?: string) => {
    await registerUser({ email, password, displayName });

    // optional auto-login behavior handled server-side if desired
    localStorage.setItem("user", email);
    setUser(email);
  };

  // ---------------------
  // LOGOUT
  // ---------------------
  const logout = () => {
    logoutUser(); // optional backend call
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ---------------------
// HOOK
// ---------------------
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
