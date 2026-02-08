// /pages/api/hero.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchHeroProducts } from "@/lib/api";
import type { Product, HeroData, Image } from "@/lib/types";
import { getImageAt } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HeroData[] | { message: string }>
) {
  try {
    // Fetch products for the hero section
    const products: Product[] = await fetchHeroProducts();

    const heroData: HeroData[] = products.map((product: Product) => {
      // First, get all images that are Image objects and marked as hero
      const heroImages = product.images?.filter(
        (img): img is Image & { is_hero?: boolean } =>
          typeof img !== "string" && !!img.is_hero
      );

      // Use the first hero image if available, otherwise fallback to the first image
      const heroImage =
        getImageAt(heroImages || [], 0) || getImageAt(product.images || [], 0);

      return {
        title: product.name,
        subtitle: product.description,
        image: heroImage,
        readMore: {
          label: "Read More",
          href: `/products/${product.slug}`,
          slug: product.slug,
        },
        addToCart: {
          label: "Add to Cart",
          slug: product.slug,
        },
      };
    });

    res.status(200).json(heroData);
  } catch (error) {
    console.error("Hero API error:", error);
    res.status(500).json({ message: "Failed to load hero data" });
  }
}
