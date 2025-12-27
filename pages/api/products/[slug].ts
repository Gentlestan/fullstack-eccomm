import type { NextApiRequest, NextApiResponse } from "next";
import { products } from "@/lib/mock/products";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ message: "Invalid slug" });
  }

  const product = products.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!product) return res.status(404).json({ message: "Product not found" });

  res.status(200).json(product);
}
