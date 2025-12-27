const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined in your .env");
}

// Fetch a single product by slug
export async function fetchProductBySlug(slug: string) {
  const res = await fetch(`${BASE_URL}/products/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch product by slug");
  return res.json();
}

// Fetch reviews by product ID (stays the same)
export async function fetchReviews(productId: string) {
  const res = await fetch(`${BASE_URL}/reviews/${productId}`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

// Fetch all products
export async function fetchAllProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
