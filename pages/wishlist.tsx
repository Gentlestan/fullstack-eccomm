"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { colors, ThemeKey } from "@/theme";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
//import { useWishlistStore } from "@/store/WishlistStore";
import { useWishlistStore } from "@/components/store/Wishlist";

export default function WishlistPage() {
  const { resolvedTheme } = useTheme();
  const { wishlist } = useWishlistStore(); // store contains product IDs

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);

  useEffect(() => setMounted(true), []);

  // Fetch all products once
  useEffect(() => {
    async function loadProducts() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${baseUrl}/products`);
        const data = (await res.json()) as Product[];

        setProducts(data);

        // Filter wishlist products
        const filtered = data.filter((p) => wishlist.includes(p.id));
        setSavedProducts(filtered);

        setLoading(false);
      } catch (error) {
        console.error("Wishlist fetch failed:", error);
      }
    }

    loadProducts();
  }, [wishlist]);

  if (!mounted) return null;

  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.product[themeKey];

  return (
    <section
      className={`mt-10 px-6 md:px-10 max-w-7xl mx-auto 
      ${themeColors.bg} ${themeColors.text}`}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6">My Wishlist ❤️</h2>

      {/* LOADING */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && savedProducts.length === 0 && (
        <p className="text-gray-500 text-lg mt-10">
          You haven't saved any items yet.
        </p>
      )}

      {/* PRODUCT GRID */}
      {!loading && savedProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
