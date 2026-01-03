"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import BarsIcon from "@/components/icons/Bars";
import NavLinks from "./NavLink";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import ToggleButton from "@/components/icons/ToggleButton";
import { colors, ThemeKey } from "@/theme";
import { useAuthStore } from "@/components/store/authstore";
import { useRouter } from "next/router";

export default function Header() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { isAuthenticated, user, login, logout } = useAuthStore();
  const isDev = process.env.NODE_ENV === "development";
  const router = useRouter();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.header[themeKey];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${themeColors.bg} ${themeColors.text} ${themeColors.shadow}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-xl font-semibold">
            Ecommerce
          </Link>

          {/* Desktop Nav + Search + Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <NavLinks
              isAuthenticated={isAuthenticated}
              isDev={isDev}
              login={login}
              themeColors={{ navLink: themeColors.navLink }}
            />

            {/* Desktop Search */}
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`px-3 py-1 rounded-md border ${themeColors.border} ${
                  themeKey === "light"
                    ? "bg-white text-gray-900 placeholder-gray-500"
                    : "bg-gray-900 text-white placeholder-gray-400"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </form>

            {/* Theme Toggle */}
            <ToggleButton />

            {/* User Menu */}
            {isAuthenticated && user && (
              <UserMenu
                user={user}
                logout={logout}
                setMenuOpen={setMenuOpen}
                themeColors={{ icon: themeColors.icon }}
              />
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <BarsIcon />
          </button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          isAuthenticated={isAuthenticated}
          user={user}
          isDev={isDev}
          login={login}
          logout={logout}
          itemCount={0}
          wishlistCount={0}
          themeColors={themeColors}
        />
      </div>
    </header>
  );
}
