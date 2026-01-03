"use client";

import Link from "next/link";
import { AuthUser } from "@/components/store/authstore";
import { Heart, ShoppingCart } from "lucide-react";
import { useWishlistStore } from "@/components/store/Wishlist";
import { useCartStore } from "@/components/store/CartStore";

interface NavLinksProps {
  isAuthenticated: boolean;
  isDev: boolean;
  login: (args: { token: string; user: AuthUser }) => void;
  themeColors: { navLink: string; icon?: string };
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

  const { items } = useCartStore();
  const cartCount = items.reduce((acc, i) => acc + i.qty, 0);

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
          {/* Wishlist with badge like UserMenu */}
          <Link
            href="/wishlist"
            className={themeColors.navLink}
            onClick={onLinkClick}
          >
            <div className="relative">
              <Heart className={themeColors.icon || "w-5 h-5 "} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
          </Link>

          {/* Cart with badge like UserMenu */}
          <Link
            href="/cart"
            className={themeColors.navLink}
            onClick={onLinkClick}
          >
            <div id="cart-icon" className="relative">
              <ShoppingCart className={themeColors.icon || "w-5 h-5"} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
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
