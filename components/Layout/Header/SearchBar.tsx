"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { colors, ThemeKey } from "@/theme";
import { useTheme } from "next-themes";

interface Props {
  themeColors: typeof colors.header.light;
}

export default function SearchBar({ themeColors }: Props) {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`w-full px-3 py-1 rounded-md border ${themeColors.border} ${
          themeKey === "light"
            ? "bg-white text-gray-900 placeholder-gray-500"
            : "bg-gray-900 text-white placeholder-gray-400"
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
    </form>
  );
}
