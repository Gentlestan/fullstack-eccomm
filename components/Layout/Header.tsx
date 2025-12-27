"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import BarsIcon from "@/components/icons/Bars";
import SearchIcon from "@/components/icons/SearchIcon";
import ToggleButton from "@/components/icons/ToggleButton";
import { useCartStore } from "../store/CartStore";
import { ShoppingCart, Heart } from "lucide-react";
import { colors, ThemeKey } from "@/theme";
import { useWishlistStore } from "../store/Wishlist";

export default function Header() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const cartRef = useRef<HTMLAnchorElement>(null);

  // Cart Count
  const itemCount = useCartStore((s) => s.itemCount);

  // Wishlist Count
  const wishlistCount = useWishlistStore((s) => s.wishlist.length);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.header[themeKey];

  const linkClass = menuOpen
    ? "text-gray-900 dark:text-white hover:underline"
    : themeColors.navLink;

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${themeColors.bg} ${themeColors.text} ${themeColors.shadow}`}
    >
      <div className="mx-auto max-w-6xl px-8">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link href="/" className="text-xl font-semibold">
            Ecommerce
          </Link>

          {/* Desktop + Mobile Nav */}
          <nav
            className={`gap-6 md:flex items-center ${
              menuOpen
                ? "flex flex-col absolute top-full left-0 w-full bg-white dark:bg-gray-900 p-4 md:p-0 md:relative md:flex-row"
                : "hidden md:flex"
            }`}
          >
            <Link href="/" className={linkClass}>
              Home
            </Link>
            <Link href="/products" className={linkClass}>
              All products
            </Link>
            <Link href="#" className={linkClass}>
              Categories
            </Link>
            <Link href="#" className={linkClass}>
              Account
            </Link>
            <Link href="/contact" className={linkClass}>
              Contact Us
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              ref={cartRef}
              id="cart-icon"
              className="relative flex items-center gap-1 cursor-pointer"
            >
              <ShoppingCart
                className={`w-5 h-5 ${
                  menuOpen
                    ? "text-gray-900 dark:text-white"
                    : themeColors.icon
                }`}
              />
              <span className="hidden md:inline">Cart</span>

              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <Link href="/search" className={themeColors.navLink}>
              <SearchIcon className="w-5 h-5" />
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative">
              <Heart
                className={`w-5 h-5 ${
                  menuOpen
                     ? themeColors.text      // ← use text color of header!
                     : themeColors.icon
                }`}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <ToggleButton />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              <BarsIcon className={`w-6 h-6 ${themeColors.text}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
