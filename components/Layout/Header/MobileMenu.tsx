"use client";

import Link from "next/link";
import { AuthUser } from "@/lib/types";
import { HeaderTheme } from "@/theme";
import { Heart, ShoppingCart } from "lucide-react";
import { useWishlistStore } from "@/components/store/Wishlist";
import { useCartStore } from "@/components/store/CartStore";
import ToggleButton from "@/components/icons/ToggleButton";

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  user: AuthUser | null;        // user determines login state
  logout: () => void;
  themeColors: HeaderTheme;
}

export default function MobileMenu({
  menuOpen,
  setMenuOpen,
  user,
  logout,
  themeColors,
}: MobileMenuProps) {
  if (!menuOpen) return null;

  const closeMenu = () => setMenuOpen(false);

  const { items: wishlistItems } = useWishlistStore();
  const wishlistCount = wishlistItems.length;

  const { items: cartItems } = useCartStore();
  const cartCount = cartItems.reduce((acc, i) => acc + i.qty, 0);

  const bgClass = themeColors.bg || "bg-white dark:bg-gray-900";
  const textClass = themeColors.text || "text-gray-900 dark:text-white";
  const linkClass =
    themeColors.navLink ||
    `${textClass} block py-2 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-800`;

  const isAuthenticated = !!user;

  return (
    <div
      className={`md:hidden absolute w-full z-50 p-4 space-y-4 shadow-lg ${bgClass} ${textClass}`}
    >
      {/* Main Navigation */}
      <nav className="flex flex-col space-y-2">
        <Link href="/" className={linkClass} onClick={closeMenu}>
          Home
        </Link>
        <Link href="/products" className={linkClass} onClick={closeMenu}>
          Products
        </Link>
        <Link href="/contact" className={linkClass} onClick={closeMenu}>
          Contact
        </Link>
      </nav>

      {/* Theme Toggle */}
      <div className="pt-2 border-t border-gray-300 dark:border-gray-700 flex justify-start">
        <ToggleButton />
      </div>

      {/* Auth Links */}
      {!isAuthenticated && (
        <div className="flex flex-col space-y-2 pt-2 border-t border-gray-300 dark:border-gray-700">
          <Link href="/login" className={linkClass} onClick={closeMenu}>
            Login
          </Link>
          <Link
            href="/signup"
            className={`${linkClass} py-1 rounded-md`}
            onClick={closeMenu}
          >
            Sign Up
          </Link>
        </div>
      )}

      {/* User Menu / Logout */}
      {isAuthenticated && user && (
        <div className="flex flex-col space-y-2 pt-2 border-t border-gray-300 dark:border-gray-700">
          <span className="font-medium">{user.email}</span>
          <button
            className="text-red-600 text-left py-2 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => {
              logout();
              closeMenu();
            }}
          >
            Logout
          </button>
        </div>
      )}

      {/* Wishlist & Cart */}
      {isAuthenticated && (
        <div className="flex flex-col space-y-2 pt-2 border-t border-gray-300 dark:border-gray-700">
          <Link href="/wishlist" className={linkClass} onClick={closeMenu}>
            <div className="relative flex items-center gap-2">
              <Heart className={themeColors.icon || "w-5 h-5"} />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
          </Link>

          <Link href="/cart" className={linkClass} onClick={closeMenu}>
            <div className="relative flex items-center gap-2">
              <ShoppingCart className={themeColors.icon || "w-5 h-5"} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
