// lib/productUtils.ts
import { Product } from "./types";

export type SortOption = "price-asc" | "price-desc" | "rating-desc" | "rating-asc";

export interface FilterOptions {
  searchQuery?: string;
  category?: string;
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

  // SEARCH
  if (options.searchQuery) {
    const query = options.searchQuery.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query)
    );
  }

  // CATEGORY
  if (options.category && options.category !== "all") {
    result = result.filter((p) => p.category === options.category);
  }

  // PRICE RANGE
  if (options.minPrice != null) {
    result = result.filter((p) => p.price >= options.minPrice!);
  }
  if (options.maxPrice != null) {
    result = result.filter((p) => p.price <= options.maxPrice!);
  }

  // SORTING
  if (options.sortBy) {
    switch (options.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-asc":
        result.sort((a, b) => a.rating - b.rating);
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  return result;
}
