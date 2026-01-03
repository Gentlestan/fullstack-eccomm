"use client";

import Link from "next/link";
import { AuthUser } from "@/components/store/authstore";
import ToggleButton from "@/components/icons/ToggleButton"; 
import { useWishlistStore } from "@/components/store/Wishlist";
import { useCartStore } from "@/components/store/CartStore";
import { RefObject } from "react";

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  user?: AuthUser | null;
  isDev: boolean;
  login: (args: { token: string; user: AuthUser }) => void;
  logout: () => void;
  themeColors: { navLink: string };
  cartRef: RefObject<HTMLDivElement | null>; // <-- added
}

export default function MobileMenu({
  menuOpen,
  setMenuOpen,
  isAuthenticated,
  user,
  isDev,
  login,
  logout,
  themeColors,
  cartRef, // <-- receive cartRef
}: MobileMenuProps) {
  const { wishlist } = useWishlistStore();
  const wishlistCount = wishlist.length;

  const { items: cartItems } = useCartStore();
  const cartCount = cartItems.reduce((acc, i) => acc + i.qty, 0);

  if (!menuOpen) return null;

  const handleDevLogin = () => {
    login({ token: "fake-token", user: { id: "1", email: "test@shop.com", role: "admin" } });
    setMenuOpen(false);
  };

  return (
    <div className="md:hidden border-t pt-4 pb-6 flex flex-col gap-3">
      {/* Main Links */}
      <Link href="/" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
        Home
      </Link>
      <Link href="/products" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
        All Products
      </Link>
      <Link href="/categories" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
        Categories
      </Link>
      <Link href="/contact" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
        Contact
      </Link>

      {/* Cart */}
      <Link
        href={isAuthenticated ? "/cart" : "/login"}
        className={themeColors.navLink}
        onClick={() => setMenuOpen(false)}
      >
        <div ref={cartRef} className="relative"> {/* <-- use same ref */}
          Cart ({cartCount})
        </div>
      </Link>

      {/* Wishlist - auth only */}
      {isAuthenticated && (
        <Link
          href="/wishlist"
          className={themeColors.navLink}
          onClick={() => setMenuOpen(false)}
        >
          Wishlist ({wishlistCount})
        </Link>
      )}

      {/* Guest Links */}
      {!isAuthenticated ? (
        <>
          <Link href="/login" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
            Login
          </Link>
          <Link href="/signup" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
            Signup
          </Link>
          <Link href="/forgot-password" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
            Forgot Password
          </Link>

          {isDev && (
            <button
              onClick={handleDevLogin}
              className={`${themeColors.navLink} text-left w-full py-2`}
            >
              Dev Login
            </button>
          )}
        </>
      ) : (
        <>
          {/* Authenticated Links */}
          <Link href="/account" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
            My Account
          </Link>
          <Link href="/orders" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
            Orders
          </Link>
          {user?.role === "admin" && (
            <Link href="/admin" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
              Admin Dashboard
            </Link>
          )}
          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className={`${themeColors.navLink} text-left w-full py-2`}
          >
            Logout
          </button>
        </>
      )}

      {/* Mobile Theme Toggle */}
      <div className="mt-2">
        <ToggleButton />
      </div>
    </div>
  );
}
