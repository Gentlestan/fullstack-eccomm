import type { NextApiRequest, NextApiResponse } from "next";
import { products } from "@/lib/mock/products";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;

  let result = products;

  // ✅ SEARCH LOGIC
  if (q && typeof q === "string") {
    const query = q.toLowerCase().trim();

    result = result.filter((product) =>
      [
        product.name,
        product.brand,
        product.category,
        product.description,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }

  res.status(200).json(result);
}
