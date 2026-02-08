// lib/productUtils.ts
import { Product, Category } from "./types";

export type SortOption = "price-asc" | "price-desc" | "rating-asc" | "rating-desc";

export interface FilterOptions {
  searchQuery?: string;
  category?: Category | "all";
  sortBy?: SortOption;
  minPrice?: number;
  maxPrice?: number;
}

/**
 * Filters and sorts an array of products based on provided options
 */
export function filterAndSortProducts(
  products: Product[],
  options: FilterOptions
): Product[] {
  let result = [...products];

  // =========================
  // SEARCH
  // =========================
  if (options.searchQuery) {
    const query = options.searchQuery.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query)
    );
  }

  // =========================
  // CATEGORY
  // =========================
  if (options.category && options.category !== "all") {
    result = result.filter((p) => p.category === options.category);
  }

  // =========================
  // PRICE RANGE
  // =========================
  if (options.minPrice != null) {
    const min = options.minPrice;
    result = result.filter((p) => p.price >= min);
  }

  if (options.maxPrice != null) {
    const max = options.maxPrice;
    result = result.filter((p) => p.price <= max);
  }

  // =========================
  // SORTING
  // =========================
  const sortFunctions: Record<SortOption, (a: Product, b: Product) => number> = {
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    "rating-asc": (a, b) => a.rating - b.rating,
    "rating-desc": (a, b) => b.rating - a.rating,
  };

  if (options.sortBy) {
    result.sort(sortFunctions[options.sortBy]);
  }

  return result;
}
