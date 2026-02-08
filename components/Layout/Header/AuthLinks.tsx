"use client";

import Link from "next/link";
import { HeaderTheme } from "@/theme";

interface Props {
  themeColors: HeaderTheme;
}

export default function AuthLinks({ themeColors }: Props) {
  return (
    <div className="flex items-center gap-4">
      <Link href="/login" className={themeColors.navLink}>Login</Link>
      <Link
        href="/signup"
        className={`${themeColors.navLink} border border-blue-600 px-3 py-1 rounded-md`}
      >
        Sign Up
      </Link>
    </div>
  );
}
