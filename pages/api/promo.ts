import { NextApiRequest, NextApiResponse } from "next";
//import { promos } from "@/lib/mock/promodata";
import { promos } from "@/lib/mock/promoData";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(promos);
}
