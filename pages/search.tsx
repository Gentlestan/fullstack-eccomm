// pages/search.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { colors, ThemeKey } from "@/theme";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { useRouter } from "next/router";

export default function SearchPage() {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.product[themeKey];

  const router = useRouter();
  const { q } = router.query; // search query from URL ?q=keyword

  const [searchQuery, setSearchQuery] = useState(q || "");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Update searchQuery if query param changes
  useEffect(() => {
    if (typeof q === "string") setSearchQuery(q);
  }, [q]);

  // Fetch products from API whenever searchQuery changes
  useEffect(() => {
    if (!searchQuery) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const queryString = Array.isArray(searchQuery) ? searchQuery[0] : searchQuery;
    
    fetch(`/api/products?q=${encodeURIComponent(queryString)}`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setResults([]);
        setLoading(false);
      });
  }, [searchQuery]);

  return (
    <section className={`mt-10 px-6 md:px-10 max-w-7xl mx-auto ${themeColors.bg} ${themeColors.text}`}>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Search Products</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full md:w-1/3 px-4 py-2 rounded-lg border ${themeColors.border} bg-transparent text-inherit`}
        />
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : results.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No products found for "{searchQuery}".</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
