"use client";

import { useState, useMemo, useEffect } from "react";
import { Product } from "@/lib/types";
import { fetchAllProducts } from "@/lib/api";
import ProductCard from "./ProductCard";

export default function CategoryShowcase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  /* ---------------------------
     Load products from backend
  --------------------------- */
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchAllProducts(); // fetch real products
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products for CategoryShowcase:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  /* ---------------------------
     Extract categories dynamically
  --------------------------- */
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category?.name || "uncategorized")));
    return ["all", ...cats];
  }, [products]);

  /* ---------------------------
     Filter products by category
  --------------------------- */
  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products.slice(0, 8);
    return products.filter((p) => p.category?.name === activeCategory).slice(0, 8);
  }, [products, activeCategory]);

  if (loading) return <p className="p-6 text-center">Loading products...</p>;

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
