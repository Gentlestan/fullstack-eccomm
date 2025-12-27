"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { colors, ThemeKey } from "@/theme";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import ProductCard from "@/components/ProductCard";
import CategoryTabs from "@/components/CategoryTabs";
import { filterAndSortProducts, SortOption } from "@/lib/productUtils";



const PRODUCTS_PER_PAGE_DESKTOP = 12;
const PRODUCTS_PER_PAGE_MOBILE = 6;

export default function ProductsIndexPage() {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.product[themeKey];

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // FILTER & SORT STATE
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;

  const PRODUCTS_PER_PAGE = isMobile
    ? PRODUCTS_PER_PAGE_MOBILE
    : PRODUCTS_PER_PAGE_DESKTOP;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    async function loadProducts() {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${baseUrl}/products`);
      //const res = await fetch("/api/products");
      const data = (await res.json()) as Product[];
      setProducts(data);
      setFiltered(data); // initially show all
      setLoading(false);
    }
    loadProducts();
  }, []);

  if (!mounted) return null;

  // Apply search + sort to filtered products
  const filteredAndSorted = filterAndSortProducts(filtered, {
    searchQuery,
    sortBy,
  });

  // PAGINATION
  const totalPages = Math.ceil(filteredAndSorted.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredAndSorted.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <section className={`mt-10 px-6 md:px-10 max-w-7xl mx-auto ${themeColors.bg} ${themeColors.text}`}>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">All Products</h1>
      <p className="text-sm md:text-xl font-normal mb-6">
        Browse through thousands of electronics at the best prices.
      </p>

      {/* CATEGORY TABS */}
      {!loading && (
        <CategoryTabs
          products={products}
          onFilter={(newFiltered: Product[]) => {
            setFiltered(newFiltered);
            setCurrentPage(1); // reset page on filter
          }}
        />
      )}

      {/* SEARCH & SORT */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          className={`w-full md:w-1/3 px-4 py-2 rounded-lg border ${themeColors.border} bg-transparent text-inherit`}
        />
        <select
          value={sortBy}
          onChange={(e) => { setSortBy(e.target.value as SortOption); setCurrentPage(1); }}
          className={`w-full md:w-1/4 px-4 py-2 rounded-lg border ${themeColors.border} bg-transparent text-inherit`}
        >
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating-desc">Rating: High → Low</option>
          <option value="rating-asc">Rating: Low → High</option>
        </select>
      </div>

      {/* GRID */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 transition"
          >
            ← Prev
          </button>
          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
}
