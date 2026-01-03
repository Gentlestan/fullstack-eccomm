"use client";

import Link from "next/link";
import { AuthUser } from "@/components/store/authstore";

interface NavLinksProps {
  isAuthenticated: boolean;
  isDev: boolean;
  login: (args: { token: string; user: AuthUser }) => void;
  themeColors: { navLink: string };
  onLinkClick?: () => void; // optional: to close mobile menu
}

export default function NavLinks({
  isAuthenticated,
  isDev,
  login,
  themeColors,
  onLinkClick,
}: NavLinksProps) {
  const handleDevLogin = () => {
    login({
      token: "fake-token",
      user: { id: "1", email: "test@shop.com", role: "admin" } as AuthUser,
    });
    if (onLinkClick) onLinkClick();
  };

  return (
    <nav className="flex flex-col md:flex-row md:items-center md:gap-6">
      <Link href="/" className={themeColors.navLink} onClick={onLinkClick}>
        Home
      </Link>
      <Link href="/products" className={themeColors.navLink} onClick={onLinkClick}>
        All Products
      </Link>
      <Link href="/contact" className={themeColors.navLink} onClick={onLinkClick}>
        Contact
      </Link>

      {!isAuthenticated && (
        <>
          <Link href="/login" className={themeColors.navLink} onClick={onLinkClick}>
            Login
          </Link>
          <Link href="/signup" className={themeColors.navLink} onClick={onLinkClick}>
            Signup
          </Link>
          <Link href="/forgot-password" className={themeColors.navLink} onClick={onLinkClick}>
            Forgot Password
          </Link>
        </>
      )}

      {/* Dev Login ONLY if not authenticated */}
      {isDev && !isAuthenticated && (
        <button onClick={handleDevLogin} className={themeColors.navLink}>
          Dev Login
        </button>
      )}
    </nav>
  );
}
