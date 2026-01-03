"use client";

import Link from "next/link";
import { AuthUser } from "@/components/store/authstore";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/components/store/Wishlist";

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
  const { wishlist } = useWishlistStore();
  const wishlistCount = wishlist.length;

  const handleDevLogin = () => {
    login({
      token: "fake-token",
      user: { id: "1", email: "test@shop.com", role: "admin" } as AuthUser,
    });
    if (onLinkClick) onLinkClick();
  };

  return (
    <nav className="flex flex-col md:flex-row md:items-center md:gap-6">
      {/* Main Links */}
      <Link href="/" className={themeColors.navLink} onClick={onLinkClick}>
        Home
      </Link>
      <Link href="/products" className={themeColors.navLink} onClick={onLinkClick}>
        All Products
      </Link>
      <Link href="/contact" className={themeColors.navLink} onClick={onLinkClick}>
        Contact
      </Link>

      {/* Authenticated-only links */}
      {isAuthenticated && (
        <>
          <Link
            href="/wishlist"
            className={`${themeColors.navLink} flex items-center gap-1`}
            onClick={onLinkClick}
          >
            <Heart className="w-4 h-4 text-red-600" />
            {wishlistCount > 0 && (
              <span className="text-sm font-medium text-red-600">{wishlistCount}</span>
            )}
          </Link>
        </>
      )}

      {/* Guest-only links */}
      {!isAuthenticated && (
        <>
          <Link href="/login" className={themeColors.navLink} onClick={onLinkClick}>
            Login
          </Link>
          <Link href="/signup" className={themeColors.navLink} onClick={onLinkClick}>
            Signup
          </Link>
          <Link
            href="/forgot-password"
            className={themeColors.navLink}
            onClick={onLinkClick}
          >
            Forgot Password
          </Link>
        </>
      )}

      {/* Dev Login */}
      {isDev && !isAuthenticated && (
        <button onClick={handleDevLogin} className={themeColors.navLink}>
          Dev Login
        </button>
      )}
    </nav>
  );
}
