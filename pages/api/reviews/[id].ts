import type { NextApiRequest, NextApiResponse } from "next";
import { fetchProductBySlug } from "@/lib/api"; // JWT-ready helper

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    // 🔹 fetchProductBySlug uses authFetch internally
    const product = await fetchProductBySlug(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return product reviews or empty array
    res.status(200).json(product.reviews ?? []);
  } catch (error) {
    console.error("Fetch product reviews error:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
}
