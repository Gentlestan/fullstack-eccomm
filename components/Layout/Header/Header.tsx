"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, RefObject } from "react";
import BarsIcon from "@/components/icons/Bars";
import SearchBar from "./SearchBar";
import ToggleButton from "@/components/icons/ToggleButton";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import WishlistIcon from "./WishListIcon";
import CartIcon from "./CartIcon";
import AuthLinks from "./AuthLinks";

import { colors, ThemeKey, HeaderTheme } from "@/theme";
import { authstore } from "@/components/store/authstore";
import { AuthUser } from "@/lib/types";
import { useWishlistStore } from "@/components/store/Wishlist";
import { useCartStore } from "@/components/store/CartStore";

interface HeaderProps {
  cartRef: RefObject<HTMLDivElement | null>;
}

export default function Header({ cartRef }: HeaderProps) {
  const { resolvedTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Backend-aware auth state
  const user = authstore((state) => state.user);
  const logout = authstore((state) => state.logout);

  // Wishlist & cart counts
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const cartCount = useCartStore((s) =>
    s.items.reduce((acc, i) => acc + i.qty, 0)
  );

  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors: HeaderTheme = colors.header[themeKey];

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${themeColors.bg} ${themeColors.text} ${themeColors.shadow}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* TOP BAR */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-semibold">
            Ecommerce
          </Link>

          {/* Desktop search + toggle */}
          <div className="hidden md:flex items-center gap-4 flex-1 ml-6">
            <SearchBar themeColors={themeColors} />
            <ToggleButton />
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={() => setMenuOpen((o) => !o)}>
            <BarsIcon />
          </button>
        </div>

        {/* BOTTOM BAR (Desktop) */}
        <div className="hidden md:flex items-center justify-between border-t pt-2 pb-2">
          {/* Left nav links */}
          <div className="flex items-center gap-6">
            <Link href="/" className={themeColors.navLink}>
              Home
            </Link>
            <Link href="/products" className={themeColors.navLink}>
              Products
            </Link>
            <Link href="/contact" className={themeColors.navLink}>
              Contact
            </Link>
          </div>

          {/* Right auth/cart/wishlist */}
          <div className="flex items-center gap-4">
            {!user && <AuthLinks themeColors={themeColors} />}
            {user && (
              <UserMenu
                user={user}
                logout={logout}
                themeColors={themeColors}
                setMenuOpen={setMenuOpen}
              />
            )}
            {user && <WishlistIcon count={wishlistCount} />}
            <CartIcon count={cartCount} refProp={cartRef} isAuthenticated={!!user} />
          </div>
        </div>

        {/* MOBILE MENU */}
        <MobileMenu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          user={user}
          logout={logout}
          themeColors={themeColors}
        />
      </div>
    </header>
  );
}
