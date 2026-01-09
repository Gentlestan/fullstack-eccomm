// /pages/api/hero.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { HeroData } from "@/lib/types";
import { products } from "@/lib/mock/products";

// Mock hero configuration for now (can be replaced with DB later)
const heroConfig = [
  { slug: "dell-xps-15", heroImage: "/assets/images/hero/dell-xps15-2.webp" },
  { slug: "apple-iphone-15-pro-max", heroImage: "/assets/images/hero/iphone15-promax-1.jpg" },
  { slug: "macbook-air-m2", heroImage: "/assets/images/hero/hp-spectra-x360-3.jpg" },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HeroData[]>
) {
  // Build hero data dynamically
  const data: HeroData[] = heroConfig
    .map((item) => {
      // Find matching product
      const product = products.find(
        (p) => p.slug.toLowerCase() === item.slug.toLowerCase()
      );

      if (!product) {
        console.warn(`Product not found for hero: ${item.slug}`);
        return null; // skip if product is missing
      }

      return {
        title: product.name,
        subtitle: product.description,
        readMore: {
          label: "Read More",
          href: `/products/${product.slug}`,
          slug: product.slug,
        },
        addToCart: {
          label: "Add to Cart",
          slug: product.slug,
        },
        // Use hero-specific image if set, otherwise fallback to product image
        image: item.heroImage ?? product.images[0],
      };
    })
    .filter(Boolean) as HeroData[];

  res.status(200).json(data);
}
