"use client";

import { useState, useMemo } from "react";
import { products } from "@/lib/mock/products"; // adjust path to your data
import ProductCard from "./ProductCard"; // adjust path to your existing card

// Dynamically extract unique categories from your dataset
const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

export default function CategoryShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter logic (client-side, instant)
  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products.slice(0, 8); // show only 8 for homepage
    return products.filter(p => p.category === activeCategory).slice(0, 8);
  }, [activeCategory]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold dark:text-white">Category Showcase</h2>

        <a
          href={`/products?category=${activeCategory}`}
          className="text-sm font-medium text-blue-600 dark:text-yellow-400 hover:underline transition"
        >
          View All
        </a>
      </div>

      {/* Tabs */}
      <div className="relative overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 min-w-max">
          {categories.map((cat) => {
            const active = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-4 py-2 capitalize text-sm font-medium rounded-full whitespace-nowrap
                  transition-all duration-300 border
                  ${
                    active
                      ? "bg-black text-white dark:bg-yellow-400 dark:text-black border-transparent"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-700"
                  }
                `}
              >
                {cat.replace("-", " ")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
