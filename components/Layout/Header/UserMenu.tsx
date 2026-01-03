"use client";

import { ShoppingCart } from "lucide-react";
import ProfileMenu from "../ProfileMenu";
import { useCartStore } from "@/components/store/CartStore";
import { AuthUser } from "@/components/store/authstore";
import { Dispatch, SetStateAction } from "react";

interface UserMenuProps {
  user?: AuthUser;
  logout: () => void;
  themeColors: { icon: string };
  setMenuOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function UserMenu({ user, logout, themeColors }: UserMenuProps) {
  const itemCount = useCartStore((s) => s.itemCount);

  return (
    <div className="flex items-center gap-4">
      {/* Cart */}
      <div className="relative">
        <ShoppingCart className={themeColors.icon} />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </div>

      {/* Profile Menu */}
      {user && (
        <div className="hidden md:block">
          <ProfileMenu userRole={user.role} />
        </div>
      )}

      {/* Logout */}
      <button
        onClick={logout}
        className="hidden md:block text-sm font-medium text-red-600"
      >
        Logout
      </button>
    </div>
  );
}
