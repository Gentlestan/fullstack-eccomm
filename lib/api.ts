import { authstore } from "@/components/store/authstore";
import { Product, Review, AuthUser } from "@/lib/types";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
export const MEDIA_BASE_URL = BASE_URL.replace("/api", "");

/* -----------------------------
   Generic fetch helper with optional auth
------------------------------ */
async function authFetch<T>(
  input: RequestInfo,
  init?: RequestInit,
  useAuth = true
): Promise<T> {
  const accessToken =
    useAuth && typeof window !== "undefined"
      ? authstore.getState().accessToken
      : null;

  // Use Headers object for type-safe header manipulation
  const headers = new Headers(init?.headers);

  headers.set("Content-Type", "application/json");
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const res = await fetch(input, { ...init, headers });

  if (!res.ok) {
    if (res.status === 401)
      console.warn("Unauthorized — token may be missing or expired");
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}

/* -----------------------------
   PRODUCTS
------------------------------ */
export interface PaginatedProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

export async function fetchAllProducts(): Promise<Product[]> {
  const data = await authFetch<PaginatedProductsResponse>(
    `${BASE_URL}/products/`,
    undefined,
    false
  );
  return data.results ?? [];
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
  return authFetch<Product>(`${BASE_URL}/products/${slug}/`, undefined, false);
}

export async function fetchHeroProducts(): Promise<Product[]> {
  const data = await authFetch<PaginatedProductsResponse>(
    `${BASE_URL}/products/?is_hero=true`,
    undefined,
    false
  );
  return data.results ?? [];
}

/* -----------------------------
   REVIEWS
------------------------------ */
export async function fetchReviews(productId: number): Promise<Review[]> {
  return authFetch<Review[]>(`${BASE_URL}/reviews/${productId}/`);
}

export async function postReview(
  productId: number,
  payload: Partial<Review>
): Promise<Review> {
  return authFetch<Review>(
    `${BASE_URL}/reviews/${productId}/`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    true // ensure only authenticated users can post
  );
}

/* -----------------------------
   AUTH / USER PROFILE
------------------------------ */
export async function fetchMe(): Promise<AuthUser> {
  return authFetch<AuthUser>(`${BASE_URL}/auth/me/`);
}
