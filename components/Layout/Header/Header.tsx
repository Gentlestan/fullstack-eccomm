"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState, RefObject } from "react";
import BarsIcon from "@/components/icons/Bars";
import ToggleButton from "@/components/icons/ToggleButton";
import MobileMenu from "./MobileMenu";
import { colors, ThemeKey } from "@/theme";
import { useAuthStore } from "@/components/store/authstore";
import { useWishlistStore } from "@/components/store/Wishlist";
import { useCartStore } from "@/components/store/CartStore";

import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import WishlistIcon from "./WishListIcon";
import CartIcon from "./CartIcon";
import AuthLinks from "./AuthLinks";

interface HeaderProps {
  cartRef: RefObject<HTMLDivElement | null>;
}

export default function Header({ cartRef }: HeaderProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { isAuthenticated, user, login, logout } = useAuthStore();
  const isDev = process.env.NODE_ENV === "development";

  const { wishlist } = useWishlistStore();
  const wishlistCount = wishlist.length;

  const { items } = useCartStore();
  const cartCount = items.reduce((acc, i) => acc + i.qty, 0);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.header[themeKey];

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${themeColors.bg} ${themeColors.text} ${themeColors.shadow}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* TOP BAR */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-xl font-semibold">
            Ecommerce
          </Link>

          {/* Desktop Search + Theme Toggle */}
          <div className="hidden md:flex items-center gap-4 flex-1 ml-6">
            <SearchBar themeColors={themeColors} />
            <ToggleButton />
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <BarsIcon />
          </button>
        </div>

        {/* BOTTOM BAR (Desktop) */}
        <div className="hidden md:flex items-center justify-between border-t pt-2 pb-2">
          {/* Left: Main Links */}
          <div className="flex items-center gap-6">
            <Link href="/" className={themeColors.navLink}>Home</Link>
            <Link href="/products" className={themeColors.navLink}>Products</Link>
            <Link href="/contact" className={themeColors.navLink}>Contact</Link>
          </div>

          {/* Right: Auth + Wishlist + Cart */}
          <div className="flex items-center gap-4">
            {/* Sign In / Sign Up / Dev Login */}
            <AuthLinks themeColors={themeColors} isDev={isDev} />

            {/* User Menu */}
            {isAuthenticated && user && (
              <UserMenu user={user} logout={logout} themeColors={themeColors} />
            )}

            {/* Wishlist */}
            {isAuthenticated && <WishlistIcon count={wishlistCount} />}

            {/* Cart */}
            <CartIcon
              count={cartCount}
              refProp={cartRef}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </div>

        {/* MOBILE MENU */}
        <MobileMenu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          isAuthenticated={isAuthenticated}
          user={user}
          isDev={isDev}
          login={login}              // ✅ Pass login here
          logout={logout}
          themeColors={themeColors}
          cartRef={cartRef}
        />
      </div>
    </header>
  );
}
