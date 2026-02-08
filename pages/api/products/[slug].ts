import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  return res
    .status(410)
    .json({ message: "This endpoint is deprecated. Use backend API." });
}
