import type { NextApiRequest, NextApiResponse } from "next";
//import { HeroData } from "@/lib/types/hero";
import { HeroData } from "@/lib/types";
import { heroData } from "@/lib/mock/heroData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HeroData[]>
) {
  res.status(200).json(heroData);
}



