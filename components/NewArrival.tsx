"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { colors, ThemeKey } from "@/theme";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./skeletons/ProductSkeleton";
import CategoryTabs from "./CategoryTabs";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";

export default function NewArrival() {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);

  // How many to show initially
  const [visibleCount, setVisibleCount] = useState(8); // show 8 first

  useEffect(() => setMounted(true), []);

  // Fetch full product list once
  useEffect(() => {
    async function loadProducts() {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${baseUrl}/products`);
      const data = (await res.json()) as Product[];

      setProducts(data);
      //setFiltered(data.filter((p) => p.category === "phone"));
      setFiltered(data);
      setLoading(false);
    }

    loadProducts();
  }, []);

  if (!mounted) return null;

  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.product[themeKey];

  // LOADING
  if (loading) {
    return (
      <section className={`mt-10 px-6 md:px-10 max-w-7xl mx-auto ${themeColors.bg}`}>
        <h2 className="text-2xl md:text-3xl font-bold mb-6">New Arrivals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className={`mt-10 px-6 mb-8 md:px-10 max-w-7xl mx-auto ${themeColors.bg} ${themeColors.text}`}
    >
      {/* TITLE */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6">New Arrivals</h2>

      {/* CATEGORY TABS */}
      <CategoryTabs products={products} onFilter={setFiltered} />

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filtered.slice(0, visibleCount).map((product) => (
          <ProductCard 
          key={product.id} 
          product={product} 
          
          />
          
        ))}
      </div>

      {/* VIEW MORE */}
      {visibleCount < filtered.length && (
        <div className="flex justify-center mt-8">
          <button
            className={`px-6 py-3 rounded-lg font-semibold ${themeColors.addToCart} hover:scale-105 transition`}
            onClick={() => setVisibleCount((prev) => prev + 8)}  // Load more
          >
            View More
          </button>
        </div>
      )}

      {/* VIEW ALL (final fallback) */}
      {visibleCount >= filtered.length && (
        <div className="flex justify-center mt-8">
          <Link href="/products">
            <button
              className={`px-6 py-3 rounded-lg font-semibold ${themeColors.addToCart}`}
            >
              View All Products
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}
