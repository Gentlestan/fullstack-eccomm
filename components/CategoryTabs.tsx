"use client";

import { useState } from "react";
import { colors, ThemeKey } from "@/theme";
import { useTheme } from "next-themes";
import { Product } from "@/lib/types";

interface CategoryTabsProps {
  products: Product[];
  onFilter: (filtered: Product[]) => void;
}

const categories = [
  { label: "All", key: "all" },
  { label: "Phones", key: "phone" },
  { label: "Laptops", key: "laptop" },
  { label: "Earphones", key: "earphone" },
  { label: "Power Banks", key: "power-bank" },
  { label: "TVs", key: "television" },
];

export default function CategoryTabs({ products, onFilter }: CategoryTabsProps) {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const theme = colors.product[themeKey];

  // Default: ALL
  const [active, setActive] = useState("all");

  function handleTabClick(key: string) {
    setActive(key);

    if (key === "all") {
      onFilter(products); // Show all products
    } else {
      const filtered = products.filter((p) => p.category === key);
      onFilter(filtered);
    }
  }

  return (
    <div className="flex gap-3 md:gap-4 mb-6 overflow-x-auto scrollbar-hide">
      {categories.map((cat) => {
        const isActive = active === cat.key;

        return (
          <button
            key={cat.key}
            onClick={() => handleTabClick(cat.key)}
            className={`
              px-5 py-2 rounded-full text-sm md:text-base border transition-all duration-300
              ${isActive ? theme.addToCart : theme.cardBg}
              ${theme.border}
              whitespace-nowrap hover:scale-105
            `}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
