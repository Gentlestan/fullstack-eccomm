"use client";

import ProfileMenu from "../ProfileMenu";
import { useCartStore } from "@/components/store/CartStore";
import { AuthUser } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";

interface UserMenuProps {
  user: AuthUser;
  logout: () => void;
  themeColors: { icon?: string };
  setMenuOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function UserMenu({ user, logout, themeColors, setMenuOpen }: UserMenuProps) {
  const itemCount = useCartStore((s) => s.items.reduce((acc, i) => acc + i.qty, 0));

  return (
    <div className="flex items-center gap-4">
      {/* Profile Menu */}
      <div className="hidden md:block">
        <ProfileMenu userRole={user.role} />
      </div>

      {/* Logout */}
      <button
        onClick={() => { logout(); setMenuOpen?.(false); }}
        className="text-sm font-medium text-red-600"
      >
        Logout
      </button>
    </div>
  );
}
