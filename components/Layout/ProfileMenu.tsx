"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { colors, ThemeKey } from "@/theme";
import { useAuth } from "@/components/context/AuthContext"; // ✅ use your AuthContext

interface Props {
  userRole?: "admin" | "user"; // simple role type
}

export default function ProfileMenu({ userRole }: Props) {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.header[themeKey];

  const { logout, user } = useAuth(); // ✅ useAuth provides logout & user info
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();       // call logout from AuthContext
      setOpen(false);       // close menu
      router.push("/");     // redirect to home (SPA-friendly)
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="relative">
      {/* Avatar / Trigger */}
      <button
        onClick={() => setOpen((s) => !s)}
        className={`px-3 py-2 rounded-full focus:outline-none focus:ring ${themeColors.icon}`}
      >
        👤
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-md shadow-md flex flex-col py-2 ${themeColors.bg} ${themeColors.text}`}
        >
          <Link
            href="/account"
            className="px-4 py-2 hover:underline"
            onClick={() => setOpen(false)}
          >
            My Account
          </Link>

          <Link
            href="/orders"
            className="px-4 py-2 hover:underline"
            onClick={() => setOpen(false)}
          >
            Orders
          </Link>

          {userRole === "admin" && (
            <Link
              href="/admin"
              className="px-4 py-2 hover:underline"
              onClick={() => setOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}

          <button
            disabled={loggingOut}
            className="px-4 py-2 text-left w-full hover:underline disabled:opacity-50"
            onClick={handleLogout}
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}
