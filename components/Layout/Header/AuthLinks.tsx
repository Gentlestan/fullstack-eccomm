"use client";

import Link from "next/link";
import { useAuthStore, AuthUser } from "@/components/store/authstore";

interface Props {
  themeColors: { navLink: string };
  isDev: boolean;
}

export default function AuthLinks({ themeColors, isDev }: Props) {
  const { isAuthenticated, login } = useAuthStore();

  const handleDevLogin = () => {
    login({
      token: "fake-token",
      user: { id: "1", email: "test@shop.com", role: "admin" } as AuthUser,
    });
  };

  // Show Sign In / Sign Up **only if not authenticated**
  if (!isAuthenticated) {
    return (
      <>
        <Link href="/login" className={themeColors.navLink}>
          Sign In
        </Link>
        <Link href="/signup" className={themeColors.navLink}>
          Sign Up
        </Link>

        {/* Dev Login button for dev mode */}
        {isDev && (
          <button
            onClick={handleDevLogin}
            className={themeColors.navLink}
          >
            Dev Login
          </button>
        )}
      </>
    );
  }

  // Authenticated users will see UserMenu / Logout instead (handled in Header)
  return null;
}
