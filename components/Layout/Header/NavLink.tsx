"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { useWishlistStore } from "@/components/store/Wishlist";
import { useCartStore } from "@/components/store/CartStore";
import { RefObject } from "react";

interface NavLinksProps {
  isAuthenticated: boolean;
  themeColors: { navLink: string; icon?: string };
  onLinkClick?: () => void;
  cartRef: RefObject<HTMLDivElement | null>;
}

export default function NavLinks({
  isAuthenticated,
  themeColors,
  onLinkClick,
  cartRef,
}: NavLinksProps) {
  const { items:wishlist } = useWishlistStore();
  const wishlistCount = wishlist.length;

  const { items } = useCartStore();
  const cartCount = items.reduce((acc, i) => acc + i.qty, 0);

  return (
    <nav className="flex items-center gap-6">
      {/* Main Links */}
      <Link href="/" className={themeColors.navLink} onClick={onLinkClick}>
        Home
      </Link>
      <Link href="/products" className={themeColors.navLink} onClick={onLinkClick}>
        Products
      </Link>
      <Link href="/contact" className={themeColors.navLink} onClick={onLinkClick}>
        Contact
      </Link>

      {/* Cart */}
      <Link
        href={isAuthenticated ? "/cart" : "/login"}
        className={themeColors.navLink}
        onClick={onLinkClick}
      >
        <div ref={cartRef} className="relative">
          <ShoppingCart className={themeColors.icon || "w-5 h-5"} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </Link>

      {/* Wishlist */}
      {isAuthenticated && (
        <Link href="/wishlist" className={themeColors.navLink} onClick={onLinkClick}>
          <div className="relative">
            <Heart className={themeColors.icon || "w-5 h-5"} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
        </Link>
      )}
    </nav>
  );
}
