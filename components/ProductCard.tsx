"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlistStore } from "./store/Wishlist";
import { Product } from "@/lib/types";
import StarRating from "./StarRating";
import Link from "next/link";
import { useTheme } from "next-themes";
import { colors, ThemeKey } from "@/theme";
import AddToCartButton from "./AddToCartButton";
import { useRef, RefObject } from "react";

interface Props {
  product: Product;
  cartRef?: RefObject<HTMLDivElement | null>; // ✅ OPTIONAL
}

export default function ProductCard({ product, cartRef }: Props) {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.product[themeKey];

  const imageRef = useRef<HTMLImageElement | null>(null);
  const { toggle, isLiked } = useWishlistStore();
  const liked = isLiked(product.id);

  const primaryImage = product.images?.[0];
  const secondaryImage = product.images?.[1] ?? primaryImage;

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`rounded-xl p-4 border transition
        ${themeColors.cardBg} ${themeColors.border}
        hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]`}
    >
      {/* IMAGE AREA */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative w-full h-40 md:h-48 overflow-hidden rounded-lg cursor-pointer">
          {/* Primary image */}
          <motion.img
            ref={imageRef}
            src={primaryImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            variants={{
              rest: { x: 0 },
              hover: { x: "-100%" },
            }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          />

          {/* Secondary image */}
          <motion.img
            src={secondaryImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            variants={{
              rest: { x: "100%" },
              hover: { x: 0 },
            }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-sm font-medium"
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 1 },
            }}
            transition={{ duration: 0.3 }}
          >
            View Product
          </motion.div>
        </div>
      </Link>

      {/* PRODUCT INFO */}
      <div className="mt-4 space-y-1">
        <h3 className="font-semibold text-base md:text-lg">
          {product.name}
        </h3>
        <p className="text-sm opacity-70">{product.brand}</p>
        <StarRating rating={product.rating} />
        <p className={`text-lg font-bold ${themeColors.price}`}>
          ${product.price}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2 mt-4">
        {/* ADD TO CART */}
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex-1"
        >
          <AddToCartButton
            product={product}
            buttonClass={themeColors.addToCart}
            imageRef={imageRef}
            cartRef={cartRef} // ✅ PASSED SAFELY
            fullWidth
            disabled={(Number(product.stock) || 0) <= 0}
          />
        </motion.div>

        {/* WISHLIST */}
        <motion.button
          onClick={() => toggle(product.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          animate={liked ? { scale: [1, 1.25, 1] } : { scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={`px-4 rounded-lg flex items-center justify-center ${themeColors.wishlist}`}
        >
          <Heart
            className="w-4 h-4"
            color={liked ? "red" : "currentColor"}
            fill={liked ? "red" : "none"}
          />
        </motion.button>
      </div>
    </motion.div>
  );
}
