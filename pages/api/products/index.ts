import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAllProducts } from "@/lib/api";
import { Product } from "@/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[] | { message: string }>
) {
  try {
    const { q } = req.query;

    // Fetch all products with proper type
    const allProducts: Product[] = await fetchAllProducts();

    // Filter products based on search query
    let result: Product[] = allProducts;

    if (q && typeof q === "string") {
      const query = q.toLowerCase().trim();

      result = allProducts.filter((product: Product) =>
        [
          product.name,
          product.brand,
          product.category.name,
          product.description,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    res.status(200).json(result);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
}
