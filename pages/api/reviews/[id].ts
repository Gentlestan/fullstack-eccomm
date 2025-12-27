import type { NextApiRequest, NextApiResponse } from "next";
import { reviews } from "@/lib/mock/reviews"; // your mock reviews

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const productReviews = reviews[id as string] || [];
  res.status(200).json(productReviews);
}
