"use client";

import { useState } from "react";
import { UserRole } from "../store/authstore";
import { useAuthStore } from "../store/authstore";
import { colors, ThemeKey } from "@/theme";
import { useTheme } from "next-themes";
import Link from "next/link";

interface Props {
  userRole?: UserRole;
}

export default function ProfileMenu({ userRole }: Props) {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.header[themeKey];

  const { logout } = useAuthStore();
  const [open, setOpen] = useState(false);

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
            className={`px-4 py-2 hover:underline`}
            onClick={() => setOpen(false)}
          >
            My Account
          </Link>
          <Link
            href="/orders"
            className={`px-4 py-2 hover:underline`}
            onClick={() => setOpen(false)}
          >
            Orders
          </Link>
          {userRole === "admin" && (
            <Link
              href="/admin"
              className={`px-4 py-2 hover:underline`}
              onClick={() => setOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}
          <button
            className="px-4 py-2 text-left w-full hover:underline"
            onClick={() => {
              logout();
              setOpen(false);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
